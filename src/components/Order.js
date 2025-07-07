import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Order({ item, onDelete }) {
  const { t } = useTranslation();
  const itemTitle = t(`products.${item.id}.title`);
  return (
    <div className='order-item'>
      <img src={item.img} alt={itemTitle} />
      <h2>{itemTitle} {item.quantity > 1 && `(x${item.quantity})`}</h2>
      <b>{item.price}₴</b>
      <FaTrash 
        className='delete-icon'  
        onClick={() => onDelete(item.id)}
      />
    </div>
  );
}

export default Order;