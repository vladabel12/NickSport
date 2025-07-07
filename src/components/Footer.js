import React from 'react'
import { useTranslation } from 'react-i18next';

export default function () {
  const { t } = useTranslation();
  return (
    <footer>
      <p>{t('footer')} &copy;</p>
    </footer>
  )
}
