import React, { useState, useRef, useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { getAuth } from "firebase/auth";
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AddCategoryForm from './AddCategoryForm';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Categories = ({ chooseCategory }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [addingSubTo, setAddingSubTo] = useState(null);
  const [newSub, setNewSub] = useState({ name_ua: '', name_en: '', name_ru: '' });
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
        setNewSub({ name_ua: '', name_en: '', name_ru: '' });
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
      setOpenCategory(null);
      setAddingSubTo(null);
      setNewSub({ name_ua: '', name_en: '', name_ru: '' });
    } else {
      setOpenCategory(key);
      setAddingSubTo(null);
      setNewSub({ name_ua: '', name_en: '', name_ru: '' });
    }
  };

  const generateKey = (name) =>
    name.toLowerCase().trim().replace(/\s+/g, '-');

  const handleDeleteCat = (id) => {
    confirmAlert({
      title: (t('ConfirmationOfDeletionTitle')),
      message: (t('ConfirmationOfDeletionDesc')),
      buttons: [
        {
          label: (t('yes')),
          onClick: async () => {
            try {
              await deleteDoc(doc(db, 'categories', id));
              toast.success(t('CategoryDeleted'));
            } catch (error) {
              toast.error(t('CategoryDeletionError'));
              console.error(error);
            }
          }
        },
        {
          label: (t('cancel')),
          onClick: () => {
            toast.info(t('DeletionCanceled'));
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const handleDeleteSubcategory = (catId, subKey, subcategories) => {
    confirmAlert({
      title: (t('ConfirmationOfDeletionTitle')),
      message: (t('ConfirmationOfDeletionSubDesc')),
      buttons: [
        {
          label: (t('yes')),
          onClick: async () => {
            try {
              const newSubs = subcategories.filter(s => s.key !== subKey);
              const docRef = doc(db, 'categories', catId);
              await updateDoc(docRef, { subcategories: newSubs });
              toast.success(t('SubcategoryDeleted'));
            } catch (error) {
              toast.error(t('ErrorDeletingSubcategory'));
              console.error(error);
            }
          }
        },
        {
          label: (t('cancel')),
          onClick: () => {
            toast.info(t('DeletionCanceled'));
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const handleAddSubcategory = async (category) => {
    if (!newSub.name_ua || !newSub.name_en) {
      alert(t('FillAllFieldsSubcategory'));
      return;
    }
    const key = generateKey(newSub.name_ua);

    if (category.subcategories?.some(s => s.key === key)) {
      alert(t('SubcategoryWithKeyExists'));
      return;
    }

    const updatedSubs = [
      ...(category.subcategories || []),
      { key, name_ua: newSub.name_ua, name_en: newSub.name_en, name_ru: newSub.name_ru }
    ];

    try {
      const docRef = doc(db, 'categories', category.id);
      await updateDoc(docRef, { subcategories: updatedSubs });
      toast.success(t('SubcategoryAdded'));
      setAddingSubTo(null);
      setNewSub({ name_ua: '', name_en: '', name_ru: '' });
    } catch (error) {
      toast.error(t('ErrorSubcategoryAdded'));
      console.error(error);
    }
  };

  return (
    <div className="categories" ref={dropdownRef}>
      <div className="categories-button" onClick={toggleDropdown}>{t('categories')}</div>
      {open && (
        <div className="categories-dropdown">
          {isAdmin && <AddCategoryForm />}
          <div className="categories-item">
            <div className="category-header">
              <div className="category-name" onClick={() => { chooseCategory('all'); setOpen(false); setOpenCategory(null); }}>{t('all')}</div>
            </div>
          </div>

          {categories.map(cat => (
            <div key={cat.id} className="categories-item">
              <div className="category-header">
                <div className="category-name with-sub" onClick={() => toggleSub(cat.key)}>
                  {isAdmin && (
                    <FaTrash className="delete-icon" onClick={(e) => { e.stopPropagation(); handleDeleteCat(cat.id); }} title={t('DeleteCategory')}/>
                  )}
                  {cat[`name_${i18n.language}`] || cat.name_ua}
                  <span className="arrow">{openCategory === cat.key ? '▴' : '▾'}</span>
                </div>
              </div>

              {openCategory === cat.key && (
                <div className="subcategories">
                  {cat.subcategories?.map(sub => (
                    <div key={sub.key} className="subcategory-item">
                      <div className="subcategory-name" onClick={() => { chooseCategory(cat.key, sub.key); setOpen(false); setOpenCategory(null); }}>
                        {isAdmin && (
                          <FaTrash className="delete-icon"  onClick={(e) => {  e.stopPropagation();  handleDeleteSubcategory(cat.id, sub.key, cat.subcategories);}} title={t('DeleteSubcategory')} />
                        )}
                        {sub[`name_${i18n.language}`] || sub.name_ua}
                      </div>
                    </div>
                  ))}

                  {isAdmin && (
                    <>
                      {!addingSubTo || addingSubTo !== cat.key ? (
                        <button onClick={() => setAddingSubTo(cat.key)} className='add_category_button add_subcategory' > {t('AddSubcategory')} </button>
                      ) : (
                        <div>
                          <input placeholder={t('TitleUa')} value={newSub.name_ua} onChange={(e) => setNewSub({ ...newSub, name_ua: e.target.value })} className='add_category_input'/>
                          <input placeholder={t('TitleEn')} value={newSub.name_en} onChange={(e) => setNewSub({ ...newSub, name_en: e.target.value })} className='add_category_input'/>
                          <input placeholder={t('TitleRu')} value={newSub.name_ru} onChange={(e) => setNewSub({ ...newSub, name_ru: e.target.value })} className='add_category_input'/>
                          <button onClick={() => handleAddSubcategory(cat)} className='add_category_button add_sub_button'>{t('Add')}</button>
                          <button onClick={() => { setAddingSubTo(null); setNewSub({ name_ua: '', name_en: '', name_ru: '' }); }} className='add_category_button'>{t('cancel')}</button>
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


