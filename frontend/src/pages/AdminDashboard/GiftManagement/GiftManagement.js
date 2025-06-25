import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import styles from "./GiftManagement.module.css";
import GiftAdminGridItem from "../../../components/GiftAdminGridItem/GiftAdminGridItem";

function GiftManagementPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria_id: "",
    status: "disponível",
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
      const giftsResponse = await api.get("/gifts/admin");
      setGifts(giftsResponse.data);

      const categoriesResponse = await api.get("/categories");
      setCategories(categoriesResponse.data);
    } catch (err) {
      setError(
        "Erro ao carregar dados: " +
          (err.response?.data?.message || "Erro desconhecido")
      );
      console.error("Failed to fetch data:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingGiftId) {
        await api.put(`/gifts/${editingGiftId}`, {
          categoria_id: formData.categoria_id,
          nome: formData.nome,
          descricao: formData.descricao,
          status: formData.status,
        });
        alert("Presente atualizado com sucesso!");
      } else {
        await api.post("/gifts", {
          categoria_id: formData.categoria_id,
          nome: formData.nome,
          descricao: formData.descricao,
        });
        alert("Presente adicionado com sucesso!");
      }
      setFormData({
        nome: "",
        descricao: "",
        categoria_id: "",
        status: "disponível",
      });
      setEditingGiftId(null);
      fetchData();
    } catch (err) {
      setError(
        "Erro ao salvar presente: " +
          (err.response?.data?.message || "Erro desconhecido")
      );
      console.error("Failed to save gift:", err.response?.data || err);
    }
  };

  const handleEdit = (gift) => {
    setEditingGiftId(gift.id);
    setFormData({
      nome: gift.nome,
      descricao: gift.descricao || "",
      categoria_id: gift.categoria_id || "",
      status: gift.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este presente?")) {
      try {
        await api.delete(`/gifts/${id}`);
        alert("Presente excluído com sucesso!");
        fetchData();
      } catch (err) {
        setError(
          "Erro ao excluir presente: " +
            (err.response?.data?.message || "Erro desconhecido")
        );
        console.error("Failed to delete gift:", err.response?.data || err);
      }
    }
  };

  if (loading)
    return (
      <div className={styles.loading}>
        Carregando gerenciamento de presentes...
      </div>
    );
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.giftManagementContainer}>
      <h2>Gerenciar presentes</h2>

      <form onSubmit={handleSubmit} className={styles.giftForm}>
        <h3>{editingGiftId ? "Editar Presente" : "Adicionar novo presente"}</h3>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome do presente:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="categoria_id">Categoria:</label>
          <select
            id="categoria_id"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>
        {editingGiftId && (
          <div className={styles.formGroup}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="disponível">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="comprado">Comprado</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className={`${styles.submitButton} darken-primary-gold`}
        >
          {editingGiftId ? "Atualizar Presente" : "Adicionar Presente"}
        </button>
        {editingGiftId && (
          <button
            type="button"
            onClick={() => {
              setEditingGiftId(null);
              setFormData({
                nome: "",
                descricao: "",
                categoria_id: "",
                status: "disponível",
              });
            }}
            className={`${styles.cancelButton} darken-text-medium`}
          >
            Cancelar edição
          </button>
        )}
      </form>

      <hr className={styles.divider} />

      <h3>Lista de presentes</h3>
      <div className={styles.giftsGridAdmin}>
        {gifts.length === 0 ? (
          <p className={styles.noGiftsMessage}>Nenhum presente cadastrado.</p>
        ) : (
          gifts.map((gift) => (
            <GiftAdminGridItem
              key={gift.id}
              gift={gift}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GiftManagementPage;
