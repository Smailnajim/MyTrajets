import { useState } from 'react';
import { syncPermissions } from '../../services/adminService';
import { Alert } from '../../components/ui';
import { RoleCard, PermissionsReference } from '../../components/roles';

const RolesManagement = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSyncPermissions = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await syncPermissions();
            setMessage({ type: 'success', text: 'Permissions synced successfully' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to sync permissions' });
        } finally {
            setLoading(false);
        }
    };

    const permissions = [
        { key: 'accept_user', label: 'Accept Users', description: 'Can authorize new user registrations' },
        { key: 'update_permissions', label: 'Update Permissions', description: 'Can modify role permissions' },
        { key: 'show_all_trajets', label: 'View All Trajets', description: 'Can view all trips in the system' },
        { key: 'get_any_trajet', label: 'Get Any Trajet', description: 'Can access any trip details' },
    ];

    const adminIcon = (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );

    const chauffeurIcon = (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Roles & Permissions</h2>
                <button
                    onClick={handleSyncPermissions}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                    {loading ? 'Syncing...' : 'Sync Permissions'}
                </button>
            </div>

            <Alert type={message.type} message={message.text} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RoleCard
                    role="Admin"
                    icon={adminIcon}
                    iconColor="bg-purple-500/20"
                    description="Full access to all system features"
                    permissions={permissions.map(p => p.label)}
                />
                <RoleCard
                    role="Chauffeur"
                    icon={chauffeurIcon}
                    iconColor="bg-blue-500/20"
                    description="Limited access for drivers"
                    permissions={['View own trajets', 'Update trajet status']}
                />
            </div>

            <PermissionsReference permissions={permissions} />
        </div>
    );
};

export default RolesManagement;
