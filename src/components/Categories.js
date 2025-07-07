import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Categories = ({ chooseCategory }) => {
  const { t } = useTranslation();
  const categories = [
    {
      key: 'all',
      name: t('all'),
    },
    {
      key: 'balls',
      name: t('balls'),
    },
    {
      key: 'gloves',
      name: t('gloves'),
    },
    {
      key: 'towels',
      name: t('towels'),
    },
    {
      key: 'kettlebells',
      name: t('kettlebells'),
    },
    {
      key: 'belts',
      name: t('belts'),
    },
    {
      key: 'sneakers',
      name: t('sneakers'),
    },
  ];

  return (
    <div className='categories'>
      {categories.map(el => (
        <div key={el.key} onClick={() => chooseCategory(el.key)}>{el.name}</div>
      ))}
    </div>
  );
};

export default Categories;