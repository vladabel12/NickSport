import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import Order from './Order';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';


const ShowOrders = ({ orders, onDelete }) => {
  const summa = orders.reduce((total, el) => total + Number.parseFloat(el.price) * (el.quantity || 1), 0);
  const { t } = useTranslation();


  return (
    <div>
      {orders.map(el => (
        <Order onDelete={onDelete} key={el.id} item={el} />
      ))}
      <p className='summa'> {t('total')}: {summa.toFixed(2)}₴</p>
    </div>
  );
};

const Header = ({ orders, onDelete }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

const { t, i18n } = useTranslation();
const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  setLanguageMenuOpen(false);
};

  return (
    <header>
      <div>
        <span className='logo'>NickSport</span>

        {/* Бургер і хрестик */}
        <div className="header-icons">
          <FaShoppingCart onClick={() => setCartOpen(!cartOpen)} className={`shop-cart-button ${cartOpen ? 'active' : ''}`}/>
          <FaGlobe className="globe-icon" onClick={() => setLanguageMenuOpen(!languageMenuOpen)} />
            {languageMenuOpen && (
              <div className="language-menu">
                <div onClick={() => changeLanguage('ua')}>Українська</div>
                <div onClick={() => changeLanguage('en')}>English</div>
                </div>
              )}

          <FaBars className={`burger-icon ${menuOpen ? 'hide' : ''}`} onClick={() => setMenuOpen(true)}/>
          <FaTimes className={`close-icon ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
        </div>

        {cartOpen && (
          <div className='shop-cart'>
            {orders.length > 0 ? (
              <ShowOrders orders={orders} onDelete={onDelete} />
            ) : (
              <h2 className='empty'>{t('cart_empty')}</h2>
            )}
            <button type="submit" className="buy_button">{t('buy')}</button>
          </div>
        )}

        {/* Меню зправа */}
        <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>{t('home')}</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>{t('about')}</Link></li>
            <li><Link to="/contacts" onClick={() => setMenuOpen(false)}>{t('contacts')}</Link></li>
            <li><Link to="/our_location" onClick={() => setMenuOpen(false)}>{t('location')}</Link></li>
          </ul>
        </div>
      </div>

      {isHome && <div className='presentation home_presentation'>
        <div className="presentation_title">{t('presentation_title')}</div>
        <div className="presentation_desc">{t('presentation_desc')}</div>
      </div>}
    </header>
  );
};

export default Header;
