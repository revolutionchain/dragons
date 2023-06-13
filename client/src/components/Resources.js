import React, { useEffect, useState } from 'react';
import '../styles/Interface.css'
import InventoryItem from './InventoryItem';

export default function Resources ()  {

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
        <div className='inv-img-container'  style={{height: "90%"}}>
            <img className='inv-img' src='http://localhost:3000/images/resources.png' />
        </div>
    <div className="inv-content" style={{marginTop: "-7px", marginLeft: "35px"}}>
      {rows.map((row, rowIndex) => (
        <div className="inventory-row" key={rowIndex}>
          {row.map((item, index) => (
            <InventoryItem key={index} name={item.name} quantity={item.quantity} />
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};
