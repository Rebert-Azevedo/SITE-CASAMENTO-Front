import React, { useState } from 'react';
import styles from './ConfirmationModal.module.css';

function ConfirmationModal({ isOpen, onClose, onConfirm, giftName }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !email) {
      alert('Por favor, preencha seu nome e e-mail.');
      return;
    }
    onConfirm(nome, email, mensagem);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Reservar Presente: {giftName}</h2>
        <p>Por favor, preencha seus dados para confirmar a reserva.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Seu Nome Completo:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Seu E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mensagem">Mensagem para os noivos (opcional):</label>
            <textarea
              id="mensagem"
              rows="3"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.confirmButton}>Confirmar Reserva</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmationModal;