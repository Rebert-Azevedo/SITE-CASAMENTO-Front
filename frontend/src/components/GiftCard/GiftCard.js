import React, { useState } from 'react';
import styles from './GiftCard.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function GiftCard({ gift, onReserve }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmReservation = (nome, email, mensagem) => {
    onReserve(gift.id, { nome_reservou: nome, email_reservou: email, mensagem });
  };

  return (
    <div className={styles.giftCard}>
      <img src={gift.imagem_url || 'https://via.placeholder.com/300x200?text=Presente'} alt={gift.nome} className={styles.giftImage} />
      <h3 className={styles.giftName}>{gift.nome}</h3>
      {gift.descricao && <p className={styles.giftDescription}>{gift.descricao}</p>}
      {gift.valor_estimado && (
        <p className={styles.giftValue}>Valor Estimado: R$ {gift.valor_estimado.toFixed(2).replace('.', ',')}</p>
      )}
      {gift.url_compra && (
        <a href={gift.url_compra} target="_blank" rel="noopener noreferrer" className={styles.buyLink}>
          Onde Comprar
        </a>
      )}

      {gift.status === 'disponível' ? (
        <button onClick={handleOpenModal} className={styles.reserveButton}>Reservar</button>
      ) : (
        <p className={styles.reservedStatus}>
          {gift.status === 'reservado' ? 'Reservado' : 'Já Comprado'}
        </p>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmReservation}
        giftName={gift.nome}
      />
    </div>
  );
}

export default GiftCard;