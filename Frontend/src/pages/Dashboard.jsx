import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { DashboardNavbar, UserInfoCards, QuickActions } from '../components/dashboard';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <DashboardNavbar user={user} onLogout={handleLogout} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <UserInfoCards user={user} />
                <QuickActions isAdmin={user?.role?.name === 'admin'} />
            </main>
        </div>
    );
};

export default Dashboard;
