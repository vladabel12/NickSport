import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddCategoryForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState({
    name_ua: '',
    name_en: '',
    subcategories: []
  });

  const [sub, setSub] = useState({ name_ua: '', name_en: '' });

  const generateKey = (name) =>
    name.toLowerCase().trim().replace(/\s+/g, '-');

  const handleAddSub = () => {
    if (sub.name_ua && sub.name_en) {
      const newSub = {
        key: generateKey(sub.name_ua),
        name_ua: sub.name_ua,
        name_en: sub.name_en
      };

      const isDuplicate = category.subcategories.some(s => s.key === newSub.key);
      if (isDuplicate) {
        alert('Підкатегорія з таким ключем уже існує');
        return;
      }

      setCategory(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, newSub]
      }));
      setSub({ name_ua: '', name_en: '' });
    } else {
      alert('Будь ласка, заповніть усі поля підкатегорії');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.name_ua || !category.name_en) {
      alert('Будь ласка, заповніть всі поля категорії');
      return;
    }

    const key = generateKey(category.name_ua);

    try {
      await addDoc(collection(db, 'categories'), {
        ...category,
        key,
        createdAt: serverTimestamp()
      });
      alert('Категорію створено');
      setCategory({ name_ua: '', name_en: '', subcategories: [] });
      setShowForm(false); // сховати після додавання
    } catch (error) {
      alert('Помилка при створенні категорії');
      console.error(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setShowForm(!showForm)} className='add_category_button'>
        {showForm ? '✖ Скасувати' : '+ Додати категорію'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-category-form">
          <input
            placeholder="Назва (UA)"
            value={category.name_ua}
            onChange={(e) => setCategory({ ...category, name_ua: e.target.value })}
            required className='add_category_input'/>
          <input
            placeholder="Назва (EN)"
            value={category.name_en}
            onChange={(e) => setCategory({ ...category, name_en: e.target.value })}
            required className='add_category_input'/>

          <h5>Підкатегорії:</h5>
          {category.subcategories.map((s, i) => (
            <div key={i}>{s.key} — {s.name_ua}</div>
          ))}

          <div className="subs-inputs">
            <input
              placeholder="Назва UA"
              value={sub.name_ua}
              onChange={(e) => setSub({ ...sub, name_ua: e.target.value })} className='add_category_input'
            />
            <input
              placeholder="Назва EN"
              value={sub.name_en}
              onChange={(e) => setSub({ ...sub, name_en: e.target.value })} className='add_category_input'
            />
            <button type="button" onClick={handleAddSub} className='add_category_button'>Зберегти підкатегорію</button>
          </div>

          <button type="submit" className='add_category_button'>Створити категорію</button>
        </form>
      )}
    </div>
  );
};

export default AddCategoryForm;


