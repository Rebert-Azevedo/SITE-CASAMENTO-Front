import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import styles from './GuestManagement.module.css';

function GuestManagementPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nome_completo: '',
    telefone: '',
    quantidade_criancas: 0
  });
  const [editingGuestId, setEditingGuestId] = useState(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/guests/admin');
      setGuests(response.data);
    } catch (err) {
      setError('Erro ao carregar convidados: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Failed to fetch guests:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingGuestId) {
        await api.put(`/guests/${editingGuestId}`, formData);
        alert('Convidado atualizado com sucesso!');
      } else {
        await api.post('/guests', formData);
        alert('Convidado adicionado com sucesso!');
      }
      setFormData({ nome_completo: '', telefone: '', quantidade_criancas: 0 });
      setEditingGuestId(null);
      fetchGuests();
    } catch (err) {
      setError('Erro ao salvar convidado: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Failed to save guest:', err.response?.data || err);
    }
  };

  const handleEdit = (guest) => {
    setEditingGuestId(guest.id);
    setFormData({
      nome_completo: guest.nome_completo || '',
      telefone: guest.telefone || '',
      quantidade_criancas: guest.quantidade_criancas || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este convidado?')) {
      try {
        await api.delete(`/guests/${id}`);
        alert('Convidado excluído com sucesso!');
        fetchGuests();
      } catch (err) {
        setError('Erro ao excluir convidado: ' + (err.response?.data?.message || 'Erro desconhecido'));
        console.error('Failed to delete guest:', err.response?.data || err);
      }
    }
  };

  if (loading) return <div className={styles.loading}>Carregando gerenciamento de convidados...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.guestManagementContainer}>
      <h2>Gerenciar convidados</h2>

      <form onSubmit={handleSubmit} className={styles.guestForm}>
        <h3>{editingGuestId ? 'Editar Convidado' : 'Adicionar novo convidado'}</h3>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="nome_completo">Nome completo:</label>
          <input type="text" id="nome_completo" name="nome_completo" value={formData.nome_completo} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantidade_criancas">Quantidade de crianças:</label>
          <input type="number" id="quantidade_criancas" name="quantidade_criancas" value={formData.quantidade_criancas} onChange={handleChange} min="0" />
        </div>
        <button type="submit" className={`${styles.submitButton} darken-primary-gold`}>
          {editingGuestId ? 'Atualizar Convidado' : 'Adicionar Convidado'}
        </button>
        {editingGuestId && (
          <button type="button" onClick={() => { setEditingGuestId(null); setFormData({ nome_completo: '', telefone: '', quantidade_criancas: 0 }); }} className={`${styles.cancelButton} darken-text-medium`}>
            Cancelar Edição
          </button>
        )}
      </form>

      <hr className={styles.divider} />

      <h3>Lista de convidados</h3>
      <div className={styles.tableResponsiveWrapper}> 
        <table className={styles.guestsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome completo</th>
              <th>Telefone</th>
              <th>Crianças</th>
              <th>Data de registro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(guest => (
              <tr key={guest.id}>
                <td>{guest.id}</td>
                <td>{guest.nome_completo}</td>
                <td>{guest.telefone}</td>
                <td>{guest.quantidade_criancas}</td>
                <td>{new Date(guest.data_registro).toLocaleDateString('pt-BR')}</td>
                <td>
                  <button onClick={() => handleEdit(guest)} className={`${styles.actionButtonEdit} darken-secondary-gold`}>Editar</button>
                  <button onClick={() => handleDelete(guest.id)} className={styles.actionButtonDelete}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuestManagementPage;