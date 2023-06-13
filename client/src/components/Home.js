import React from 'react';
import '../styles/Home.css'
import { useState, useEffect } from 'react';
import Mapa from './HexContent';
import Inventory from './Inventory';
import Resources from './Resources';



export default function Home() {

    useEffect(() => {
    
    }, []);

    return (
        <div className='map'>
            <Inventory />
            <Resources />
            <Mapa />
            
        </div>
    )
}