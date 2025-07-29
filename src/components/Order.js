import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Order({ item, onDelete }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const getText = (field) => {
    if (currentLang === 'ua') return item[field + '_ua'] || '';
    if (currentLang === 'ru') return item[field + '_ru'] || item[field + '_ua'] || '';
    return item[field + '_en'] || item[field + '_ua'] || '';
  };

  const title = getText('name');

  return (
    <div className='order-item'>
      <img src={item.image} alt={title} />
      <h2>
        {title} {item.quantity > 1 && `(x${item.quantity})`}
      </h2>
      <b>{item.price * item.quantity}₴</b>
      <FaTrash className='delete-icon' onClick={() => onDelete(item.id)} />
    </div>
  );
}

export default Order;
