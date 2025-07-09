import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function MyAccount() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/log_in');  // Після виходу перенаправляємо на сторінку входу
    } catch (error) {
      console.error('Помилка виходу:', error);
    }
  };

  return (
    <div className="my_account">
      <h1>Мій акаунт</h1>
      {/* Інша інформація про користувача тут */}

      <button onClick={handleLogout} style={{
        backgroundColor: '#dc3d3d',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        Вийти з акаунту
      </button>
    </div>
  );
}
