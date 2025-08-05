
import React from 'react';
import dashboardEn from '../images/dashboard.png';
import dashboardNo from '../images/dashboard-no.png';



const LanguageImage = ({ lang, alt, srcNo, srcEn, className = "" }) => {
  const imageSrc = lang === 'no' ? srcNo : srcEn;

  return <img src={imageSrc} alt={alt} className={className} />;
};

export default LanguageImage;
