import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;