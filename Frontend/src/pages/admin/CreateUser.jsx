import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRoles } from '../../services/adminService';
import api from '../../services/api';

const CreateUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roles, setRoles] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: ''
    });

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await getAllRoles();
            setRoles(response.data || []);
        } catch (err) {
            console.error('Failed to fetch roles');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/users/register', formData);
            setSuccess('User created successfully!');
            setFormData({ firstName: '', lastName: '', email: '', password: '', roleId: '' });
            setTimeout(() => navigate('/admin/users'), 1500);
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Failed to create user';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Create New User</h2>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl border border-white/10 p-6 max-w-lg space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Password *</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Role</label>
                    <select
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="" className="bg-slate-800">Default (Chauffeur)</option>
                        {roles.map(role => (
                            <option key={role._id} value={role._id} className="bg-slate-800 capitalize">
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
