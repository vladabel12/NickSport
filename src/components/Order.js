import React from 'react';
import { FaTrash } from 'react-icons/fa';

function Order({ item, onDelete }) {
  return (
    <div className='order-item'>
      <img src={item.img} alt={item.title} />
      <h2>{item.title} {item.quantity > 1 && `(x${item.quantity})`}</h2>
      <b>{item.price}₴</b>
      <FaTrash 
        className='delete-icon'  
        onClick={() => onDelete(item.id)}
      />
    </div>
  );
}

export default Order;