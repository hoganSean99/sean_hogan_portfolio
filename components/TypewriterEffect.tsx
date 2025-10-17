"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
}

export default function TypewriterEffect({
  words,
  className = "",
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));

          if (currentText === word) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, words, currentWordIndex]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
