import QuantitySelector from './QuantitySelector';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


function Item({ item, onAdd, onShowItem }) {
  const [added, setAdded] = useState(false);
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState("1");

  const handleAdd = (e) => {
  if (e?.stopPropagation) e.stopPropagation();
  const qty = parseInt(quantity || "1");
  for (let i = 0; i < qty; i++) {
    onAdd(item);
  }

  // Зміна на "Додано"
  setAdded(true);
  setTimeout(() => setAdded(false), 2000); // повернути назад через 2 сек
};


  return (
    <div className="item">
      <img src={item.img} alt={item.title} onClick={() => onShowItem(item)} />
      <h2>{t(`products.${item.id}.title`)}</h2>
      <p>{t(`products.${item.id}.desc`)}</p>
      <b className="item-price">{item.price}₴</b>
      <p className="item-code">{t('productCode')}: {item.code}</p>
      <div className="item-bottom">
        <QuantitySelector onChange={setQuantity} />
        <div className={`add-to-cart ${added ? 'added' : ''}`}  onClick={handleAdd}>
          {added ? t('added') : t('buy')}
        </div>

      </div>
    </div>
  );
}

export default Item;
