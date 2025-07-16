
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MatrixTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const MatrixText: React.FC<MatrixTextProps> = ({ 
  text, 
  className = "", 
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const binaryChars = ['0', '1'];
  const getRandomBinary = () => binaryChars[Math.floor(Math.random() * binaryChars.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        // Binary transition phase
        let binaryCount = 0;
        const binaryInterval = setInterval(() => {
          if (binaryCount < 8) {
            setDisplayText(prev => 
              prev.slice(0, currentIndex) + 
              Array(Math.min(3, text.length - currentIndex))
                .fill(0)
                .map(() => getRandomBinary())
                .join('') +
              prev.slice(currentIndex + 3)
            );
            binaryCount++;
          } else {
            clearInterval(binaryInterval);
            // Reveal actual character
            setDisplayText(prev => 
              prev.slice(0, currentIndex) + 
              text[currentIndex] + 
              prev.slice(currentIndex + 1)
            );
            setCurrentIndex(prev => prev + 1);
          }
        }, 50);
      }
    }, delay + currentIndex * 100);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <motion.span 
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          className="text-green-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
};

export default MatrixText;
