import React from 'react';

const InventoryItem = ({ name = false, quantity, pos }) => {
  return (
    <div className={name && pos == 0 ? "res-items" : ""} style={{display: 'flex', alignItems: "center", }}>
    {name && <div className="item-name">{name}:</div>}
    <div style={name ? { height: '50%'} : {}} className="inventory-item">
      <div className="item-quantity" style={name ? {fontSize: "12px"} : {}}>{quantity}</div>
    </div>
    </div>
  );
};

export default InventoryItem;