import { Link } from 'react-router-dom';

const DashboardNavbar = ({ user, onLogout }) => {
    return (
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
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
