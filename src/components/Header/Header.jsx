import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__title}>
          <h1>Блог-платформа</h1>
        </Link>
        
        <div className={styles.header__actions}>
          <button className={styles.header__signIn}>SIGN IN</button>
          <button className={styles.header__signUp}>SIGN UP</button>
        </div>
      </div>
    </header>
  );
}

export default Header; 