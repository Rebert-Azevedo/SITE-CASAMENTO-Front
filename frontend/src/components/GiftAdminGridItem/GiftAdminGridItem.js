import React from 'react';
import styles from './GiftAdminGridItem.module.css';

function GiftAdminGridItem({ gift, handleEdit, handleDelete }) {
  return (
    <div className={styles.giftAdminCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardId}>ID: {gift.id}</span>
        <h4 className={styles.cardName}>{gift.nome}</h4>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardDescription}>{gift.descricao || 'Sem descrição.'}</p>
        <p className={styles.cardCategory}>Categoria: {gift.categoria_nome || 'N/A'}</p>
        <p className={styles.cardStatus}>Status: <span className={styles[`status_${gift.status}`]}>{gift.status}</span></p>
        {gift.status !== 'disponível' && gift.nome_reservou && (
          <p className={styles.cardReservedBy}>Reservado por: {gift.nome_reservou} ({gift.telefone_reservou || gift.email_reservou || 'N/A'})</p>
        )}
        {gift.status !== 'disponível' && gift.data_reserva && (
          <p className={styles.cardReservationDate}>Data Reserva: {new Date(gift.data_reserva).toLocaleDateString('pt-BR')}</p>
        )}
        {gift.status !== 'disponível' && gift.mensagem && (
          <p className={styles.cardReservationMessage}>Mensagem: {gift.mensagem}</p>
        )}
      </div>
      <div className={styles.cardActions}>
        <button onClick={() => handleEdit(gift)} className={`${styles.actionButtonEdit} darken-secondary-gold`}>Editar</button>
        <button onClick={() => handleDelete(gift.id)} className={styles.actionButtonDelete}>Excluir</button>
      </div>
    </div>
  );
}

export default GiftAdminGridItem;