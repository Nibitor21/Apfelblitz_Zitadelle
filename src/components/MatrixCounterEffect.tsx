
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixCounterEffectProps {
  value: number | string;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const MatrixCounterEffect = ({ 
  value, 
  className, 
  prefix = '', 
  suffix = '',
  duration = 2500,
  delay = 5000
}: MatrixCounterEffectProps) => {
  const text = `${prefix}${value}${suffix}`;
  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split("").map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === " ",
    })),
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const animateLetter = useCallback(
    (index: number) => {
      if (index >= text.length) return;

      requestAnimationFrame(() => {
        setLetters((prev) => {
          const newLetters = [...prev];
          if (!newLetters[index].isSpace && !/[^\w]/.test(newLetters[index].char)) {
            newLetters[index] = {
              ...newLetters[index],
              char: getRandomChar(),
              isMatrix: true,
            };
          }
          return newLetters;
        });

        setTimeout(() => {
          setLetters((prev) => {
            const newLetters = [...prev];
            newLetters[index] = {
              ...newLetters[index],
              char: text[index],
              isMatrix: false,
            };
            return newLetters;
          });
        }, duration / 3);
      });
    },
    [getRandomChar, text, duration],
  );

  const startAnimation = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        return;
      }

      animateLetter(currentIndex);
      currentIndex++;
      setTimeout(animate, duration / text.length);
    };

    setTimeout(animate, delay);
  }, [animateLetter, text, isAnimating, duration, delay]);

  useEffect(() => {
    setLetters(
      text.split("").map((char) => ({
        char,
        isMatrix: false,
        isSpace: char === " ",
      }))
    );
    startAnimation();
  }, [value, text, startAnimation]);

  const motionVariants = useMemo(
    () => ({
      matrix: {
        color: "#00ff00",
        textShadow: "0 2px 4px rgba(0, 255, 0, 0.5)",
      },
      normal: {
        color: "currentColor",
        textShadow: "none",
      },
    }),
    [],
  );

  return (
    <div className={cn("flex items-center", className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${index}-${letter.char}`}
          className="font-mono inline-block"
          initial="normal"
          animate={letter.isMatrix ? "matrix" : "normal"}
          variants={motionVariants}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          {letter.isSpace ? "\u00A0" : letter.char}
        </motion.span>
      ))}
    </div>
  );
};

export default MatrixCounterEffect;
