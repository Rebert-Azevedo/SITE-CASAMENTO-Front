import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./AdminLogin.module.css";

function AdminLoginPage() {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { loginWithSecretKey } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!secretKey) {
      setError("A chave secreta é obrigatória.");
      return;
    }

    try {
      const result = await loginWithSecretKey(secretKey);
      setMessage(result.message || "Acesso concedido com sucesso!");
      navigate("/admin/presentes");
    } catch (err) {
      setError(err.message || "Chave secreta inválida. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Acesso de administrador</h2>
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="secretKey">Chave secreta:</label>
          <input
            type="password"
            id="secretKey"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`${styles.submitButton} darken-primary-green`}
        >
          Acessar Painel
        </button>
        <button
          type="button"
          onClick={handleGoBack}
          className={`${styles.backButton} darken-text-medium`}
        >
          Voltar
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
