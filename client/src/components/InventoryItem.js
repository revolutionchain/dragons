import React from 'react';

const InventoryItem = ({ name = false, quantity }) => {
  return (
    <div style={{display: 'flex', alignItems: "center", }}>
    {name && <div className="item-name">{name}:</div>}
    <div style={name ? { height: '40%'} : {}} className="inventory-item">
      <div className="item-quantity" style={name ? {fontSize: "12px"} : {}}>{quantity}</div>
    </div>
    </div>
  );
};

export default InventoryItem;