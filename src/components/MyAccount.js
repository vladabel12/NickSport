import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "./QuantitySelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function MyAccount({ user, onAdd }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.toLowerCase();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [productsData, setProductsData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setProductsData({});
      setLoading(false);
      return;
    }

    const fetchOrdersAndProducts = async () => {
      setLoading(true);
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const userOrders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(userOrders);

        const productIdsSet = new Set();
        userOrders.forEach(order => {
          order.items?.forEach(item => {
            if (item.id) productIdsSet.add(item.id);
          });
        });
        const productIds = Array.from(productIdsSet);

        if (productIds.length > 0) {
          const chunkSize = 10;
          let allProducts = {};
          for (let i = 0; i < productIds.length; i += chunkSize) {
            const chunk = productIds.slice(i, i + chunkSize);
            const productsQuery = query(
              collection(db, "products"),
              where("__name__", "in", chunk)
            );
            const productsSnapshot = await getDocs(productsQuery);
            productsSnapshot.forEach(doc => {
              allProducts[doc.id] = doc.data();
            });
          }
          setProductsData(allProducts);
        } else {
          setProductsData({});
        }
      } catch (error) {
        console.error("Помилка завантаження замовлень чи товарів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/log_in");
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: parseInt(value)
    }));
  };

  const repeatOrder = (item) => {
    const qty = quantities[item.id] || 1;
    if (onAdd) {
      onAdd(item, qty);
    } else {
      console.warn("Функція додавання до кошика не передана");
    }
  };

  if (loading) return <p>{t('Loading')}</p>;

  return (
    <div className="my_account">
      <div className="my_account_header">
        <h1>{t('MyAccount')}</h1>
        <button onClick={handleLogout} className="logout_button">{t('LogOut')}</button>
      </div>
      <button type="button" className="logout_button go_home">
        <Link to="/" className='go_back_button'>{t('GoBackHome')}</Link>
      </button>
      <h2>{t('History')}</h2>
      {orders.length === 0 ? (
        <p>{t('NoOrders')}</p>
      ) : (
        <div className="order_history">
          {orders.map(order => (
            <div key={order.id} className="order_card">
              <div>
                <strong>{t('Date')}</strong>{" "}
                {order.createdAt
                  ? order.createdAt.toDate().toLocaleString()
                  : t('NoDate')}
              </div>
              <div>
                <strong>{t('InTotal')}</strong> {order.total ?? "–"}₴
              </div>
              <div><strong>{t('Goods')}</strong></div>
              <div className="order_items">
                {order.items?.map(item => {
                  const product = productsData[item.id];
                  return (
                    <div key={item.id} className="order_item">
                      {product?.image && (
                        <img src={product.image} alt={ lang === 'ua' ? product?.name_ua : lang === 'ru' ? product?.name_ru : product?.name_en} className="order_item_img"/>
                      )}
                      <div className="order_item_info">
                        <p>
                          {
                            lang === 'ua' ? product?.name_ua || item.name_ua : lang === 'ru' ? product?.name_ru || item.name_ru : product?.name_en || item.name_en
                          } (код: {item.code}) x{item.quantity}
                        </p>
                        <p>{item.price * item.quantity}₴</p>

                        <div className="repeat_order">
                          <QuantitySelector onChange={(value) => handleQuantityChange(item.id, value)}/>
                          <button onClick={() => repeatOrder(item)} className="repeat_button"> {t('RepeatOrder')}</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



