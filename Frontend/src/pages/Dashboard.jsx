import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navbar */}
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <h1 className="text-2xl font-bold text-white">MyTrajets</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-300">
                                Welcome, <span className="text-purple-400 font-medium">{user?.firstName}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-medium text-gray-300 mb-2">User Info</h3>
                            <p className="text-white">{user?.firstName} {user?.lastName}</p>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-medium text-gray-300 mb-2">Role</h3>
                            <p className="text-purple-400 capitalize">{user?.role?.name}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-medium text-gray-300 mb-2">Status</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${user?.isAuthorized ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                {user?.isAuthorized ? 'Authorized' : 'Pending'}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
