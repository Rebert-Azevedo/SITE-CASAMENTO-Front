import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminDashboard.module.css';

function AdminDashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // O linter pode reclamar de handleLogout se ele não for explicitamente chamado no JSX.
  // Ele *é* usado no botão "Sair". Certifique-se de que o botão está lá e com onClick={handleLogout}.
  const handleLogout = () => { // Esta linha é o início da declaração da função.
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <h3>Painel Admin</h3>
        <nav>
          <ul>
            <li><Link to="/admin/presentes" className={styles.sidebarLink}>Gerenciar Presentes</Link></li>
            <li><Link to="/admin/convidados" className={styles.sidebarLink}>Gerenciar Convidados</Link></li>
            {/* O botão SAIR é onde handleLogout é usado */}
            <li><button onClick={handleLogout} className={`${styles.logoutButton} darken-primary-gold`}>Sair</button></li>
          </ul>
        </nav>
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
}

export default AdminDashboardPage;

// O aviso sobre 'Response' (com R maiúsculo) deve ser um erro de digitação ou um resquício.
// NÃO há uma declaração 'const Response' no código que você forneceu.
// Se você a tiver em seu arquivo, remova-a, pois ela não é usada.
// Exemplo de como poderia ser:
// const Response = someValue; // <-- REMOVA SE ESTA LINHA OU SIMILAR EXISTIR EM SEU ARQUIVO