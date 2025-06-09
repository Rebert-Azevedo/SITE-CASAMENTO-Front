import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Casamento [Seu Nome do Noivo] & [Sua Nome da Noiva]. Todos os direitos reservados.</p>
      <p>Desenvolvido com carinho para o nosso grande dia!</p>
    </footer>
  );
}

export default Footer;