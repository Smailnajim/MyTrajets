import { useState, useEffect } from 'react';
import { acceptUser } from '../../services/adminService';
import api from '../../services/api';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data.data || []);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (userId) => {
        try {
            await acceptUser(userId);
            setSuccess('User authorized successfully');
            fetchUsers(); // Refresh list
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to authorize user');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Users Management</h2>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
            )}

            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-white/5 transition">
                                <td className="px-6 py-4 text-white">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm capitalize">
                                        {user.roleId?.name || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-sm ${user.etat === 'authorise'
                                            ? 'bg-green-500/20 text-green-300'
                                            : 'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                        {user.etat === 'authorise' ? 'Authorized' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.etat !== 'authorise' && (
                                        <button
                                            onClick={() => handleAccept(user._id)}
                                            className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg border border-green-500/30 transition text-sm"
                                        >
                                            Authorize
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
