import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import QuantitySelector from './QuantitySelector';
import { useTranslation } from 'react-i18next';

function Item({ item, onAdd, onShowItem, onDelete, isAdmin }) {
  const [added, setAdded] = useState(false);
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState("1");
  const currentLang = i18n.language;

  // Функція для отримання тексту з урахуванням мови, fallback на укр або англ
  const getText = (field) => {
    if (currentLang === 'ua') return item[field + '_ua'] || '';
    if (currentLang === 'ru') return item[field + '_ru'] || item[field + '_ua'] || '';
    return item[field + '_en'] || item[field + '_ua'] || '';
  };

  const handleAdd = (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    const qty = parseInt(quantity || "1");
    onAdd(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="item">
      <img
        src={item.image}
        alt={getText('name')}
        onClick={() => onShowItem(item)}
      />
      <h2>{getText('name')}</h2>
      <p>{getText('short_desc')}</p>
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
