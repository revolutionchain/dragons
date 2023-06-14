import React, { useEffect, useState } from 'react';
import '../styles/Interface.css'
import InventoryItem from './InventoryItem';

export default function Resources ()  {
  const currentUrl = window.location.host == 'localhost:3000' ? 'http://localhost:3000' : `https://${window.location.hostname}`;

    const inventory = [
        { name: 'Wood', quantity: 100 },
        { name: 'Food', quantity: 100 },
        { name: 'Gold', quantity: 100 },
        { name: 'Stone', quantity: 100 },
        { name: 'Iron', quantity: 100 },
        // Agrega más elementos al inventario si es necesario
      ];
    
      const rows = [];
      const itemsPerRow = 5;
    
      // Divide los elementos del inventario en filas
      for (let i = 0; i < inventory.length; i += itemsPerRow) {
        const rowItems = inventory.slice(i, i + itemsPerRow);
        rows.push(rowItems);
      }
  return (
    <div className='main-resources' style={{backgroundColor: "transparent"}} >
        <div className='inv-img-container'  >
            <img className='inv-img' src={`${currentUrl}/images/resources.png`} />
        </div>
    <div className="inv-content res-content" >
      {rows.map((row, rowIndex) => (
        <div className="inventory-row res-row" key={rowIndex}>
          {row.map((item, index) => (
            <InventoryItem key={index} name={item.name} quantity={item.quantity} pos={index} />
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};
