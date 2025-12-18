import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { acceptUser, getAllRoles, changeUserRole } from '../../services/adminService.js';
import api from '../../services/api.js';
import { LoadingSpinner, Alert } from '../../components/ui';
import { UsersTable } from '../../components/users';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchRoles();
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

    const fetchRoles = async () => {
        try {
            const response = await getAllRoles();
            setRoles(response.data || []);
        } catch (err) {
            console.error('Failed to fetch roles', err);
        }
    };

    const handleAccept = async (userId) => {
        try {
            await acceptUser(userId);
            setSuccess('User authorized successfully');
            fetchUsers();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to authorize user');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleRoleChange = async (userId, roleId) => {
        try {
            await changeUserRole(userId, roleId);
            setSuccess('User role updated successfully');
            fetchUsers();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update user role');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Users Management</h2>
                <Link to="/admin/users/new" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition">
                    + New User
                </Link>
            </div>

            <Alert type="error" message={error} />
            <Alert type="success" message={success} />

            <UsersTable
                users={users}
                roles={roles}
                onRoleChange={handleRoleChange}
                onAccept={handleAccept}
            />
        </div>
    );
};

export default UsersManagement;
