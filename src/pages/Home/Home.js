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
            local_evento: (
              <>
                Quando: 17h00
                <br />
                Onde: Rua da Inconfidência - 121, Pirajá
                <br />
                Salão de festas da Igreja Metodista (1° andar)
                
              </>
            ),
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
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

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
          <div className={styles.descriptionSection}>
            <p>
              Com muita alegria e gratidão a Deus, estamos vivendo um novo
              capítulo da nossa história: o sonho da nossa casa nova! E queremos
              dividir esse momento tão especial com pessoas queridas como você,
              que fazem parte da nossa caminhada.
            </p>
            <p>
              Criamos este site com carinho para compartilhar com você um pouco
              dessa nova fase e, especialmente, para facilitar a forma como pode
              nos abençoar. Aqui você encontrará a nossa lista de presentes, com
              itens que nos ajudarão a montar o nosso lar e tornar esse sonho
              ainda mais completo.
            </p>
            <p className={styles.bibleVerseUnified}>
              "Com a sabedoria se constrói o lar e sobre a prudência ele se
              firma."
              <br />
              <strong className={styles.verseReferenceBold}>Pv. 24:3</strong>
            </p>
            <p>
              Sua presença e seu carinho serão para nós motivos de muita
              alegria. Que o Senhor retribua em dobro todo gesto de amor!
            </p>
          </div>
        </div>
      </div>

      <div className={styles.eventInfoSection}>
        <div className={styles.eventInfoCard}>
          <h3>Local e horário</h3>
          <p>{config.local_evento}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
