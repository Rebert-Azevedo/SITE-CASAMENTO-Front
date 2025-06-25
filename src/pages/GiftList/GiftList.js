import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import styles from './GiftList.module.css';
import GiftListItem from '../../components/GiftListItem/GiftListItem';

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

      const categoriesResponse = await api.get('/categories'); 
      setCategories(categoriesResponse.data); 

    } catch (err) {
      setError('Erro ao carregar a lista de presentes ou categorias.');
      console.error('Failed to fetch data:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = (giftId) => {
    setGifts(prevGifts =>
      prevGifts.map(gift =>
        gift.id === giftId ? { ...gift, status: 'reservado' } : gift
      )
    );
  };

  const filteredGifts = selectedCategory === 'all'
    ? gifts
    : gifts.filter(gift => gift.categoria_id === parseInt(selectedCategory));

  if (loading) return <div className={styles.loading}>Carregando lista de presentes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.giftListContainer}>
      <h2>Lista de presentes</h2>
      <p className={styles.subtitle}>Escolha um presente para abençoar o nosso novo lar!</p>

      <div className={styles.categoryFilter}>
        <label htmlFor="category">Filtrar por categoria:</label>
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

      <div className={styles.giftsList}>
        {filteredGifts.length === 0 ? (
          <p className={styles.noGiftsMessage}>Nenhum presente encontrado nesta categoria.</p>
        ) : (
          filteredGifts.map(gift => (
            <GiftListItem key={gift.id} gift={gift} onReserve={handleReserve} />
          ))
        )}
      </div>
    </div>
  );
}

export default GiftListPage;