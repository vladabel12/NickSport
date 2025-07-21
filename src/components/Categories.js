import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Categories = ({ chooseCategory }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const dropdownRef = useRef(null);

  const categories = [
    { key: 'all', name: t('all') },
    { key: 'balls', name: t('balls') },
    {
      key: 'clothing',
      name: t('clothing'),
      subcategories: [
        { key: 'gloves', name: t('gloves') },
        { key: 'belts', name: t('belts') },
      ],
    },
    {
      key: 'accessories',
      name: t('accessories'),
      subcategories: [
        { key: 'towels', name: t('towels') },
        { key: 'kettlebells', name: t('kettlebells') },
      ],
    },
    {
      key: 'shoes',
      name: t('shoes'),
      subcategories: [
        { key: 'sneakers', name: t('sneakers') },
      ],
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setOpenCategory(null);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const toggleDropdown = () => setOpen(!open);
  const toggleSub = (key) => setOpenCategory(openCategory === key ? null : key);

  return (
    <div className="categories" ref={dropdownRef}>
      {/* Кнопка «Категорії» */}
      <div className="categories-button" onClick={toggleDropdown}>
        {t('categories')}
      </div>

      {open && (
        <div className="categories-dropdown">
          {categories.map((cat) => (
            <div key={cat.key} className="categories-item">
              {!cat.subcategories ? (
                <div
                  className="category-name"
                  onClick={() => {
                    chooseCategory(cat.key);
                    setOpen(false);
                  }}
                >
                  {cat.name}
                </div>
              ) : (
                <>
                  <div
                    className="category-name with-sub"
                    onClick={() => toggleSub(cat.key)}
                  >
                    {cat.name} <span className="arrow">{openCategory === cat.key ? '▴' : '▾'}</span>
                  </div>
                  {openCategory === cat.key && (
                    <div className="subcategories">
                      {cat.subcategories.map((sub) => (
                        <div
                          key={sub.key}
                          className="subcategory-name"
                          onClick={() => {
                            chooseCategory(sub.key);
                            setOpen(false);
                            setOpenCategory(null);
                          }}
                        >
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
