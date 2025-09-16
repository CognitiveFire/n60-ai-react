import React, { useEffect, useRef, useState } from 'react';
import './AnimatedLogo.css';

const AnimatedLogo = ({ text = "n60", className = "" }) => {
  const logoRef = useRef(null);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const textLetters = text.split('');
    setLetters(textLetters);

    // Force animation restart by removing and re-adding animation
    const restartAnimation = () => {
      const letterElements = logoRef.current?.querySelectorAll('.logo-letter');
      if (letterElements) {
        letterElements.forEach((letter, index) => {
          const randomX = (Math.random() - 0.5) * 8; // Increased range for more dramatic jumble
          const randomY = (Math.random() - 0.5) * 8; // Increased range for more dramatic jumble
          const randomRotation = (Math.random() - 0.5) * 720; // -360 to 360 degrees
          
          letter.style.setProperty('--random-x', randomX);
          letter.style.setProperty('--random-y', randomY);
          letter.style.setProperty('--random-rotation', randomRotation);
          
          // Force animation restart
          letter.style.animation = 'none';
          letter.offsetHeight; // Trigger reflow
          letter.style.animation = 'logoJumble 3s ease-in-out forwards';
        });
      }
    };

    // Set positions with multiple attempts to ensure they're applied
    setTimeout(restartAnimation, 100);
    setTimeout(restartAnimation, 200);
    setTimeout(restartAnimation, 500);
  }, [text]);


  return (
    <div 
      className={`animated-logo ${className}`} 
      ref={logoRef}
    >
      {letters.map((char, index) => (
        <span 
          key={`${char}-${index}`} 
          className="logo-letter"
          style={{ '--final-order': index }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedLogo;
