import React from 'react';
import { t } from '../i18n/i18n';

const UserGreeting = ({ userName }) => {
  return (
    <div className="user-greeting">
      <h3>{t('user', 'Welcome back')}, {userName}!</h3>
      <p>{t('user', 'Last login')}: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default UserGreeting;