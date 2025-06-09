import React from 'react';
import styles from './GuestManagement.module.css';

function GuestManagementPage() {
  return (
    <div className={styles.guestManagementContainer}>
      <h2>Gerenciar Convidados</h2>
      <p>Esta é a área para adicionar, editar e remover convidados, e visualizar seus RSVPs.</p>
    </div>
  );
}

export default GuestManagementPage;