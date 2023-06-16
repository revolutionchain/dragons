import React, { useEffect, useState } from 'react';
import '../styles/Interface.css'
import InventoryItem from './InventoryItem';

export default function Inventory() {

  const currentUrl = window.location.host == 'localhost:3000' ? 'http://localhost:3000' : `https://${window.location.hostname}`;

  const inventory = [
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
    { quantity: 100 },
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


  const [buttonsState, setButtonsState] = useState(false);
  return (
    <div className='main-interface' >
      <div className={!buttonsState ? 'mobile-elements inv-buttons-container' : 'hidden mobile-elements'}>
        <button>1</button>
        <div className='center-button-container'>
          <button>2</button>
        </div>
        <button>3</button>
      </div>
      <button className={buttonsState ? 'mobile-elements hidden-button' : 'mobile-elements'} style={{ marginTop: "-20px", padding: "10px 15px" }} onClick={() => {
        setButtonsState(!buttonsState);
      }}>{!buttonsState && 'X'}</button>
      <div className='inv-img-container'>
        <img className='inv-img' src={`${currentUrl}/images/inventory.jpg`} />
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
