import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminDashboard.module.css';

function AdminDashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
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