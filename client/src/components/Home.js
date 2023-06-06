import React from 'react';
import '../styles/Home.css'
import { useState, useEffect } from 'react';
import Mapa from './HexContent';



export default function Home() {

    useEffect(() => {
    
    }, []);

    return (
        <div className='map'>
            <Mapa />
        </div>
    )
}