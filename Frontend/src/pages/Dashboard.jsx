import { useNavigate, Link } from 'react-router-dom';
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
                        <div className="flex items-center gap-6">
                            <h1 className="text-2xl font-bold text-white">MyTrajets</h1>
                            <div className="hidden md:flex gap-4">
                                <Link to="/trajets" className="text-gray-300 hover:text-white transition">Trajets</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {user?.role?.name === 'admin' && (
                                <Link to="/admin" className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/30 transition">
                                    Admin Panel
                                </Link>
                            )}
                            <span className="text-gray-300 hidden sm:block">
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
                {/* User Info */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
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
                            <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300">
                                Authorized
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/trajets" className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 transition group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-1">Trajets</h4>
                        <p className="text-gray-400 text-sm">View and manage all trips</p>
                    </Link>

                    {user?.role?.name === 'admin' && (
                        <Link to="/admin/users" className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 transition group">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-medium text-white mb-1">Users</h4>
                            <p className="text-gray-400 text-sm">Manage user accounts</p>
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
