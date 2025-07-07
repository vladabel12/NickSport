import React, {useState} from 'react';
import QuantitySelector from './QuantitySelector';
import { useTranslation } from 'react-i18next';

function ShowFullItem({ item, onAdd, onShowItem }) {
  const { t } = useTranslation();
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
            <img src={item.img} alt={item.title} onClick={() => onShowItem(item)}/>
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: t(`products.${item.id}.full_desc`) }} />
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