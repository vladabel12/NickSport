import QuantitySelector from './QuantitySelector';
import React, { useState } from 'react';

function Item({ item, onAdd, onShowItem }) {
  const [quantity, setQuantity] = useState("1");

  const handleAdd = () => {
    const qty = parseInt(quantity || "1");
    for (let i = 0; i < qty; i++) {
      onAdd(item);
    }
  };

  return (
    <div className="item">
      <img src={item.img} alt={item.title} onClick={() => onShowItem(item)} />
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      <b className="item-price">{item.price}₴</b>
      <div className="item-bottom">
        <QuantitySelector onChange={setQuantity} />
        <div className="add-to-cart" onClick={handleAdd}>+</div>
      </div>
    </div>
  );
}

export default Item;
