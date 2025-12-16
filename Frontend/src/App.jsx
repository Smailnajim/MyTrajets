import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import UsersManagement from './pages/admin/UsersManagement';
import RolesManagement from './pages/admin/RolesManagement';
import TrajetsList from './pages/trajets/TrajetsList';
import TrajetDetail from './pages/trajets/TrajetDetail';
import CreateVehicle from './pages/admin/CreateVehicle';
import VehiclesList from './pages/admin/VehiclesList';
import CreateTrajet from './pages/trajets/CreateTrajet';
import CreateUser from './pages/admin/CreateUser';
import MaintenanceRulesManagement from './pages/admin/MaintenanceRulesManagement';
import MaintenanceManagement from './pages/admin/MaintenanceManagement';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Trajets Routes */}
          <Route path="/trajets" element={
            <ProtectedRoute>
              <TrajetsList />
            </ProtectedRoute>
          } />
          <Route path="/trajets/:id" element={
            <ProtectedRoute>
              <TrajetDetail />
            </ProtectedRoute>
          } />
          <Route path="/trajets/new" element={
            <ProtectedRoute>
              <CreateTrajet />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Navigate to="/admin/users" replace />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="users/new" element={<CreateUser />} />
            <Route path="roles" element={<RolesManagement />} />
            <Route path="vehicles" element={<VehiclesList />} />
            <Route path="camions/new" element={<CreateVehicle />} />
            <Route path="maintenance-rules" element={<MaintenanceRulesManagement />} />
            <Route path="maintenance" element={<MaintenanceManagement />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
