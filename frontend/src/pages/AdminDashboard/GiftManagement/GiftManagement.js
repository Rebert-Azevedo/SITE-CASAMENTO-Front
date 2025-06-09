import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import styles from './GiftManagement.module.css';

function GiftManagementPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor_estimado: '',
    imagem_url: '',
    url_compra: '',
    categoria_id: '',
    status: 'disponível'
  });
  const [editingGiftId, setEditingGiftId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const giftsResponse = await api.get('/gifts/admin');
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
      setError('Erro ao carregar dados: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingGiftId) {
        await api.put(`/gifts/${editingGiftId}`, formData);
        alert('Presente atualizado com sucesso!');
      } else {
        await api.post('/gifts', formData);
        alert('Presente adicionado com sucesso!');
      }
      setFormData({
        nome: '', descricao: '', valor_estimado: '', imagem_url: '', url_compra: '', categoria_id: '', status: 'disponível'
      });
      setEditingGiftId(null);
      fetchData();
    } catch (err) {
      setError('Erro ao salvar presente: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Failed to save gift:', err);
    }
  };

  const handleEdit = (gift) => {
    setEditingGiftId(gift.id);
    setFormData({
      nome: gift.nome,
      descricao: gift.descricao || '',
      valor_estimado: gift.valor_estimado || '',
      imagem_url: gift.imagem_url || '',
      url_compra: gift.url_compra || '',
      categoria_id: gift.categoria_id || '',
      status: gift.status
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este presente?')) {
      try {
        await api.delete(`/gifts/${id}`);
        alert('Presente excluído com sucesso!');
        fetchData();
      } catch (err) {
        setError('Erro ao excluir presente: ' + (err.response?.data?.message || 'Erro desconhecido'));
        console.error('Failed to delete gift:', err);
      }
    }
  };

  if (loading) return <div className={styles.loading}>Carregando gerenciamento de presentes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.giftManagementContainer}>
      <h2>Gerenciar Presentes</h2>

      <form onSubmit={handleSubmit} className={styles.giftForm}>
        <h3>{editingGiftId ? 'Editar Presente' : 'Adicionar Novo Presente'}</h3>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome do Presente:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="valor_estimado">Valor Estimado:</label>
          <input type="number" id="valor_estimado" name="valor_estimado" value={formData.valor_estimado} onChange={handleChange} step="0.01" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imagem_url">URL da Imagem:</label>
          <input type="url" id="imagem_url" name="imagem_url" value={formData.imagem_url} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="url_compra">URL para Compra:</label>
          <input type="url" id="url_compra" name="url_compra" value={formData.url_compra} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="categoria_id">Categoria:</label>
          <select id="categoria_id" name="categoria_id" value={formData.categoria_id} onChange={handleChange}>
            <option value="">Selecione uma categoria</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required>
            <option value="disponível">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="comprado">Comprado</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          {editingGiftId ? 'Atualizar Presente' : 'Adicionar Presente'}
        </button>
        {editingGiftId && (
          <button type="button" onClick={() => { setEditingGiftId(null); setFormData({ nome: '', descricao: '', valor_estimado: '', imagem_url: '', url_compra: '', categoria_id: '', status: 'disponível' }); }} className={styles.cancelEditButton}>
            Cancelar Edição
          </button>
        )}
      </form>

      <hr className={styles.divider} />

      <h3>Lista de Presentes Cadastrados</h3>
      <table className={styles.giftsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Reservado Por</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map(gift => (
            <tr key={gift.id}>
              <td>{gift.id}</td>
              <td>{gift.nome}</td>
              <td>{gift.categoria_nome || 'N/A'}</td>
              <td>R$ {gift.valor_estimado ? gift.valor_estimado.toFixed(2).replace('.', ',') : '0,00'}</td>
              <td>{gift.status}</td>
              <td>{gift.status !== 'disponível' ? (gift.nome_reservou || 'Desconhecido') : '-'}</td>
              <td>
                <button onClick={() => handleEdit(gift)} className={styles.actionButtonEdit}>Editar</button>
                <button onClick={() => handleDelete(gift.id)} className={styles.actionButtonDelete}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GiftManagementPage;