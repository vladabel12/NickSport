import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import QuantitySelector from './QuantitySelector';
import { useTranslation } from 'react-i18next';

function Item({ item, onAdd, onShowItem, onDelete, isAdmin }) {
  const [added, setAdded] = useState(false);
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState("1");
  const currentLang = i18n.language;

  const handleAdd = (e) => {
  if (e?.stopPropagation) e.stopPropagation();
  const qty = parseInt(quantity || "1");
  onAdd(item, qty); // передаємо кількість
  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};


  return (
    <div className="item">
      <img
        src={item.image}
        alt={currentLang === 'ua' ? item.name_ua : item.name_en}
        onClick={() => onShowItem(item)}
      />
      <h2>{currentLang === 'ua' ? item.name_ua : item.name_en}</h2>
      <p>{currentLang === 'ua' ? item.short_desc_ua : item.short_desc_en}</p>
      <b className="item-price">{item.price}₴</b>
      <p className="item-code">{t('productCode')}: {item.code}</p>

      <div className="item-bottom">
        <QuantitySelector onChange={setQuantity} />
        <div className={`add-to-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? t('added') : t('buy')}
        </div>
        {isAdmin && (
          <FaTrash
            className="delete-icon"
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          />
        )}
      </div>
    </div>
  );
}

export default Item;


