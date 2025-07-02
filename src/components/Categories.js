import React, { useState } from 'react';

const Categories = ({ chooseCategory }) => {
  const [categories] = useState([
    {
      key: 'all',
      name: 'All',
    },
    {
      key: 'balls',
      name: 'Balls',
    },
    {
      key: 'gloves',
      name: 'Gloves',
    },
    {
      key: 'towels',
      name: 'Towels',
    },
    {
      key: 'kettlebells',
      name: 'Kettlebells',
    },
    {
      key: 'belts',
      name: 'Belts',
    },
    {
      key: 'sneakers',
      name: 'Sneakers',
    },
  ]);

  return (
    <div className='categories'>
      {categories.map(el => (
        <div key={el.key} onClick={() => chooseCategory(el.key)}>{el.name}</div>
      ))}
    </div>
  );
};

export default Categories;