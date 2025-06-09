import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import GiftCard from '../../components/GiftCard/GiftCard';
import styles from './GiftList.module.css';

function GiftListPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const giftsResponse = await api.get('/gifts');
      setGifts(giftsResponse.data);

      const categoriesResponse = {
        data: [
          { id: 1, nome: 'Cozinha' },
          { id: 2, nome: 'Quarto' },
          { id: 3, nome: 'Sala' },
          { id: 4, nome: 'Eletrodomésticos' },
          { id: 5, nome: 'Decoração' },
        ]
      };
      setCategories(categoriesResponse.data);

    } catch (err) {
      setError('Erro ao carregar a lista de presentes ou categorias.');
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (giftId, reservationData) => {
    try {
      await api.post(`/gifts/${giftId}/reserve`, reservationData);
      alert('Presente reservado com sucesso! Muito obrigado!');
      setGifts(prevGifts =>
        prevGifts.map(gift =>
          gift.id === giftId ? { ...gift, status: 'reservado' } : gift
        )
      );
    } catch (err) {
      alert('Erro ao reservar presente: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Reservation failed:', err);
    }
  };

  const filteredGifts = selectedCategory === 'all'
    ? gifts
    : gifts.filter(gift => gift.categoria_id === parseInt(selectedCategory));

  if (loading) return <div className={styles.loading}>Carregando lista de presentes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.giftListContainer}>
      <h2>Nossa Lista de Presentes</h2>
      <p>Escolha um presente para nos ajudar a montar o nosso novo lar!</p>

      <div className={styles.categoryFilter}>
        <label htmlFor="category">Filtrar por Categoria:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Todas</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
      </div>

      <div className={styles.giftsGrid}>
        {filteredGifts.length === 0 ? (
          <p>Nenhum presente encontrado nesta categoria.</p>
        ) : (
          filteredGifts.map(gift => (
            <GiftCard key={gift.id} gift={gift} onReserve={handleReserve} />
          ))
        )}
      </div>
    </div>
  );
}

export default GiftListPage;