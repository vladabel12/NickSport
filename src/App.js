import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Contacts from "./components/Contacts";
import OurLocation from "./components/OurLocation";
import { useTranslation } from 'react-i18next';
import CreateAccount from "./components/CreateAccount";
import LogIn from "./components/LogIn";
import ResetPassword from "./components/ResetPassword";
import MyAccount from "./components/MyAccount";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";
import { onAuthStateChanged } from "firebase/auth";   // З firebase/auth
import { auth } from "./firebase";  



function App() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const [currentItems, setCurrentItems] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [items] = useState([
    {
      id: 1,
      img: process.env.PUBLIC_URL + '/img/voleyball.jpg',
      category: 'balls',
      price: '5915',
    },
    {
      id: 2,
      img: process.env.PUBLIC_URL + '/img/goalkeeper_gloves.jpg',
      category: 'gloves',
      price: '1170',
    },
    {
      id: 3,
      img: process.env.PUBLIC_URL + '/img/boxing_gloves.jpg',
      category: 'gloves',
      price: '1692',
    },
    {
      id: 4,
      img: process.env.PUBLIC_URL + '/img/towel_beach.jpg',
      category: 'towels',
      price: '1055',
    },
    {
      id: 5,
      img: process.env.PUBLIC_URL + '/img/kettlebell.jpg',
      category: 'kettlebells',
      price: '1412',
    },
    {
      id: 6,
      img: process.env.PUBLIC_URL + '/img/belt1.jpg',
      category: 'belts',
      price: '1457',
    },
    {
      id: 7,
      img: process.env.PUBLIC_URL + '/img/cleats1.jpg',
      category: 'sneakers',
      price: '1732',
    },
    {
      id: 8,
      img: process.env.PUBLIC_URL + '/img/handball1.jpg',
      category: 'balls',
      price: '537',
    },
    {
      id: 9,
      img: process.env.PUBLIC_URL + '/img/goalkeeper_gloves2.jpg',
      category: 'gloves',
      price: '632',
    },
    {
      id: 10,
      img: process.env.PUBLIC_URL + '/img/sneakers1.jpg',
      category: 'sneakers',
      price: '1352',
    },
    {
      id: 11,
      img: process.env.PUBLIC_URL + '/img/kettlebell2.jpg',
      category: 'kettlebells',
      price: '675',
    },
    {
      id: 12,
      img: process.env.PUBLIC_URL + '/img/sport_towel.jpg',
      category: 'towels',
      price: '142',
    },
    {
      id: 13,
      img: process.env.PUBLIC_URL + '/img/slimming_belt.jpg',
      category: 'belts',
      price: '415',
    },
    {
      id: 14,
      img: process.env.PUBLIC_URL + '/img/football1.jpg',
      category: 'balls',
      price: '4489',
    },
    {
      id: 15,
      img: process.env.PUBLIC_URL + '/img/sneakers2.jpg',
      category: 'sneakers',
      price: '702',
    },
    {
      id: 16,
      img: process.env.PUBLIC_URL + '/img/kimono_belt1.jpg',
      category: 'belts',
      price: '120',
    },
  ]);

  // Слідкуємо за авторизацією користувача
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // При вході користувача - завантажуємо корзину з localStorage
  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user.uid}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } else {
      setOrders([]); // Очистити корзину, якщо нема користувача
    }
  }, [user]);

  // Зберігаємо корзину в localStorage при зміні замовлень, якщо користувач авторизований
  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const onShowItem = (item) => {
    if (fullItem && fullItem.id === item.id) {
      setShowFullItem(false);
      setFullItem(null);
    } else {
      setFullItem(item);
      setShowFullItem(true);
    }
  };

  const chooseCategory = (category) => {
    setCurrentPage(1);
    if (category === 'all') {
      setCurrentItems(items);
      return;
    }
    setCurrentItems(items.filter(el => el.category === category));
  };

  const deleteOrder = (id) => {
    setOrders(prevOrders => prevOrders.filter(item => item.id !== id));
  };

  const addToOrder = (item) => {
    setOrders(prevOrders => {
      const existingItemIndex = prevOrders.findIndex(el => el.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingItemIndex] = {
          ...updatedOrders[existingItemIndex],
          quantity: (updatedOrders[existingItemIndex].quantity || 1) + 1
        };
        return updatedOrders;
      }
      return [...prevOrders, { ...item, quantity: 1 }];
    });
  };

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = currentItems.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
    <Router>
      <div className="wrapper">
        <Header orders={orders} onDelete={deleteOrder} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories chooseCategory={chooseCategory} />
                <Items onShowItem={onShowItem} items={visibleItems} onAdd={addToOrder} />
                <div className="pagination">
                  <button className="pagination_button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    {t('prev')}
                  </button>
                  <span className="pagination_page_of">
                    {t('page')} {currentPage} {t('of')} {totalPages}
                  </span>
                  <button className="pagination_button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    {t('next')}
                  </button>
                </div>
                {showFullItem && fullItem && (
                  <ShowFullItem 
                    item={fullItem} 
                    onAdd={addToOrder} 
                    onShowItem={onShowItem} 
                  />
                )}
              </>
            }
          />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/our_location" element={<OurLocation />} />
          <Route path="/create_account" element={<CreateAccount />} />
          <Route path="/log_in" element={<LogIn />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/my_account" element={<MyAccount />} />
          <Route path="/checkout" element={<Checkout orders={orders} />} />
          <Route path="/thank_you" element={<ThankYou />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
