import React from 'react';
import '../styles/Home.css'
import { useState, useEffect } from 'react';
import GameContent from './GameContent';



export default function Home() {

    useEffect(() => {
    
    }, []);

    return (
        <div className='map'>
            <GameContent />
        </div>
    )
}