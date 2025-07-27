import React, { useState, useRef, useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { getAuth } from "firebase/auth";
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AddCategoryForm from './AddCategoryForm';
import { FaTrash } from 'react-icons/fa';

const Categories = ({ chooseCategory }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [addingSubTo, setAddingSubTo] = useState(null); // ключ категорії, куди додаємо підкатегорію
  const [newSub, setNewSub] = useState({ name_ua: '', name_en: '' });
  const dropdownRef = useRef(null);

  const user = getAuth().currentUser;
  const isAdmin = user?.email === 'skhool2205@gmail.com';

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'categories'), snap => {
      const cats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCategories(cats);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setOpenCategory(null);
        setAddingSubTo(null);
        setNewSub({ name_ua: '', name_en: '' });
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
  const toggleSub = (key) => {
    if (openCategory === key) {
      // Якщо вже відкрита, то закриваємо і форму додавання теж
      setOpenCategory(null);
      setAddingSubTo(null);
      setNewSub({ name_ua: '', name_en: '' });
    } else {
      setOpenCategory(key);
      setAddingSubTo(null);
      setNewSub({ name_ua: '', name_en: '' });
    }
  };

  const generateKey = (name) =>
    name.toLowerCase().trim().replace(/\s+/g, '-');

  const handleDeleteCat = async (id) => {
    if (!window.confirm('Видалити категорію?')) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      alert('Категорію видалено');
    } catch (error) {
      alert('Помилка видалення категорії');
      console.error(error);
    }
  };

  const handleDeleteSubcategory = async (catId, subKey, subcategories) => {
    if (!window.confirm('Видалити підкатегорію?')) return;
    try {
      const newSubs = subcategories.filter(s => s.key !== subKey);
      const docRef = doc(db, 'categories', catId);
      await updateDoc(docRef, { subcategories: newSubs });
      alert('Підкатегорію видалено');
    } catch (error) {
      alert('Помилка видалення підкатегорії');
      console.error(error);
    }
  };

  const handleAddSubcategory = async (category) => {
    if (!newSub.name_ua || !newSub.name_en) {
      alert('Будь ласка, заповніть всі поля підкатегорії');
      return;
    }
    const key = generateKey(newSub.name_ua);

    if (category.subcategories?.some(s => s.key === key)) {
      alert('Підкатегорія з таким ключем вже існує');
      return;
    }

    const updatedSubs = [
      ...(category.subcategories || []),
      { key, name_ua: newSub.name_ua, name_en: newSub.name_en }
    ];

    try {
      const docRef = doc(db, 'categories', category.id);
      await updateDoc(docRef, { subcategories: updatedSubs });
      alert('Підкатегорію додано');
      setAddingSubTo(null);
      setNewSub({ name_ua: '', name_en: '' });
    } catch (error) {
      alert('Помилка додавання підкатегорії');
      console.error(error);
    }
  };

  return (
    <div className="categories" ref={dropdownRef}>
      <div className="categories-button" onClick={toggleDropdown}>
        {t('categories')}
      </div>
      {open && (
        <div className="categories-dropdown">
          {isAdmin && <AddCategoryForm />}
          <div className="categories-item">
            <div className="category-header">
              <div className="category-name" onClick={() => { chooseCategory('all'); setOpen(false); setOpenCategory(null); }}>
                {t('all')}
              </div>
            </div>
          </div>

          {categories.map(cat => (
            <div key={cat.id} className="categories-item">
              <div className="category-header">
                <div
                  className="category-name with-sub"
                  onClick={() => toggleSub(cat.key)}
                >
                   {isAdmin && (
                  <FaTrash
                    className="delete-icon"
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={(e) => { e.stopPropagation(); handleDeleteCat(cat.id); }}
                    title="Видалити категорію"
                  />
                )}
                  {cat[`name_${i18n.language}`] || cat.name_ua}
                  <span className="arrow">{openCategory === cat.key ? '▴' : '▾'}</span>
                </div>
              </div>

              {openCategory === cat.key && (
                <div className="subcategories">
                  {cat.subcategories?.map(sub => (
                    <div key={sub.key} className="subcategory-item">
                      <div
                        className="subcategory-name"
                        onClick={() => { chooseCategory(cat.key, sub.key); setOpen(false); setOpenCategory(null); }}
                      >
                        {isAdmin && (
                        <FaTrash
                          className="delete-icon"
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSubcategory(cat.id, sub.key, cat.subcategories);
                          }}
                          title="Видалити підкатегорію"
                        />
                      )}
                        {sub[`name_${i18n.language}`] || sub.name_ua}
                      </div>
                    </div>
                  ))}

                  {/* Кнопка для додавання підкатегорії */}
                  {isAdmin && (
                    <>
                      {!addingSubTo || addingSubTo !== cat.key ? (
                        <button
                          onClick={() => setAddingSubTo(cat.key)} className='add_category_button add_subcategory'
                        >
                          + Додати підкатегорію
                        </button>
                      ) : (
                        <div>
                          <input
                            placeholder="Назва UA"
                            value={newSub.name_ua}
                            onChange={(e) => setNewSub({ ...newSub, name_ua: e.target.value })} className='add_category_input'/>
                          <input
                            placeholder="Назва EN"
                            value={newSub.name_en}
                            onChange={(e) => setNewSub({ ...newSub, name_en: e.target.value })} className='add_category_input'/>
                          <button onClick={() => handleAddSubcategory(cat)} className='add_category_button add_sub_button'>Додати</button>
                          <button onClick={() => { setAddingSubTo(null); setNewSub({ name_ua: '', name_en: '' }); }}className='add_category_button'>Скасувати</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
