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
        <h3>Painel admin</h3>
        <nav>
          <ul>
            <li><Link to="/admin/presentes" className={styles.sidebarLink}>Gerenciar presentes</Link></li>
            <li><Link to="/admin/convidados" className={styles.sidebarLink}>Gerenciar convidados</Link></li>
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