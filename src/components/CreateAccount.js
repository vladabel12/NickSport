import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CreateAccount() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) navigate('/');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/');
    } catch (error) {
      console.error('Помилка входу через Google:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/');
    } catch (error) {
      console.error('Помилка створення акаунту:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="create_account">
      <div className="create_left">
        <h1 className="create_welcome">
          {t('welcome')} <br />
          {t('startShopping')}
        </h1>
      </div>

      <div className="create_right">
        <form className="create_form" onSubmit={handleSubmit}>
          <h1 className='create_title'>{t('createAccount')}</h1>

          <div className='form_group'>
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form_group password_group'>
            <label htmlFor="password">{t('password')}</label>
            <div className="password_wrapper">
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <span className="password_toggle" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit">{t('createAccount')}</button>
          <button type="button" onClick={handleGoogleLogin} className="google_button">
            {t('continueWithGoogle')}
          </button>

          <p>{t('alreadyHaveAccount')} <Link to="/log_in">{t('LogIn')}</Link></p>
        </form>
      </div>
    </div>
  );
}
