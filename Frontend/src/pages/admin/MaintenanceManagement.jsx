import { useState, useEffect } from 'react';
import { getFleetMaintenanceStatus, getAllMaintenances, createMaintenance } from '../../services/maintenanceService';
import { getAllVehicles, updateVehicle } from '../../services/vehicleService';

// Maintenance types
const maintenanceTypes = [
    'vidange', 'pneus', 'freins', 'mecanique', 'electrique', 'visite_technique', 'autre'
];

const MaintenanceManagement = () => {
    const [fleetStatus, setFleetStatus] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('all-fleet');

    // Form for recording maintenance
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        vehicleId: '',
        type: '',
        kmAtMaintenance: '',
        cost: '',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statusRes, maintenancesRes, vehiclesRes] = await Promise.all([
                getFleetMaintenanceStatus(),
                getAllMaintenances(),
                getAllVehicles()
            ]);
            setFleetStatus(statusRes.data || []);
            setMaintenances(maintenancesRes.data || []);
            setVehicles(vehiclesRes.data || []);
        } catch (err) {
            setError('Failed to fetch maintenance data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['kmAtMaintenance', 'cost'].includes(name) ? (value === '' ? '' : Number(value)) : value
        }));
    };

    // Send vehicle to maintenance status
    const handleSendToMaintenance = async (vehicleId) => {
        try {
            setError('');
            await updateVehicle(vehicleId, { status: 'maintenance' });
            setSuccess('Vehicle sent to maintenance!');
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update vehicle status');
        }
    };

    // Mark vehicle as available after maintenance fix
    const handleFixComplete = async (vehicleId) => {
        try {
            await updateVehicle(vehicleId, { status: 'available' });
            setSuccess('Vehicle maintenance completed!');
            setShowForm(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update vehicle status');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            await createMaintenance(formData);
            // Also set vehicle status back to available
            await updateVehicle(formData.vehicleId, { status: 'available' });
            setSuccess('Maintenance recorded and vehicle is now available!');
            setFormData({ vehicleId: '', type: '', kmAtMaintenance: '', cost: '', notes: '' });
            setShowForm(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to record maintenance');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            good: 'bg-green-500/20 text-green-300 border-green-500/30',
            warning: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
            overdue: 'bg-red-500/20 text-red-300 border-red-500/30'
        };
        const labels = { good: '✓ OK', warning: '⚠ Soon', overdue: '✕ Overdue' };
        return (
            <span className={`px-2 py-1 rounded text-xs border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const getTypeLabel = (type) => {
        const labels = {
            vidange: 'Vidange', pneus: 'Pneus', freins: 'Freins',
            mecanique: 'Mécanique', electrique: 'Électrique',
            visite_technique: 'Visite Tech.', autre: 'Autre'
        };
        return labels[type] || type;
    };

    // Filter vehicles that need attention (warning or overdue)
    const vehiclesNeedingMaintenance = fleetStatus.filter(v =>
        v?.report?.some(r => r.status === 'warning' || r.status === 'overdue')
    );

    // Get vehicles currently in maintenance status
    const vehiclesInMaintenance = vehicles.filter(v => v.status === 'maintenance');

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Maintenance Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                >
                    + Record Maintenance
                </button>
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {[
                    { id: 'all-fleet', label: 'All Fleet', count: fleetStatus.length },
                    { id: 'alerts', label: 'Alerts', count: vehiclesNeedingMaintenance.length },
                    { id: 'in-maintenance', label: 'In Maintenance', count: vehiclesInMaintenance.length },
                    { id: 'history', label: 'History' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === tab.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl border border-white/10 p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Record Maintenance</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Vehicle *</label>
                                <select
                                    name="vehicleId"
                                    value={formData.vehicleId}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">Select Vehicle</option>
                                    {vehicles.map((v) => (
                                        <option key={v._id} value={v._id}>{v.plateNumber} ({v.type})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">Select Type</option>
                                    {maintenanceTypes.map((t) => (
                                        <option key={t} value={t}>{getTypeLabel(t)}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">KM at Maintenance *</label>
                                <input
                                    type="number"
                                    name="kmAtMaintenance"
                                    value={formData.kmAtMaintenance}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Cost (Optional)</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                                >
                                    {submitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <>
                    {/* All Fleet Tab */}
                    {activeTab === 'all-fleet' && (
                        <div className="space-y-6">
                            {/* Camions Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    🚛 Camions
                                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-sm">
                                        {fleetStatus.filter(v => v?.vehicle?.type === 'camion').length}
                                    </span>
                                </h2>
                                <div className="space-y-3">
                                    {fleetStatus.filter(v => v?.vehicle?.type === 'camion').length === 0 ? (
                                        <p className="text-gray-400 text-sm">No camions found</p>
                                    ) : (
                                        fleetStatus.filter(v => v?.vehicle?.type === 'camion').map((item) => (
                                            <div key={item?.vehicle?.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h3 className="text-white font-medium">{item?.vehicle?.plateNumber}</h3>
                                                    <span className="text-gray-400 text-sm capitalize">{item?.vehicle?.type}</span>
                                                </div>
                                                {item?.report?.length > 0 ? (
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                        {item?.report?.map((report, idx) => (
                                                            <div key={idx} className="bg-white/5 rounded p-2 border border-white/10">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-gray-300 text-xs">{getTypeLabel(report.ruleType)}</span>
                                                                    {getStatusBadge(report.status)}
                                                                </div>
                                                                <p className="text-xs text-gray-500">{report.distanceSince?.toLocaleString()} / {report.ruleInterval?.toLocaleString()} km</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No maintenance rules defined for this vehicle type</p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Remorques Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    🚚 Remorques
                                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-sm">
                                        {fleetStatus.filter(v => v?.vehicle?.type === 'remorque').length}
                                    </span>
                                </h2>
                                <div className="space-y-3">
                                    {fleetStatus.filter(v => v?.vehicle?.type === 'remorque').length === 0 ? (
                                        <p className="text-gray-400 text-sm">No remorques found</p>
                                    ) : (
                                        fleetStatus.filter(v => v?.vehicle?.type === 'remorque').map((item) => (
                                            <div key={item?.vehicle?.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h3 className="text-white font-medium">{item?.vehicle?.plateNumber}</h3>
                                                    <span className="text-gray-400 text-sm capitalize">{item?.vehicle?.type}</span>
                                                </div>
                                                {item?.report?.length > 0 ? (
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                        {item?.report?.map((report, idx) => (
                                                            <div key={idx} className="bg-white/5 rounded p-2 border border-white/10">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-gray-300 text-xs">{getTypeLabel(report.ruleType)}</span>
                                                                    {getStatusBadge(report.status)}
                                                                </div>
                                                                <p className="text-xs text-gray-500">{report.distanceSince?.toLocaleString()} / {report.ruleInterval?.toLocaleString()} km</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No maintenance rules defined for this vehicle type. <a href="/admin/maintenance-rules" className="text-purple-400 hover:underline">Add rules →</a></p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Maintenance Alerts Tab */}
                    {activeTab === 'alerts' && (
                        <div className="space-y-4">
                            {vehiclesNeedingMaintenance.length === 0 ? (
                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                                    <p className="text-green-300 text-lg">✓ All vehicles are in good condition!</p>
                                </div>
                            ) : (
                                vehiclesNeedingMaintenance.map((item) => (
                                    <div key={item?.vehicle?.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h3 className="text-white font-medium">{item?.vehicle?.plateNumber}</h3>
                                                <p className="text-gray-400 text-sm capitalize">{item?.vehicle?.type}</p>
                                            </div>
                                            <button
                                                onClick={() => handleSendToMaintenance(item?.vehicle?.id)}
                                                className="px-3 py-1.5 bg-orange-500/20 text-orange-300 rounded-lg text-sm hover:bg-orange-500/30 transition border border-orange-500/30"
                                            >
                                                🔧 Send to Maintenance
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {item?.report?.filter(r => r.status !== 'good').map((report, idx) => (
                                                <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-gray-300 text-sm">{getTypeLabel(report.ruleType)}</span>
                                                        {getStatusBadge(report.status)}
                                                    </div>
                                                    <p className="text-xs text-gray-400">
                                                        {report.distanceSince.toLocaleString()} / {report.ruleInterval.toLocaleString()} km
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Vehicles In Maintenance Tab */}
                    {activeTab === 'in-maintenance' && (
                        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Plate Number</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM Total</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {vehiclesInMaintenance.map((vehicle) => (
                                        <tr key={vehicle._id} className="hover:bg-white/5 transition">
                                            <td className="px-6 py-4 text-white font-medium">{vehicle.plateNumber}</td>
                                            <td className="px-6 py-4 text-gray-300 capitalize">{vehicle.type}</td>
                                            <td className="px-6 py-4 text-gray-300">{vehicle.kilometrageTotal?.toLocaleString() || 0} km</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-sm border border-orange-500/30">
                                                    🔧 In Maintenance
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => {
                                                        setFormData({
                                                            vehicleId: vehicle._id,
                                                            type: '',
                                                            kmAtMaintenance: vehicle.kilometrageTotal || '',
                                                            cost: '',
                                                            notes: ''
                                                        });
                                                        setShowForm(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded text-sm hover:bg-green-500/30 transition border border-green-500/30"
                                                >
                                                    ✓ Fix & Complete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {vehiclesInMaintenance.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                                No vehicles currently in maintenance
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Maintenance History Tab */}
                    {activeTab === 'history' && (
                        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Vehicle</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {maintenances.map((m) => (
                                        <tr key={m._id} className="hover:bg-white/5 transition">
                                            <td className="px-6 py-4 text-gray-300 text-sm">
                                                {new Date(m.createdAt).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-6 py-4 text-white">{m.vehicleId?.plateNumber || '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                                                    {getTypeLabel(m.type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{m.kmAtMaintenance?.toLocaleString() || 0} km</td>
                                            <td className="px-6 py-4 text-gray-300">{m.cost ? `${m.cost} MAD` : '-'}</td>
                                        </tr>
                                    ))}
                                    {maintenances.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                                No maintenance records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MaintenanceManagement;
