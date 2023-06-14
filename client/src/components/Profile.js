import React, { useEffect, useState } from 'react';
import '../styles/Interface.css'

export default function Profile ()  {
    const currentUrl = window.location.host == 'localhost:3000' ? 'http://localhost:3000' : `https://${window.location.hostname}`;

    const noProfile = `${currentUrl}/images/noprofile.jpg`;


  return (
    <div className='main-profile' >
        <img src={noProfile} width={"50px"}  />
    </div>
  );
};
