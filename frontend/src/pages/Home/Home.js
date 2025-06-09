import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import styles from './Home.module.css';

function HomePage() {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = {
          data: {
            nome_noivo: 'Rebert',
            nome_noiva: 'Juliane',
            data_casamento: '2026-05-10',
            mensagem_boas_vindas_site: 'Sejam bem-vindos ao site do nosso Noivado! Estamos muito felizes em compartilhar esse momento com vocês.',
            foto_casal_url: 'https://via.placeholder.com/1200x600?text=Foto+do+Casal+Aqui',
            local_cerimonia: 'Catedral Basílica Primacial de São Salvador',
            local_recepcao: 'Espaço de Eventos Maravilhoso'
          }
        };
        setConfig(response.data);
      } catch (err) {
        setError('Erro ao carregar configurações.');
        console.error('Failed to fetch config:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const weddingDate = new Date(config.data_casamento + 'T00:00:00');
  const now = new Date();
  const timeUntilWedding = weddingDate.getTime() - now.getTime();
  const days = Math.floor(timeUntilWedding / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.homeContainer}>
      <img src={config.foto_casal_url} alt="Foto do Casal" className={styles.couplePhoto} />
      <h1>{config.mensagem_boas_vindas_site}</h1>
      <p className={styles.names}>
        {config.nome_noivo} & {config.nome_noiva}
      </p>
      <p className={styles.date}>
        Nosso grande dia: {new Date(config.data_casamento).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>
      <p className={styles.countdown}>
        Faltam {days > 0 ? days : 0} dias!
      </p>
      <div className={styles.eventInfo}>
        <h3>Cerimônia</h3>
        <p>{config.local_cerimonia}</p>
        <h3>Recepção</h3>
        <p>{config.local_recepcao}</p>
      </div>
    </div>
  );
}

export default HomePage;