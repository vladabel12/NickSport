import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify'; 


function AddProductForm({ onClose }) {
  const [form, setForm] = useState({
    name_ua: '',
    name_en: '',
    name_ru: '',
    short_desc_ua: '',
    short_desc_en: '',
    full_desc_ua: '',
    full_desc_en: '',
    full_desc_ru: '',
    price: '',
    code: '',
    category: '',
    subcategory: '',
    image: ''
  });

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const API_KEY = 'cb820140e0d4aa4d1339df6dd58891b8'; // ImgBB ключ

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const cats = querySnapshot.docs.map(doc => doc.data());
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToImgBB = async () => {
    if (!file) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setUploading(false);

      if (data.success) {
        return data.data.url;
      } else {
        alert('Помилка ImgBB');
        return null;
      }
    } catch (err) {
      setUploading(false);
      console.error('Помилка:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = form.image;
      if (file) {
        const uploadedUrl = await uploadToImgBB();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast.error('Не вдалося завантажити зображення');
          return;
        }
      }

      await addDoc(collection(db, 'products'), {
        ...form,
        category: form.category,
        subcategory: form.subcategory,
        image: imageUrl,
        price: parseFloat(form.price),
        createdAt: new Date()
      });

      toast.success('Товар додано!');
      setForm({
        name_ua: '',
        name_en: '',
        name_ru: '',
        short_desc_ua: '',
        short_desc_en: '',
        short_desc_ru: '',
        full_desc_ua: '',
        full_desc_en: '',
        full_desc_ru: '',
        price: '',
        code: '',
        category: '',
        subcategory: '',
        image: ''
      });
      setFile(null);

      if (onClose) onClose(); // ⬅️ автоматично закриває форму
    } catch (error) {
      toast.error('Помилка додавання');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input name="name_ua" placeholder="Назва (укр)" value={form.name_ua} onChange={handleChange} required className='add_product_input' />
      <input name="name_en" placeholder="Name (en)" value={form.name_en} onChange={handleChange} required className='add_product_input' />
      <input name="name_ru" placeholder="Назва (ru)" value={form.name_ru} onChange={handleChange} className='add_product_input'/>
      <input name="short_desc_ua" placeholder="Короткий опис (укр)" value={form.short_desc_ua} onChange={handleChange} className='add_product_input' />
      <input name="short_desc_en" placeholder="Short description (en)" value={form.short_desc_en} onChange={handleChange} className='add_product_input' />
      <input name="short_desc_ru" placeholder="Короткий опис (ru)" value={form.short_desc_ru} onChange={handleChange} className='add_product_input'/>
      <textarea name="full_desc_ua" placeholder="Повний опис (укр)" value={form.full_desc_ua} onChange={handleChange} className='add_product_input' />
      <textarea name="full_desc_en" placeholder="Full description (en)" value={form.full_desc_en} onChange={handleChange} className='add_product_input' />
      <textarea name="full_desc_ru" placeholder="Повний опис (ru)" value={form.full_desc_ru} onChange={handleChange} className='add_product_input'/>
      <input name="price" placeholder="Ціна" type="number" value={form.price} onChange={handleChange} required className='add_product_input' />
      <input name="code" placeholder="Код товару" value={form.code} onChange={handleChange} required className='add_product_input' />

      <div className='add_image'>
        <input name="image" placeholder="URL картинки" value={form.image} onChange={handleChange} className='add_product_input url_image' />
        <input type="file" id="upload" accept="image/*" onChange={handleFileChange} className='hidden_button' />
      </div>

      <select name="category" value={form.category} onChange={handleChange} required className='add_products_category'>
        <option value="">-- Виберіть категорію --</option>
        {categories.map((cat) => (
          <option key={cat.key} value={cat.key}>
            {cat.name_ua}
          </option>
        ))}
      </select>

      {form.category && (
        <select name="subcategory" value={form.subcategory} onChange={handleChange} required className='add_products_category'>
          <option value="">-- Виберіть підкатегорію --</option>
          {categories
            .find((cat) => cat.key === form.category)
            ?.subcategories?.map((sub) => (
              <option key={sub.key} value={sub.key}>
                {sub.name_ua}
              </option>
            ))}
        </select>
      )}

      <div className='add_products'>
        <button type="submit" disabled={uploading} className='add_button'>
          {uploading ? 'Завантаження...' : 'Додати товар'}
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;
