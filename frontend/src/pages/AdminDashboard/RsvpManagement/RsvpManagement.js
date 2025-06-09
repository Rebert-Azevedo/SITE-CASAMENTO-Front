import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import styles from './RsvpManagement.module.css';

function RsvpManagementPage() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRsvp, setEditingRsvp] = useState(null); // Armazena o RSVP que está sendo editado
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    vai_participar: true,
    quantidade_acompanhantes: 0,
    observacoes: '',
    confirmado_presenca: false // Campo da tabela `convidados`
  });

  useEffect(() => {
    fetchRsvps();
  }, []);

  const fetchRsvps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/rsvp/admin');
      setRsvps(response.data);
    } catch (err) {
      setError('Erro ao carregar RSVPs: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Failed to fetch RSVPs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value)
    }));
  };

  const handleEdit = (rsvp) => {
    setEditingRsvp(rsvp);
    setFormData({
      nome_completo: rsvp.nome_completo || '',
      email: rsvp.email || '',
      telefone: rsvp.telefone || '',
      vai_participar: rsvp.vai_participar,
      quantidade_acompanhantes: rsvp.quantidade_acompanhantes,
      observacoes: rsvp.observacoes || '',
      confirmado_presenca: rsvp.confirmado_presenca // Do convidado
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o formulário
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingRsvp) {
        await api.put(`/rsvp/admin/${editingRsvp.rsvp_id}`, formData);
        alert('RSVP atualizado com sucesso!');
      } else {
        // Esta rota é para o admin criar um RSVP/Convidado diretamente,
        // mas o controlador de RSVP já lida com a criação/atualização.
        // Se você quiser um formulário para "adicionar um novo convidado/RSVP" manualmente,
        // precisaria de uma lógica diferente ou de um endpoint separado no backend,
        // pois o endpoint `/rsvp` é focado no fluxo do convidado.
        // Por simplicidade, este formulário será apenas para edição.
        alert('Funcionalidade de adicionar novo RSVP manual ainda não implementada neste formulário.');
        return;
      }
      setEditingRsvp(null);
      resetForm();
      fetchRsvps();
    } catch (err) {
      setError('Erro ao salvar RSVP: ' + (err.response?.data?.message || 'Erro desconhecido'));
      console.error('Failed to save RSVP:', err);
    }
  };

  const handleDelete = async (rsvp_id) => {
    if (window.confirm('Tem certeza que deseja excluir este RSVP e o convidado associado?')) {
      try {
        await api.delete(`/rsvp/admin/${rsvp_id}`);
        alert('RSVP excluído com sucesso!');
        fetchRsvps();
      } catch (err) {
        setError('Erro ao excluir RSVP: ' + (err.response?.data?.message || 'Erro desconhecido'));
        console.error('Failed to delete RSVP:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome_completo: '', email: '', telefone: '', vai_participar: true,
      quantidade_acompanhantes: 0, observacoes: '', confirmado_presenca: false
    });
    setEditingRsvp(null);
  };

  if (loading) return <div className={styles.loading}>Carregando RSVPs...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.rsvpManagementContainer}>
      <h2>Gerenciar Confirmações de Presença (RSVP)</h2>

      <form onSubmit={handleSubmit} className={styles.rsvpForm}>
        <h3>{editingRsvp ? `Editar RSVP de ${editingRsvp.nome_completo}` : 'Adicionar Novo Convidado/RSVP (apenas edição via formulário)'}</h3>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="nome_completo">Nome Completo:</label>
          <input type="text" id="nome_completo" name="nome_completo" value={formData.nome_completo} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Vai Participar?</label>
          <div>
            <label>
              <input type="radio" name="vai_participar" value={true} checked={formData.vai_participar === true} onChange={handleChange} /> Sim
            </label>
            <label>
              <input type="radio" name="vai_participar" value={false} checked={formData.vai_participar === false} onChange={handleChange} /> Não
            </label>
          </div>
        </div>
        {formData.vai_participar && (
          <div className={styles.formGroup}>
            <label htmlFor="quantidade_acompanhantes">Acompanhantes:</label>
            <input type="number" id="quantidade_acompanhantes" name="quantidade_acompanhantes" value={formData.quantidade_acompanhantes} onChange={handleChange} min="0" />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="observacoes">Observações:</label>
          <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmado_presenca">Confirmado Manualmente?</label>
          <input type="checkbox" id="confirmado_presenca" name="confirmado_presenca" checked={formData.confirmado_presenca} onChange={handleChange} />
        </div>
        <button type="submit" className={styles.submitButton}>
          {editingRsvp ? 'Atualizar RSVP' : 'Adicionar RSVP'}
        </button>
        {editingRsvp && (
          <button type="button" onClick={resetForm} className={styles.cancelEditButton}>
            Cancelar Edição
          </button>
        )}
      </form>

      <hr className={styles.divider} />

      <h3>Lista de RSVPs Recebidos</h3>
      <table className={styles.rsvpTable}>
        <thead>
          <tr>
            <th>Convidado</th>
            <th>E-mail</th>
            <th>Tel.</th>
            <th>Participa?</th>
            <th>Acomp.</th>
            <th>Obs.</th>
            <th>Data Resposta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map(rsvp => (
            <tr key={rsvp.rsvp_id}>
              <td>{rsvp.nome_completo}</td>
              <td>{rsvp.email}</td>
              <td>{rsvp.telefone || '-'}</td>
              <td>{rsvp.vai_participar ? 'Sim' : 'Não'}</td>
              <td>{rsvp.quantidade_acompanhantes}</td>
              <td>{rsvp.observacoes || '-'}</td>
              <td>{new Date(rsvp.data_resposta).toLocaleDateString('pt-BR')}</td>
              <td>
                <button onClick={() => handleEdit(rsvp)} className={styles.actionButtonEdit}>Editar</button>
                <button onClick={() => handleDelete(rsvp.rsvp_id)} className={styles.actionButtonDelete}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RsvpManagementPage;