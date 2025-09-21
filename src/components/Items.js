import React from 'react';
import Item from './Item';

function Items({ items, onAdd, onShowItem, onDelete, onEdit, isAdmin }) {
  return (
    <main className='main_items'>
      {items.map((el) => (
        <Item  key={el.id} item={el} onAdd={onAdd} onShowItem={onShowItem} onDelete={onDelete} onEdit={onEdit} isAdmin={isAdmin}/>
      ))}
    </main>
  );
}

export default Items;
