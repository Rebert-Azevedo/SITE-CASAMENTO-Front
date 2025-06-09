import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes Reutilizáveis
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Páginas Públicas (para convidados)
import HomePage from './pages/Home/Home';
import GiftListPage from './pages/GiftList/GiftList';
import RSVPPage from './pages/RSVP/RSVP';

// Páginas da Área Administrativa
import AdminLoginPage from './pages/AdminLogin/AdminLogin';
import AdminDashboardPage from './pages/AdminDashboard/AdminDashboard';
import GiftManagementPage from './pages/AdminDashboard/GiftManagement/GiftManagement';
import GuestManagementPage from './pages/AdminDashboard/GuestManagement/GuestManagement';
// Importe outras páginas de gerenciamento aqui (e.g., CategoryManagementPage, RsvpManagementPage)

// Página de Erro
import NotFoundPage from './pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Rotas Públicas para Convidados */}
          <Route path="/" element={<HomePage />} />
          <Route path="/lista-presentes" element={<GiftListPage />} />
          <Route path="/rsvp" element={<RSVPPage />} />

          {/* Rota de Login para Administradores */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Rotas Protegidas para Administradores (usando PrivateRoute) */}
          <Route
            path="/admin/*" // Captura todas as sub-rotas sob /admin
            element={
              <PrivateRoute>
                <AdminDashboardPage />
              </PrivateRoute>
            }
          >
            {/* Sub-rotas aninhadas dentro do AdminDashboard */}
            <Route index element={<GiftManagementPage />} /> {/* /admin/ */}
            <Route path="presentes" element={<GiftManagementPage />} />
            <Route path="convidados" element={<GuestManagementPage />} />
            {/* Adicione outras sub-rotas de gerenciamento aqui */}
          </Route>

          {/* Rota 404 (sempre a última) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;