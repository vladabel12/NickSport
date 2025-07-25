import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ orders, setOrders }) {
  const navigate = useNavigate();
  const [postType, setPostType] = useState('novaPost');
  const [deliveryType, setDeliveryType] = useState('department');
  const [paymentMethod, setPaymentMethod] = useState('');
  const formRef = useRef();
  const { t, i18n } = useTranslation();

  const deliveryTypeMap = {
    department: 'ToTheDepartment',
    parcelLocker: 'ToTheParcelLocker',
    courier: 'ByCourier',
  };

  const paymentMethodMap = {
    card: 'payByCard',
    cod: 'cashOnDelivery',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderSummary = orders.map((item) => {
      const title = i18n.language === 'ua' ? item.name_ua : item.name_en;
      return `${title} (код: ${item.code}) x${item.quantity} — ${item.price * item.quantity}₴`;
    }).join('\n');

    const form = e.target;
    const postDetails = form.postDetails?.value || '';
    const parcelLocker = form.parcelLocker?.value || '';
    const street = form.street?.value || '';
    const houseNumber = form.houseNumber?.value || '';
    const apartment = form.apartment?.value || '';

    const fullAddress = `${postDetails}${parcelLocker}${street ? ` ${street} ${houseNumber}` : ''}${apartment ? `, кв. ${apartment}` : ''}`;

    const templateParams = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      postType: t(postType),
      deliveryType: t(deliveryTypeMap[deliveryType]),
      settlement: form.settlement.value,
      postDetails: fullAddress,
      paymentMethod: t(paymentMethodMap[paymentMethod]),
      message: form.message.value,
      orderSummary,
    };

    emailjs
      .send('service_1ax19m7', 'template_ezm0bnt', templateParams, 'U90TWkvO-_dTTghDJ')
      .then(() => {
        form.reset();
        setOrders([]);
        navigate('/thank_you');
      })
      .catch((error) => {
        alert(t('orderError'));
        console.error('EmailJS error:', error);
      });
  };

  return (
    <div className="checkout_container">
      <h1 className="checkout_title">{t('YourOrder')}</h1>
      <div className="checkout_main">
        {/* LEFT SIDE */}
        <div className="checkout_left">
          {orders.length === 0 ? (
            <p>{t('cart_empty')}</p>
          ) : (
            <div className="checkout_items">
              {orders.map((item) => {
                const title = i18n.language === 'ua' ? item.name_ua : item.name_en;
                return (
                  <div key={item.id} className="checkout_item">
                    <img src={item.image} alt={title} className="checkout_img" />
                    <div className="checkout_product_info">
                      <p>{title}</p>
                      <b>{item.price * item.quantity}₴ {item.quantity > 1 && `(x${item.quantity})`}</b>
                    </div>
                  </div>
                );
              })}
              <h3 className="checkout_total">
                {t('total')}: {orders.reduce((acc, item) => acc + item.price * item.quantity, 0)}₴
              </h3>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout_right">
          <form className="checkout_form" ref={formRef} onSubmit={handleSubmit}>
            <h3 className="checkout_form_title">1. {t('contactDetails')}</h3>
            <p className="checkout_form_desc">{t('orderRecipient')}</p>

            <div className="form_field">
              <label>{t('firstName')}</label>
              <input type="text" name="firstName" required />
            </div>
            <div className="form_field">
              <label>{t('lastName')}</label>
              <input type="text" name="lastName" required />
            </div>
            <div className="form_field">
              <label>{t('phoneNumber')}</label>
              <input type="tel" name="phone" required />
            </div>

            <h3 className="checkout_form_title">2. {t('delivery')}</h3>
            <div className='checkout_row'>
              <label className="custom-radio">
                <input type="radio" name="post" value="novaPost" checked={postType === 'novaPost'} onChange={() => setPostType('novaPost')} />
                <span className="radio-circle radio-green"></span> {t('novaPost')}
              </label>
              <label className="custom-radio">
                <input type="radio" name="post" value="ukrPost" checked={postType === 'ukrPost'} onChange={() => setPostType('ukrPost')} />
                <span className="radio-circle radio-green"></span> {t('ukrPost')}
              </label>
            </div>

            <div className='checkout_row lower'>
              <label className="custom-radio">
                <input type="radio" name="delivery" value="department" checked={deliveryType === 'department'} onChange={() => setDeliveryType('department')} />
                <span className="radio-circle radio-red"></span> {t('ToTheDepartment')}
              </label>
              <label className="custom-radio">
                <input type="radio" name="delivery" value="parcelLocker" checked={deliveryType === 'parcelLocker'} onChange={() => setDeliveryType('parcelLocker')} />
                <span className="radio-circle radio-red"></span> {t('ToTheParcelLocker')}
              </label>
              <label className="custom-radio">
                <input type="radio" name="delivery" value="courier" checked={deliveryType === 'courier'} onChange={() => setDeliveryType('courier')} />
                <span className="radio-circle radio-red"></span> {t('ByCourier')}
              </label>
            </div>

            <div className="form_field settlement">
              <label>{t('settlement')}</label>
              <input type="text" name="settlement" required />
            </div>

            {deliveryType === 'department' && (
              <div className="form_field">
                <label className='checkout_label'>{postType === 'novaPost' ? t('postOffice') : t('postAddress')}</label>
                <input
                  type="text"
                  name="postDetails"
                  placeholder={postType === 'novaPost' ? t('enterBranch') : t('enterAddress')}
                  required
                />
              </div>
            )}

            {deliveryType === 'parcelLocker' && (
              <div className="form_field">
                <label className='checkout_label'>{t('parcelLocker')}</label>
                <input
                  type="text"
                  name="parcelLocker"
                  required
                  placeholder={t('enterParcelLocker')}
                />
              </div>
            )}

            {deliveryType === 'courier' && (
              <>
                <div className="form_field">
                  <label className='checkout_label'>{t('street')}</label>
                  <input type="text" name="street" required placeholder={t('enterStreet')} />
                </div>
                <div className="form_field">
                  <label className='checkout_label'>{t('houseNumber')}</label>
                  <input type="text" name="houseNumber" required placeholder={t('enterHouse')} />
                </div>
                <div className="form_field">
                  <label className='checkout_label'>{t('apartment')}</label>
                  <input type="text" name="apartment" placeholder={t('enterApartment')} />
                </div>
              </>
            )}

            <h3 className="checkout_form_title">3. {t('payment')}</h3>
            <div className="checkout_row">
              <label className="custom-radio">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  required
                />
                <span className="radio-circle radio-green"></span> {t('payByCard')}
              </label>
              <label className="custom-radio">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  required
                />
                <span className="radio-circle radio-green"></span> {t('cashOnDelivery')}
              </label>
            </div>

            {paymentMethod === 'card' && (
              <p className="payment_notice">{t('cardPaymentNotice')}</p>
            )}

            <div className="form_full-width">
              <label className='checkout_label'>{t('message')}</label>
              <textarea name="message" placeholder={t('writeMessage')} rows="3" />
            </div>

            <button type="submit" className="checkout_button">{t('PlaceOrder')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
