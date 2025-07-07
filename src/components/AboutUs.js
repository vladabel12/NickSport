import React from 'react';
import { useTranslation } from 'react-i18next';
const About = () => {
   const { t } = useTranslation();
  return (
    <div className='about_us_page'>
      <div className='about_us_images'>
        <img className='about_us_images_image' src={process.env.PUBLIC_URL + '/img/chainsaw.jpg'} alt="Chainsaw"></img>
        <img className='about_us_images_image' src={process.env.PUBLIC_URL + '/img/clock.jpg'} alt="CLock"></img>
        <img className='about_us_images_image' src={process.env.PUBLIC_URL + '/img/keys.jpg'} alt="Keys"></img>
      </div>
      <div className='about_us_main'>
        <div className='about_us_main_title'>{t('aboutUsTitle')}</div>
        <div className='about_us_main_desc'>{t('aboutUsDesc')}</div>
        <a className='about_us_main_button' href="viber://chat?number=+380632093663" target="_blank" rel="noopener noreferrer">{t('viber')}</a>
      </div>
    </div>
  );
};

export default About;

