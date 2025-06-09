import React, { useState } from 'react';
import api from '../../api/api';
import styles from './RSVP.module.css';

function RSVPPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [participar, setParticipar] = useState(true);
  // Alterado: de acompanhantes para criancas
  const [criancas, setCriancas] = useState(0);
  const [observacoes, setObservacoes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
        const response = await api.post('/rsvp', { // Você precisará criar a rota /api/rsvp no backend
            nome_completo: nome,
            email: email,
            vai_participar: participar,
            // Alterado: de quantidade_acompanhantes para quantidade_criancas
            quantidade_criancas: participar ? criancas : 0,
            observacoes: observacoes,
        });

        setMessage(response.data.message || 'Sua presença foi confirmada com sucesso!');
        setNome('');
        setEmail('');
        setParticipar(true);
        // Alterado: de setAcompanhantes para setCriancas
        setCriancas(0);
        setObservacoes('');
    } catch (err) {
      setError('Erro ao confirmar presença: ' + (err.response?.data?.message || 'Erro desconhecido.'));
      console.error('RSVP failed:', err);
    }
  };

  return (
    <div className={styles.rsvpContainer}>
      <h2>Confirme Sua Presença</h2>
      <p>Sua presença é muito importante para nós! Por favor, preencha o formulário abaixo.</p>
      <form onSubmit={handleSubmit} className={styles.rsvpForm}>
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
          <label>Você irá participar?</label>
          <div>
            <label>
              <input
                type="radio"
                value="true"
                checked={participar === true}
                onChange={() => setParticipar(true)}
              /> Sim
            </label>
            <label>
              <input
                type="radio"
                value="false"
                checked={participar === false}
                onChange={() => setParticipar(false)}
              /> Não
            </label>
          </div>
        </div>

        {participar && (
          <div className={styles.formGroup}>
            {/* Alterado: label e input para criancas */}
            <label htmlFor="criancas">Quantas crianças?</label>
            <input
              type="number"
              id="criancas"
              value={criancas}
              onChange={(e) => setCriancas(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="observacoes">Observações (ex: restrições alimentares):</label>
          <textarea
            id="observacoes"
            rows="4"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          ></textarea>
        </div>

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>Confirmar Presença</button>
      </form>
    </div>
  );
}

export default RSVPPage;