import React from 'react'
import { useTranslation } from 'react-i18next';

export default function OurLocation() {
  const { t } = useTranslation();
  return (
    <div className='our_location_page'>
      <div className='our_location_images'>
        <img className='our_location_image' src={process.env.PUBLIC_URL + '/img/shop_photo.jpg'} alt="Shop Photo 1"></img>
        <img className='our_location_image' src={process.env.PUBLIC_URL + '/img/shop_photo2.jpg'} alt="Shop Photo 2"></img>
      </div>
      <div className='our_location_main'>
        <div className='our_location_main_title'>{t('ourLocationTitle')}</div>
        <div className='our_location_main_desc'>{t('ourLocationDesc')}</div>
        <a className='our_location_main_button our_location_button' href="https://maps.app.goo.gl/JJN3C8Q5nv3jaxd27" target="_blank" rel="noopener noreferrer">{t('ourLocationButton')}</a>
      </div>
    </div>
  )
}
