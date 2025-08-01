import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


const AddCategoryForm = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState({
    name_ua: '',
    name_en: '',
    name_ru: '',
    subcategories: []
  });

  const [sub, setSub] = useState({
    name_ua: '',
    name_en: '',
    name_ru: ''
  });

  const generateKey = (name) =>
    name.toLowerCase().trim().replace(/\s+/g, '-');

  const handleAddSub = () => {
    if (sub.name_ua && sub.name_en && sub.name_ru) {
      const newSub = {
        key: generateKey(sub.name_ua),
        name_ua: sub.name_ua,
        name_en: sub.name_en,
        name_ru: sub.name_ru
      };

      const isDuplicate = category.subcategories.some(s => s.key === newSub.key);
      if (isDuplicate) {
        toast.error(t('subcategoryExists'));
        return;
      }

      setCategory(prev => ({
        ...prev, subcategories: [...prev.subcategories, newSub]}));
        setSub({ name_ua: '', name_en: '', name_ru: '' });
      } else {
        toast.warning(t('FillAllFieldsSubcategory'));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!category.name_ua || !category.name_en || !category.name_ru) {
        toast.warning(t('FillAllFieldsCategory'));
        return;
      }

    const key = generateKey(category.name_ua);

    try {
      await addDoc(collection(db, 'categories'), {
        ...category, key, createdAt: serverTimestamp() });
        toast.success(t('CategoryCreated'));
        setCategory({ name_ua: '', name_en: '', name_ru: '', subcategories: [] });
        setShowForm(false);
      } catch (error) {
        toast.error(t('ErrorCreatingCategory'));
        console.error(error);
      }
  };

  return (
    <div>
      <button type="button" onClick={() => setShowForm(!showForm)} className="add_category_button">
        {showForm ? t('Cancel') : t('AddCategory')}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="add-category-form">
          <input placeholder={t('TitleUa')} value={category.name_ua} onChange={(e) => setCategory({ ...category, name_ua: e.target.value })} required className="add_category_input"/>
          <input placeholder={t('TitleEn')} value={category.name_en} onChange={(e) => setCategory({ ...category, name_en: e.target.value })} required className="add_category_input"/>
          <input placeholder={t('TitleRu')} value={category.name_ru} onChange={(e) => setCategory({ ...category, name_ru: e.target.value })} required className="add_category_input"/>
          <h4 className="subcategory_title">{t('Subcategories')}</h4>
            {category.subcategories.map((s, i) => (
              <div key={i}>{s.key} — {s.name_ua}</div>
            ))}

          <div className="subs-inputs">
            <input placeholder={t('TitleUa')} value={sub.name_ua} onChange={(e) => setSub({ ...sub, name_ua: e.target.value })} className="add_category_input"/>
            <input placeholder={t('TitleEn')} value={sub.name_en} onChange={(e) => setSub({ ...sub, name_en: e.target.value })} className="add_category_input"/>
            <input placeholder={t('TitleRu')} value={sub.name_ru} onChange={(e) => setSub({ ...sub, name_ru: e.target.value })} className="add_category_input"/>
            <button type="button" onClick={handleAddSub} className="add_category_button">{t('SaveSubategory')}</button>
          </div>
          <button type="submit" className="add_category_button">{t('CreateCategory')}</button>
        </form>
      )}
    </div>
  );
};

export default AddCategoryForm;





