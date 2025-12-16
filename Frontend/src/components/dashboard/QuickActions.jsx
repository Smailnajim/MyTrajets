import { Link } from 'react-router-dom';

const QuickActions = ({ isAdmin }) => {
    return (
        <>
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

                {isAdmin && (
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
        </>
    );
};

export default QuickActions;
