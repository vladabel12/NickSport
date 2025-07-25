import React, { useState, useEffect } from 'react';
import QuantitySelector from './QuantitySelector';
import { useTranslation } from 'react-i18next';

function ShowFullItem({ item, onAdd, onShowItem }) {
  const [added, setAdded] = useState(false);
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState("1");

  const currentLang = i18n.language;

  useEffect(() => {
    window.history.pushState({ showFullItem: true }, '');
    const handlePopState = () => onShowItem(item);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [item, onShowItem]);

  const handleAdd = (e) => {
  if (e?.stopPropagation) e.stopPropagation();
  const qty = parseInt(quantity || "1");
  onAdd(item, qty); // передаємо кількість
  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};


  return (
    <div className='full-item-overlay' onClick={() => onShowItem(item)}>
      <div className='full-item' onClick={(e) => e.stopPropagation()}>
        <div>
          <img src={item.image} alt={currentLang === 'ua' ? item.name_ua : item.name_en} />
          <h2>{currentLang === 'ua' ? item.name_ua : item.name_en}</h2>
          <div
            style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}
          >
            {currentLang === 'ua' ? item.full_desc_ua : item.full_desc_en}
          </div>
          <b>{item.price}₴</b>
          <p className="item-code">{t('productCode')}: {item.code}</p>
          <div className='item-bottom'>
            <QuantitySelector onChange={setQuantity} />
            <div
              className={`add-to-cart ${added ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {added ? t('added') : t('buy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowFullItem;





