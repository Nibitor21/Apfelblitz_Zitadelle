from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime, timezone
import logging
import json
import os
import requests
import time
from dotenv import load_dotenv

# === Setup ===
load_dotenv()
app = Flask(__name__)
CORS(app)  # CORS für Frontend-Zugriff
DB_PATH = 'paycodes.db'

# === ENV-Variablen laden ===
PAYCODE_ID = os.getenv("PAYCODE_ID")
LNBITS_URL = os.getenv("LNBITS_URL")
WALLET_1_ID = os.getenv("WALLET_1_ID")
WALLET_1_KEY = os.getenv("WALLET_1_ADMINKEY")
WALLET_2_ID = os.getenv("WALLET_2_ID")
WALLET_2_KEY = os.getenv("WALLET_2_ADMINKEY")

# === Logging ===
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')
file_handler = logging.FileHandler('webhook.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# === DB Initialisierung ===
def init_db():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS webhook_eingang (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    paycode_id TEXT,
                    received_at TEXT,
                    payment_hash TEXT,
                    payment_request TEXT,
                    amount INTEGER,
                    comment TEXT,
                    webhook_data TEXT,
                    lnurlp TEXT,
                    body TEXT,
                    zap_receipt TEXT
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS wallet_balances (
                    wallet_id TEXT PRIMARY KEY,
                    wallet_name TEXT,
                    balance INTEGER,
                    updated_at TEXT
                )
            ''')
            conn.commit()
            logging.info("SQLite-Tabellen initialisiert.")
    except Exception as e:
        logging.error(f"Fehler bei der DB-Initialisierung: {str(e)}")

# === Webhook speichern ===
def store_webhook(data):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO webhook_eingang (
                    paycode_id, received_at, payment_hash, payment_request,
                    amount, comment, webhook_data, lnurlp, body, zap_receipt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                PAYCODE_ID,
                datetime.now(timezone.utc).isoformat(),
                data.get("payment_hash"),
                data.get("payment_request"),
                data.get("amount"),
                data.get("comment"),
                data.get("webhook_data"),
                data.get("lnurlp"),
                data.get("body"),
                data.get("zap_receipt")
            ))
            conn.commit()
            logging.info(f"Webhook gespeichert für paycode_id={PAYCODE_ID}")
    except Exception as e:
        logging.error(f"Fehler beim Speichern des Webhooks: {str(e)}")

# === Wallet-Balance abrufen und speichern ===
def fetch_and_store_wallet_balance(wallet_id, wallet_key):
    try:
        url = f"{LNBITS_URL}/api/v1/wallet"
        headers = {
            "X-API-KEY": wallet_key,
            "accept": "application/json"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        wallet_data = response.json()

        if wallet_data.get("id") != wallet_id:
            logging.warning(f"Erhaltene Wallet-ID stimmt nicht mit erwarteter ({wallet_id}) überein.")
            return

        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO wallet_balances (wallet_id, wallet_name, balance, updated_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(wallet_id) DO UPDATE SET
                    wallet_name=excluded.wallet_name,
                    balance=excluded.balance,
                    updated_at=excluded.updated_at
            ''', (
                wallet_data["id"],
                wallet_data["name"],
                wallet_data["balance"],  # Millisatoshis
                datetime.now(timezone.utc).isoformat()
            ))
            conn.commit()
            logging.info(f"Wallet-Balance gespeichert für {wallet_data['name']} (ID: {wallet_data['id']})")
    except Exception as e:
        logging.error(f"Fehler beim Abrufen/Speichern der Wallet-Balance für Wallet {wallet_id}: {str(e)}")

# === Webhook-Endpunkt ===
@app.route('/webhook_apfel', methods=['POST'])
def webhook_apfel():
    try:
        if not request.is_json:
            logging.warning("Webhook empfangen – kein JSON Content-Type.")
            return "", 400

        payload = request.get_json()
        if not payload:
            logging.warning("Webhook empfangen – JSON leer.")
            return "", 400

        logging.info("Webhook empfangen.")
        logging.debug(f"Payload:\n{json.dumps(payload, indent=2)}")

        store_webhook(payload)
        time.sleep(10)  # 10 Sekunde warten

        fetch_and_store_wallet_balance(WALLET_1_ID, WALLET_1_KEY)
        fetch_and_store_wallet_balance(WALLET_2_ID, WALLET_2_KEY)

        return "", 200
    except Exception as e:
        logging.error(f"Fehler beim Verarbeiten des Webhooks: {str(e)}")
        return "", 500

# === API-Endpunkt für letzte Zahlung ===
@app.route('/api/payment_webhook', methods=['GET'])
def api_payment_webhook():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT amount, received_at, comment, lnurlp FROM webhook_eingang
                ORDER BY received_at DESC LIMIT 1
            ''')
            row = cursor.fetchone()
            if row:
                return jsonify({
                    "amount": row[0],
                    "received_at": row[1]
                })
            else:
                return jsonify({"error": "Keine Zahlung gefunden"}), 404
    except Exception as e:
        logging.error(f"Fehler bei /api/payment_webhook: {str(e)}")
        return jsonify({"error": "Serverfehler"}), 500

# === API-Endpunkt für Wallet-Balances ===
@app.route('/api/balance_webhook', methods=['GET'])
def api_balance_webhook():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT wallet_name, balance FROM wallet_balances
                ORDER BY updated_at DESC
            ''')
            rows = cursor.fetchall()
            return jsonify([
                {
                    "wallet_name": row[0],
                    "balance": row[1] // 1000  # von millisats zu sats
                } for row in rows
            ])
    except Exception as e:
        logging.error(f"Fehler bei /api/balance_webhook: {str(e)}")
        return jsonify({"error": "Serverfehler"}), 500

# === Start ===
if __name__ == '__main__':
    init_db()
    logging.info("Webhook-Service gestartet auf Port 5013.")
    app.run(host='127.0.0.1', port=5013)
