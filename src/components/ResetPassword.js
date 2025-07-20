import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setMessage('');
    setError('');
    if (!email) {
      setError(t('EnterEmail'));
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(t('PasswordReset'));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reset_container">
        <div className='create_account'>
            <div className="create_left">
                <h1 className="create_welcome">
                    {t('ForgotPassword')} <br />
                    {t('DontWorry')}
                </h1>
            </div>
            <div className="create_right">
                <form className="create_form">
                    <h2 className='create_title'>{t('resetPassword')}</h2>
                    <div className='form_group'>
                      <input type="email" placeholder={t('EnterEmail')} value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <button onClick={handleReset}>{t('SendResetEmail')}</button>
                    <button type="button" className="google_button"><Link to="/log_in" className='go_back_button'>{t('GoBack')}</Link></button>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>

    </div>
  );
}
