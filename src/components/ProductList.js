// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function ProductList({ subcategoryKey }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), snapshot => {
      const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = allProducts.filter(p => p.subcategory?.key === subcategoryKey);
      setProducts(filtered);
    });

    return () => unsubscribe();
  }, [subcategoryKey]);

  if (!subcategoryKey) return null;

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name_ua} />
            <h3>{product.name_ua}</h3>
            <p>{product.short_desc_ua}</p>
            <p>{product.price} грн</p>
          </div>
        ))
      ) : (
        <p>Товари не знайдено.</p>
      )}
    </div>
  );
}
