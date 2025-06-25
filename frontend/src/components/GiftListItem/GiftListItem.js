import React, { useState, useEffect } from 'react';
import styles from './GiftListItem.module.css';
import api from '../../api/api';

function GiftListItem({ gift, onReserve }) {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [formNome, setFormNome] = useState('');
  const [formTelefone, setFormTelefone] = useState('');
  const [formMensagem, setFormMensagem] = useState('');
  const [formLoading, setFormLoading] = useState(false); 
  const [formError, setFormError] = useState(null); 
  const [formSuccess, setFormSuccess] = useState(false);

  const handleOpenForm = () => {
    setShowReservationForm(true);
    setFormNome(''); 
    setFormTelefone('');
    setFormMensagem('');
    setFormError(null);
    setFormSuccess(false);
  };

  const handleCancelReservation = () => {
    setShowReservationForm(false);
    setFormError(null);
    setFormSuccess(false);
  };

  const handleSubmitReservation = async (e) => { 
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!formNome || !formTelefone) {
      setFormError('Por favor, preencha seu nome e telefone.');
      return;
    }

    setFormLoading(true);
    try {
      const response = await api.post(`/gifts/${gift.id}/reserve`, {
        nome_reservou: formNome,
        telefone: formTelefone,
        mensagem: formMensagem,
        email_reservou: 'nao_usado@exemplo.com' 
      });

      setFormSuccess(true);
      setFormError(null); 
      onReserve(gift.id); 

      setTimeout(() => {
        setShowReservationForm(false);
      }, 2000);

    } catch (err) {
      console.error('Erro na reserva:', err.response?.data || err);
      setFormError(err.response?.data?.message || 'Erro ao reservar. Tente novamente.');
      setFormSuccess(false);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className={styles.giftListItem}>
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{gift.nome}</h3>
        {gift.descricao && <p className={styles.itemDescription}>{gift.descricao}</p>}
      </div>

      <div className={styles.itemActions}>
        {gift.status === 'disponível' ? (
          <button onClick={handleOpenForm} className={`${styles.reserveButton} darken-primary-gold`}>
            Reservar
          </button>
        ) : (
          <p className={styles.reservedStatus}>
            {gift.status === 'reservado' ? 'Reservado' : 'Já Adquirido'}
          </p>
        )}
      </div>

      {showReservationForm && (
        <div className={styles.reservationFormContainer}>
          {formLoading && <div className={styles.loadingSpinnerInline}></div>}
          {formError && <p className={styles.errorMessageInline}>{formError}</p>}
          {formSuccess && <p className={styles.successMessageInline}>{formSuccess}</p>}

          {!formLoading && !formSuccess && (
            <form onSubmit={handleSubmitReservation} className={styles.reservationForm}>
              <div className={styles.formGroupInline}>
                <label htmlFor={`nome-${gift.id}`}>Seu nome:</label>
                <input
                  type="text"
                  id={`nome-${gift.id}`}
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                  required
                  disabled={formLoading}
                />
              </div>
              <div className={styles.formGroupInline}>
                <label htmlFor={`telefone-${gift.id}`}>Seu telefone:</label>
                <input
                  type="tel"
                  id={`telefone-${gift.id}`}
                  value={formTelefone}
                  onChange={(e) => setFormTelefone(e.target.value)}
                  required
                  disabled={formLoading}
                />
              </div>
              <div className={styles.formGroupInline}>
                <label htmlFor={`mensagem-${gift.id}`}>Mensagem (opcional):</label>
                <textarea
                  id={`mensagem-${gift.id}`}
                  rows="2"
                  value={formMensagem}
                  onChange={(e) => setFormMensagem(e.target.value)}
                  disabled={formLoading}
                ></textarea>
              </div>
              <div className={styles.formActionsInline}>
                <button type="submit" className={`${styles.confirmButtonInline} darken-primary-gold`} disabled={formLoading}>
                  Confirmar
                </button>
                <button type="button" onClick={handleCancelReservation} className={`${styles.cancelButtonInline} darken-text-medium`} disabled={formLoading}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default GiftListItem;