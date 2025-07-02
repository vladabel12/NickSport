import React, { useState } from 'react';

function QuantitySelector({ onChange }) {
  const [quantity, setQuantity] = useState("1");

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setQuantity(value);
      onChange(value); // передаємо в батьківський компонент
    }
  };

  const increase = () => {
    const newQty = String(parseInt(quantity || "1") + 1);
    setQuantity(newQty);
    onChange(newQty);
  };

  const decrease = () => {
    const newQty = parseInt(quantity || "1");
    if (newQty > 1) {
      const updated = String(newQty - 1);
      setQuantity(updated);
      onChange(updated);
    }
  };

  return (
    <div className="quantity-controls">
      <button onClick={decrease}>−</button>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={handleQuantityChange}
      />
      <button onClick={increase}>+</button>
    </div>
  );
}

export default QuantitySelector;
