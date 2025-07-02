import React from 'react'

export default function OurLocation() {
  return (
    <div className='our_location_page'>
      <div className='our_location_images'>
        <img className='our_location_image' src="/img/shop_photo.jpg" alt="Shop Photo 1"></img>
        <img className='our_location_image' src="/img/shop_photo2.jpg" alt="Shop Photo 2"></img>
      </div>
      <div className='our_location_main'>
        <div className='our_location_main_title'>Our Location</div>
        <div className='our_location_main_desc'>Our store is located in the city of Zhashkiv opposite the Zhashkiv Lyceum No. 1. A large golden key serves as a landmark.</div>
        <a className='our_location_main_button our_location_button' href="https://maps.app.goo.gl/JJN3C8Q5nv3jaxd27" target="_blank" rel="noopener noreferrer">See on the map</a>
      </div>
    </div>
  )
}
