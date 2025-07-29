import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signOut } from 'firebase/auth';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaGlobe } from 'react-icons/fa';
import Order from './Order';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const handleCheckout = () => {
    setCartOpen(false);      // Закриває корзину
    navigate('/checkout');   // Переходить на сторінку оформлення
  };

  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = orders.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Global click handler to close menus
  useEffect(() => {
    function handleClickOutside(event) {
      // Basket
      if (cartOpen && !event.target.closest('.shop-cart') && !event.target.closest('.cart-icon-wrapper')) {
        setCartOpen(false);
      }
      // Language menu
      if (languageMenuOpen && !event.target.closest('.language-menu') && !event.target.closest('.globe-icon')) {
        setLanguageMenuOpen(false);
      }
      // Burger menu
      if (menuOpen && !event.target.closest('.side-menu') && !event.target.closest('.burger-icon')) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cartOpen, languageMenuOpen, menuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setLanguageMenuOpen(false);
  };
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header>
      <div className="header_top">
        <span className='logo'>NickSport</span>
        {/* Бургер і хрестик */}
        <div className="header-icons">
          <div className="cart-icon-wrapper" onClick={() => setCartOpen(!cartOpen)}>
            <FaShoppingCart className={`shop-cart-button ${cartOpen ? 'active' : ''}`} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          <FaGlobe className="globe-icon" onClick={() => setLanguageMenuOpen(!languageMenuOpen)} />

          {languageMenuOpen && (
            <div className="language-menu">
              <div onClick={() => changeLanguage('ua')}>Українська</div>
              <div onClick={() => changeLanguage('en')}>English</div>
              <div onClick={() => changeLanguage('ru')}>Русский</div>
            </div>
          )}
          {user ? (
            <div className="user_avatar_wrapper" style={{ position: 'relative', cursor: 'pointer' }}>
              {user.photoURL ? (
                <img className='google_avatar' src={user.photoURL} alt={user.displayName || 'User'} title={user.email} onClick={() => navigate('/my_account')}/>) : (
                <div className='email_avatar' title={user.email} onClick={() => navigate('/my_account')}>
                  {user.email[0].toUpperCase()}
                </div>
              )}
            </div>
          ) : (
            <Link to="/create_account"><FaUser className="user_icon" /></Link>
          )}

          <FaBars className={`burger-icon ${menuOpen ? 'hide' : ''}`} onClick={() => setMenuOpen(true)}/>
          <FaTimes className={`close-icon ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
        </div>

        {cartOpen && (
          <div className='shop-cart'>
            {orders.length > 0 ? (
              <>
                <ShowOrders orders={orders} onDelete={onDelete} />
                <button type="button" className="buy_button" onClick={handleCheckout}>{t('buy')}</button>
              </>
            ) : (
              <h2 className='empty'>{t('cart_empty')}</h2>
            )}
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