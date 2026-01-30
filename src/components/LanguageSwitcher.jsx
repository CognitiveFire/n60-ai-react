import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label="Switch language"
    >
      {language === 'en' ? 'NO' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;

