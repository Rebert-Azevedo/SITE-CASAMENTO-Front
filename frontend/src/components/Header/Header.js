import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (location.pathname === '/admin/login') {
    return null;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link to="/" className={styles.navLink}>Início</Link></li>
          <li><Link to="/lista-presentes" className={styles.navLink}>Lista de Presentes</Link></li>
          {user && user.isAuthenticated ? (
            <>
              <li><Link to="/admin/presentes" className={styles.navLink}>Admin</Link></li>
              <li><button onClick={logout} className={`${styles.logoutButton} darken-primary-gold`}>Sair</button></li>
            </>
          ) : (
            <li><Link to="/admin/login" className={styles.navLink}>Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;