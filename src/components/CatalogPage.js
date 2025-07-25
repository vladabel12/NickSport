import React, { useState } from 'react';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';

export default function CatalogPage() {
  const [selectedSubKey, setSelectedSubKey] = useState('');

  return (
    <div>
      <Categories chooseCategory={setSelectedSubKey} />
      <ProductList subcategoryKey={selectedSubKey} />
    </div>
  );
}
