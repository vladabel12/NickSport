import QuantitySelector from './QuantitySelector';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


function Item({ item, onAdd, onShowItem }) {
  const { t } = useTranslation();
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
      <h2>{t(`products.${item.id}.title`)}</h2>
      <p>{t(`products.${item.id}.desc`)}</p>
      <b className="item-price">{item.price}₴</b>
      <div className="item-bottom">
        <QuantitySelector onChange={setQuantity} />
        <div className="add-to-cart" onClick={handleAdd}>+</div>
      </div>
    </div>
  );
}

export default Item;
