import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";

function HomePage() {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = {
          data: {
            nome_noivo: "Rebert",
            nome_noiva: "Juliane",
            data_noivado: "2025-09-07",
            mensagem_boas_vindas_site: "Chá de casa nova",
            local_evento: "Salvador - BA",
            link_Maps_evento: "URL_DO_Maps_DO_CHA_DE_CASA_NOVA",
          },
        };
        setConfig(response.data);
      } catch (err) {
        setError("Erro ao carregar configurações.");
        console.error("Failed to fetch config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const eventDate = new Date(config.data_noivado + "T00:00:00");
  const now = new Date();
  const timeUntilEvent = eventDate.getTime() - now.getTime();
  const days = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <div className={styles.overlayText}>
          <h1 className={styles.heroTitle}>
            {config.mensagem_boas_vindas_site}
          </h1>
          <p className={styles.names}>
            <span>{config.nome_noivo}</span> & <span>{config.nome_noiva}</span>
          </p>
          <p className={styles.date}>
            Nosso chá:{" "}
            {new Date(config.data_noivado).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className={styles.countdown}>
            Faltam{" "}
            <span className={styles.countdownNumber}>
              {days > 0 ? days : 0}
            </span>{" "}
            dias!
          </p>
          <div className={styles.verse}>
            <p>"Nós amamos porque ele nos amou primeiro."</p>
            <p>1 João 4:19</p>
          </div>
        </div>
      </div>

      <div className={styles.eventInfoSection}>
        <div className={styles.eventInfoCard}>
          <h3>Onde e quando?</h3>
          <p>{config.local_evento}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
