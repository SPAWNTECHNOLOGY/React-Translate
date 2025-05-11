import React from 'react';
import { SUPPORTED_LOCALES, switchLocale, currentLocale, t } from '../i18n/i18n';

const LanguageSwitch = () => {
  return (
    <div className="language-switch">
      <label htmlFor="language-select">
        {t('common', 'Language')}:
      </label>
      <select
        id="language-select"
        onChange={e => switchLocale(e.target.value)}
        value={currentLocale()}
      >
        {Object.entries(SUPPORTED_LOCALES).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;