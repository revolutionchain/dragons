import React, { useEffect, useState } from 'react';
import '../styles/Interface.css'
import InventoryItem from './InventoryItem';

export default function Inventory ()  {

    const inventory = [
        { quantity: 100 },
        { quantity: 100 },
        { quantity: 100 },
        {  quantity: 100 },
        { quantity: 100 },
        { quantity: 100 },
        { quantity: 100 },
        { quantity: 100 },
        {  quantity: 100 },
        { quantity: 100 },
        { quantity: 100 },
        { quantity: 100 },
        {  quantity: 100 },
        { quantity: 100 },
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
    <div className='main-interface' >
        <div className='inv-img-container'>
            <img className='inv-img' src='http://localhost:3000/images/inventory.png' />
        </div>
    <div className="inv-content">
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
