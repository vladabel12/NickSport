import React from 'react';
const About = () => {
  return (
    <div className='about_us_page'>
      <div className='about_us_images'>
        <img className='about_us_images_image' src={process.env.PUBLIC_URL + '/img/chainsaw.jpg'} alt="Chainsaw"></img>
        <img className='about_us_images_image' src={process.env.PUBLIC_URL + '/img/clock.jpg'} alt="CLock"></img>
        <img className='about_us_images_image' src={process.env.PUBLIC_URL + '/img/keys.jpg'} alt="Keys"></img>
      </div>
      <div className='about_us_main'>
        <div className='about_us_main_title'>About Us</div>
        <div className='about_us_main_desc'>We do not only sell sporting goods, but also repair chainsaws and chainsaws, wristwatches, sharpen knives and chains, and make duplicate keys.</div>
        <a className='about_us_main_button' href="viber://chat?number=+380632093663" target="_blank" rel="noopener noreferrer">Our Viber</a>
      </div>
    </div>
  );
};

export default About;

