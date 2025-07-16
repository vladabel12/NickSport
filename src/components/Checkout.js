import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Checkout({ orders }) {
  const [postType, setPostType] = useState('novaPost');
  const [deliveryType, setDeliveryType] = useState('department');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { t } = useTranslation();

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
              {orders.map((item) => (
                <div key={item.id} className="checkout_item">
                  <img src={item.img} alt={t(`products.${item.id}.title`)} className="checkout_img" />
                  <div className="checkout_product_info">
                    <p>{t(`products.${item.id}.title`)}</p>
                    <b>{item.price}₴ {item.quantity > 1 && `x${item.quantity}`}</b>
                  </div>
                </div>
              ))}
              <h3 className="checkout_total">
                {t('checkoutTotal')}: {orders.reduce((acc, item) => acc + item.price * item.quantity, 0)}₴
              </h3>
              <button className="checkout_button">Place an order</button>
            </div>
          )}
        </div>

        <div className="checkout_right">
          <form className="checkout_form">

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

            {/* Dynamic fields */}
            {deliveryType === 'department' && (
              <div className="form_field">
                <label>
                  {postType === 'novaPost' ? t('postOffice') : t('postAddress')}
                </label>
                <input
                  type="text"
                  name="postDetails"
                  required
                  placeholder={postType === 'novaPost' ? t('enterBranch') : t('enterAddress')}
                />
              </div>
            )}

            {deliveryType === 'parcelLocker' && (
              <div className="form_field">
                <label>{t('parcelLocker')}</label>
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
                  <label>{t('street')}</label>
                  <input type="text" name="street" required placeholder={t('enterStreet')} />
                </div>
                <div className="form_field">
                  <label>{t('houseNumber')}</label>
                  <input type="text" name="houseNumber" required placeholder={t('enterHouse')} />
                </div>
                <div className="form_field">
                  <label>{t('apartment')}</label>
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
                />
                <span className="radio-circle radio-green"></span> {t('cashOnDelivery')}
              </label>
            </div>

            {paymentMethod === 'card' && (
              <p className="payment_notice">{t('cardPaymentNotice')}</p>
            )}
            <div className='form_full-width'>
              <label>{t('message')}</label>
              <textarea placeholder={t('writeMessage')} rows="3"></textarea>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}


