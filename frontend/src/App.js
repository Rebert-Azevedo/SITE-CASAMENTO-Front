import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 

// Componentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Páginas Públicas
import HomePage from './pages/Home/Home';
import GiftListPage from './pages/GiftList/GiftList';

// Páginas da Área Administrativa
import AdminLoginPage from './pages/AdminLogin/AdminLogin';
import AdminDashboardPage from './pages/AdminDashboard/AdminDashboard';
import GiftManagementPage from './pages/AdminDashboard/GiftManagement/GiftManagement';
import GuestManagementPage from './pages/AdminDashboard/GuestManagement/GuestManagement';

// Página de Erro
import NotFoundPage from './pages/NotFound/NotFound';

function App() {
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.body.classList.add('is-admin-page');
    } else {
      document.body.classList.remove('is-admin-page');
    }
    return () => {
      document.body.classList.remove('is-admin-page');
    };
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lista-presentes" element={<GiftListPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminDashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<GiftManagementPage />} />
            <Route path="presentes" element={<GiftManagementPage />} />
            <Route path="convidados" element={<GuestManagementPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;