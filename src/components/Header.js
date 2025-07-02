import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import Order from './Order';
import { Link, useLocation } from 'react-router-dom';

const ShowOrders = ({ orders, onDelete }) => {
  const summa = orders.reduce((total, el) => total + Number.parseFloat(el.price) * (el.quantity || 1), 0);

  return (
    <div>
      {orders.map(el => (
        <Order onDelete={onDelete} key={el.id} item={el} />
      ))}
      <p className='summa'>Total: {summa.toFixed(2)}₴</p>
    </div>
  );
};

const Header = ({ orders, onDelete }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header>
      <div>
        <span className='logo'>NickSport</span>

        {/* Бургер і хрестик */}
        <div className="header-icons">
          <FaShoppingCart onClick={() => setCartOpen(!cartOpen)} className={`shop-cart-button ${cartOpen ? 'active' : ''}`}/>
          <FaBars className={`burger-icon ${menuOpen ? 'hide' : ''}`} onClick={() => setMenuOpen(true)}/>
          <FaTimes className={`close-icon ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
        </div>

        {cartOpen && (
          <div className='shop-cart'>
            {orders.length > 0 ? (
              <ShowOrders orders={orders} onDelete={onDelete} />
            ) : (
              <h2 className='empty'>Cart is empty</h2>
            )}
            <button type="submit" className="buy_button">Buy</button>
          </div>
        )}

        {/* Меню зправа */}
        <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About us</Link></li>
            <li><Link to="/contacts" onClick={() => setMenuOpen(false)}>Contacts</Link></li>
            <li><Link to="/our_location" onClick={() => setMenuOpen(false)}>Our Location</Link></li>
          </ul>
        </div>
      </div>

      {isHome && <div className='presentation home_presentation'></div>}
    </header>
  );
};

export default Header;
