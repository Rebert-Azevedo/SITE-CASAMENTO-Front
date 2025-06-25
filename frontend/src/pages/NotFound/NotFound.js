import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <p>Página Não Encontrada</p>
      <Link to="/" className={`${styles.homeLink} darken-primary-green`}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default NotFoundPage;