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
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";  
import AddProductForm from "./components/AddProductForm";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import CatalogPage from "./components/CatalogPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const itemsPerPage = 8;

  const { t } = useTranslation();

  const deleteProduct = async (id) => {
    if (!window.confirm("Видалити цей товар?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      alert("✅ Товар видалено!");
    } catch (err) {
      alert("❌ Помилка видалення");
      console.error(err);
    }
  };

  // Автоматичне оновлення товарів з Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Products from Firestore:", products); // для діагностики
      setItems(products);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user.uid}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } else {
      setOrders([]);
    }
  }, [user]);

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

  const chooseCategory = (category, subcategory = null) => {
  setCurrentPage(1);
  if (category === 'all') {
    setCurrentItems(items);
    return;
  }
  if (subcategory) {
    setCurrentItems(items.filter(el => el.category === category && el.subcategory === subcategory));
  } else {
    setCurrentItems(items.filter(el => el.category === category));
  }
};

  const deleteOrder = (id) => {
    setOrders(prevOrders => prevOrders.filter(item => item.id !== id));
  };

  const addToOrder = (item, qty = 1) => {
  const existingItemIndex = orders.findIndex(orderItem => orderItem.id === item.id);
  const fullItem = items.find(el => el.id === item.id);

  if (existingItemIndex !== -1) {
    const updatedOrders = [...orders];
    updatedOrders[existingItemIndex].quantity += qty; // додаємо кількість
    setOrders(updatedOrders);
  } else {
    setOrders([...orders, { ...fullItem, quantity: qty }]); // додаємо з qty
  }
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
                <div className="main_buttons">
                  {user?.email === "skhool2205@gmail.com" && (
                    <button className="categories-button add_product_button" onClick={() => setShowAddForm(prev => !prev)} >
                      {showAddForm ? "Закрити форму" : "Додати товар"}
                    </button>
                  )}
                  <Categories chooseCategory={chooseCategory} />
                </div>
                {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}

                <Items
                  onShowItem={onShowItem}
                  items={visibleItems}
                  onAdd={addToOrder}
                  onDelete={deleteProduct}
                  isAdmin={user?.email === "skhool2205@gmail.com"}
                />

                <div className="pagination">
                  <button
                    className="pagination_button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {t('prev')}
                  </button>
                  <span className="pagination_page_of">
                    {t('page')} {currentPage} {t('of')} {totalPages}
                  </span>
                  <button
                    className="pagination_button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
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
          <Route path="/checkout" element={<Checkout orders={orders} setOrders={setOrders} />} />
          <Route path="/thank_you" element={<ThankYou />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>

        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;