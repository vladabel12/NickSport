import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LogIn() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
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
      setError('Не вдалося увійти через Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError(t('NoUser'));
      } else if (error.code === 'auth/wrong-password') {
        setError(t('IncorrectPassword'));
      } else if (error.code === 'auth/invalid-email') {
        setError(t('InvalidEmail'));
      } else {
        setError(t('LoginError'));
      }
    }
  };

  return (
    <div className="create_account">
      <div className="create_left">
          <h1 className="create_welcome">
              {t('hello')} <br />
              {t('weAreHappyToSeeYouAgain')}
          </h1>
      </div>
      <div className="create_right">
        <form className="create_form" onSubmit={handleSubmit}>
          <h1 className='create_title'>{t('logInToAccount')}</h1>

          {error && <p className='error'>{error}</p>}

          <div className='form_group'>
            <label htmlFor="email">{t('email')}</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className='form_group password_group'>
              <div className="label_row">
                  <label htmlFor="password">{t('password')}</label>
                  <button type="button" className="forgot_button" onClick={() => navigate('/reset_password')}>{t('forgot')}</button>
              </div>
              <div className="password_wrapper">
                  <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <span className="password_toggle" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
              </div>
          </div>

          <button type="submit">{t('LogInNow')}</button>
          <button type="button" onClick={handleGoogleLogin} className="google_button">
            {t('continueWithGoogle')}
          </button>

          <p>{t('DontHaveAccount')} <Link to="/create_account">{t('SignIn')}</Link></p>
        </form>
      </div>
    </div>
  );
}
