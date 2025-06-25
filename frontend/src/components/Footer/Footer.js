import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Chá de casa nova de Rebert & Juliane. Todos os direitos reservados.</p> <p>Com amor, para a nossa casa nova!</p> </footer>
  );
}

export default Footer;