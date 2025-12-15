import { useState } from 'react';
import { syncPermissions } from '../../services/adminService';

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

            {message.text && (
                <div className={`px-4 py-3 rounded-lg mb-4 ${message.type === 'success'
                        ? 'bg-green-500/20 border border-green-500/50 text-green-200'
                        : 'bg-red-500/20 border border-red-500/50 text-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admin Role Card */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Admin</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Full access to all system features</p>
                    <div className="space-y-2">
                        {permissions.map((perm) => (
                            <div key={perm.key} className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-300">{perm.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chauffeur Role Card */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Chauffeur</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Limited access for drivers</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">View own trajets</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">Update trajet status</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Permissions Reference */}
            <div className="mt-8 bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Available Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permissions.map((perm) => (
                        <div key={perm.key} className="p-4 bg-white/5 rounded-lg">
                            <code className="text-purple-400 text-sm">{perm.key}</code>
                            <p className="text-gray-400 text-sm mt-1">{perm.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RolesManagement;
