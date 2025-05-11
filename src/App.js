import React from 'react';
import i18n from 'es2015-i18n-tag';
import { t } from './i18n/i18n';
import LanguageSwitch from './components/LanguageSwitch';
import UserGreeting from './components/UserGreeting';

const App = () => (
  
  <main>
    <LanguageSwitch />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{i18n`Welcome to React`}</h1>
          <h2 className="subtitle">{i18n`A simple demo app.`}</h2>
        </div>
      </div>
    </section>

    <section className="section container">
        <UserGreeting userName="No name" />
      <div className="content">
        <h3>{t('auth', 'Login')}</h3>
        <p>{t('navigation', 'Home')}</p>
      </div>
    </section>
  </main>
);

export default App;