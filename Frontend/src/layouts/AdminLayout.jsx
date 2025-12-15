import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from './../hooks/useAuth.js';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/admin/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
        { to: '/admin/roles', label: 'Roles', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { to: '/admin/camions/new', label: 'Camions', icon: 'M3 7h13a3 3 0 013 3v6h-2a2 2 0 00-2 2H6a2 2 0 01-2-2H3V7zm14 6h3l2 3h-5v-3z' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navbar */}
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-8">
                            <NavLink to="/" className="text-2xl font-bold text-white">MyTrajets</NavLink>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <NavLink to="/" className="text-gray-300 hover:text-white transition">Dashboard</NavLink>
                            <span className="text-gray-300">{user?.firstName}</span>
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Admin Menu</h3>
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                                ? 'bg-purple-500/20 text-purple-300'
                                                : 'text-gray-300 hover:bg-white/5'
                                            }`
                                        }
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 bg-white/5 rounded-xl border border-white/10 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
