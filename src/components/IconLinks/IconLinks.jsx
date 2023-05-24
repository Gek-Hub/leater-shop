import React from "react";

export default function IconLinks() {
  return (
    // <!-- иконки -->
    <div className='icons'>
      <div className='icons__item'>
        <a href='https://vk.com/iamgek'>
          <img src='./icons/vk.svg' alt='vk' />
        </a>
      </div>
      <div className='icons__item'>
        <a
          href='https://t.me/GekPlease'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='./icons/telegram.svg' alt='telegram' />
        </a>
      </div>
      <div className='icons__item'>
        <a
          href='https://www.instagram.com/anatoliytsoy_official/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='./icons/instagram.svg' alt='instagram' />
        </a>
      </div>
      <div className='icons__item'>
        <a
          href='https://wa.me/qr/IE5I47MAQFQCF1'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='./icons/whatsapp.svg' alt='whatsapp' />
        </a>
      </div>
    </div>
  );
}
