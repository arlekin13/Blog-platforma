import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/api';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const fetchUserData = async () => {
        try {
          const userData = await getCurrentUser();
          setUser(userData.user);
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        }
      };
      fetchUserData();
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__title}>
          <h1>Блог-платформа</h1>
        </Link>

        <div className={styles.header__actions}>
          {isLoggedIn ? (
            <>
              <Link to="/new-article">
                <button className={styles.header__createArticle}>Create article</button>
              </Link>

              <div className={styles.header__profile} onClick={() => navigate('/profile')}>
                {user?.username}
                <img src={user?.image} alt="Ава" className={styles.header__avatar} />
              </div>

              <button onClick={logout} className={styles.header__logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.header__signIn}>
                <button className={styles.header__signIn}>SIGN IN </button>
              </Link>
              <Link to="/register">
                <button className={styles.header__signUp}>SIGN UP</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
