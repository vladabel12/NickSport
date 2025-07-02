import React, {useState} from 'react';
import QuantitySelector from './QuantitySelector';

function ShowFullItem({ item, onAdd, onShowItem }) {
  const [quantity, setQuantity] = useState("1");

  const handleAdd = (e) => {
    e.stopPropagation();
    const qty = parseInt(quantity || "1");
    for (let i = 0; i < qty; i++) {
      onAdd(item);
    }
  };
  return (
    <div className='full-item-overlay' onClick={() => onShowItem(item)}>
      <div className='full-item' onClick={(e) => e.stopPropagation()}>
        <div>
            <img src={process.env.PUBLIC_URL + '/img/' + item.img} alt={item.title} onClick={() => onShowItem(item)} />
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.full_desc }} />
            <b>{item.price}₴</b>
            <div className='item-bottom'>
              <QuantitySelector onChange={setQuantity} />
              <div className='add-to-cart' onClick={handleAdd}>+</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ShowFullItem;