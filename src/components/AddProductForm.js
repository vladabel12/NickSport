import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'; 
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function AddProductForm({ onClose, existingItem }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(existingItem || {
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

  useEffect(() => {
    if (existingItem) {
      setForm(existingItem);
    }
  }, [existingItem]);

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const API_KEY = 'cb820140e0d4aa4d1339df6dd58891b8';

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
        alert(t('MistakeImgBB'));
        return null;
      }
    } catch (err) {
      setUploading(false);
      console.error(t('Error'), err);
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
          toast.error(t('UnableImageUpload'));
          return;
        }
      }

      if (existingItem) {
        const productRef = doc(db, 'products', existingItem.id);
        await updateDoc(productRef, {
          ...form,
          image: imageUrl,
          price: parseFloat(form.price)
        });
        toast.success(t('ProductUpdated'));
      } else {
        await addDoc(collection(db, 'products'), {
          ...form,
          image: imageUrl,
          price: parseFloat(form.price),
          createdAt: new Date()
        });
        toast.success(t('ProductAdded'));
      }

      if (onClose) onClose();
    } catch (error) {
      toast.error(t('ErrorAdding'));
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input name="name_ua" placeholder={t('TitleUa')} value={form.name_ua} onChange={handleChange} required className='add_product_input' />
      <input name="name_en" placeholder={t('TitleEn')} value={form.name_en} onChange={handleChange} required className='add_product_input' />
      <input name="name_ru" placeholder={t('TitleRu')} value={form.name_ru} onChange={handleChange} className='add_product_input'/>
      <input name="short_desc_ua" placeholder={t('ShortDescUkr')} value={form.short_desc_ua} onChange={handleChange} className='add_product_input' />
      <input name="short_desc_en" placeholder={t('ShortDescEng')} value={form.short_desc_en} onChange={handleChange} className='add_product_input' />
      <input name="short_desc_ru" placeholder={t('ShortDescRus')} value={form.short_desc_ru} onChange={handleChange} className='add_product_input'/>
      <textarea name="full_desc_ua" placeholder={t('FullDescUkr')} value={form.full_desc_ua} onChange={handleChange} className='add_product_input' />
      <textarea name="full_desc_en" placeholder={t('FullDescEng')} value={form.full_desc_en} onChange={handleChange} className='add_product_input' />
      <textarea name="full_desc_ru" placeholder={t('FullDescRus')} value={form.full_desc_ru} onChange={handleChange} className='add_product_input'/>
      <input name="price" placeholder={t('Price')} type="number" value={form.price} onChange={handleChange} required className='add_product_input' />
      <input name="code" placeholder={t('Code')} value={form.code} onChange={handleChange} required className='add_product_input' />

      <div className='add_image'>
        <input name="image" placeholder={t('URLImage')} value={form.image} onChange={handleChange} className='add_product_input url_image' />
        <input type="file" id="upload" accept="image/*" onChange={handleFileChange} className='hidden_button' />
      </div>

      <select name="category" value={form.category} onChange={handleChange} required className='add_products_category'>
        <option value="">{t('ChooseCategory')}</option>
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat[`name_${i18n.language}`] || cat.name_ua}
            </option>
          ))}
      </select>
      {form.category && (
        <select name="subcategory" value={form.subcategory} onChange={handleChange} required className='add_products_category'>
          <option value="">{t('ChooseSubcategory')}</option>
            {categories.find((cat) => cat.key === form.category)?.subcategories?.map((sub) => (
              <option key={sub.key} value={sub.key}>
                {sub[`name_${i18n.language}`] || sub.name_ua}
              </option>
           ))}
        </select>
      )}

      <div className='add_products'>
        <button type="submit" disabled={uploading} className='add_button'>
          {uploading ? t('Loading') : t('AddProductFormTitle')}
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;

