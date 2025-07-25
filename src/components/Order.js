import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Order({ item, onDelete }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Вибираємо назву залежно від мови
  const title = currentLang === 'ua' ? item.name_ua : item.name_en;

  return (
    <div className='order-item'>
      <img src={item.image} alt={title} />
      <h2>
        {title} {item.quantity > 1 && `(x${item.quantity})`}
      </h2>
      <b>
        {item.price * item.quantity}₴
      </b>
      <FaTrash
        className='delete-icon'
        onClick={() => onDelete(item.id)}
      />
    </div>
  );
}

export default Order;
