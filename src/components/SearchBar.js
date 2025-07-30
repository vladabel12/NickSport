import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const delay = setTimeout(() => {
        onSearch(term.trim().toLowerCase());
    }, 400);

    return () => clearTimeout(delay);
  }, [term, onSearch]);

  return (
    <div className='search-bar_wrapper'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#ABB7C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M21 21L16.7 16.7" stroke="#ABB7C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        <input className="search-bar" type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder={t('searchPlaceholder')}/>
    </div>
  );
}

export default SearchBar;
