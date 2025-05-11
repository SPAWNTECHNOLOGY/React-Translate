import locale2 from 'locale2';
import Cookies from 'universal-cookie';
import { i18nConfig } from 'es2015-i18n-tag';
import translations from '../translations/translations.json';

const LOCALE_COOKIE = 'locale';
const DEFAULT_LOCALE = 'en-US';
const cookies = new Cookies();

// Поддерживаемые локали
export const SUPPORTED_LOCALES = {
  'ru-RU': 'Русский',
  'en-US': 'English'
};

// Получение перевода по ключу и модулю
export const t = (module, key) => {
  const locale = currentLocale();
  return translations[locale]?.[module]?.[key] || 
         translations[DEFAULT_LOCALE]?.[module]?.[key] || 
         key; // fallback на ключ, если перевод не найден
};

// Инициализация i18n
export const initialize = () => {
  if (!cookies.get(LOCALE_COOKIE)) {
    const browserLocale = locale2 || DEFAULT_LOCALE;
    const locale = Object.keys(SUPPORTED_LOCALES)
      .find(l => browserLocale.startsWith(l.substring(0, 2))) || DEFAULT_LOCALE;
    setLocaleCookie(locale);
  }

  const locale = cookies.get(LOCALE_COOKIE) || DEFAULT_LOCALE;
  
  // Для es2015-i18n-tag нужно плоское представление переводов
  const flatTranslations = flattenTranslations(translations[locale]);
  
  i18nConfig({
    locales: locale,
    translations: flatTranslations
  });

  document.documentElement.lang = locale.substring(0, 2);
};

// Переключение локали
export const switchLocale = locale => {
  setLocaleCookie(locale);
  window.location.reload(false);
};

// Получение текущей локали
export const currentLocale = () => cookies.get(LOCALE_COOKIE) || DEFAULT_LOCALE;

// Вспомогательные функции
const setLocaleCookie = locale => {
  cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'strict'
  });
};

// Преобразование вложенной структуры в плоскую для i18n-tag
const flattenTranslations = (translations) => {
  const flat = {};
  for (const module in translations) {
    for (const key in translations[module]) {
      flat[key] = translations[module][key];
    }
  }
  return flat;
};