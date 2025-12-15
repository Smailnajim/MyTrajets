import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllVehicles, addPneuToVehicle } from '../../services/vehicleService.js';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [pneuForm, setPneuForm] = useState({
        serialNumber: '',
        position: '',
        kmAtMaintenance: 0,
        kilometrageActuel: 0
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await getAllVehicles();
            setVehicles(response.data || []);
        } catch (err) {
            setError('Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPneu = async (e) => {
        e.preventDefault();
        if (!selectedVehicle) return;

        try {
            await addPneuToVehicle(selectedVehicle._id, pneuForm);
            setSuccess('Pneu added successfully!');
            setPneuForm({ serialNumber: '', position: '', kmAtMaintenance: 0, kilometrageActuel: 0 });
            setSelectedVehicle(null);
            fetchVehicles();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add pneu');
            setTimeout(() => setError(''), 3000);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            available: 'bg-green-500/20 text-green-300',
            on_trip: 'bg-blue-500/20 text-blue-300',
            maintenance: 'bg-orange-500/20 text-orange-300'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-300';
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Vehicles Management</h2>
                <Link to="/admin/camions/new" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium">
                    + New Vehicle
                </Link>
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
            )}

            {/* Add Pneu Modal */}
            {selectedVehicle && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Add Pneu to {selectedVehicle.plateNumber}</h3>
                        <form onSubmit={handleAddPneu} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Serial Number</label>
                                <input
                                    type="text"
                                    value={pneuForm.serialNumber}
                                    onChange={(e) => setPneuForm({ ...pneuForm, serialNumber: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                    placeholder="e.g. PN-001"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Position</label>
                                <input
                                    type="text"
                                    value={pneuForm.position}
                                    onChange={(e) => setPneuForm({ ...pneuForm, position: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                    placeholder="e.g. Front Left"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">KM at Maintenance (Rule)</label>
                                <input
                                    type="number"
                                    value={pneuForm.kmAtMaintenance}
                                    onChange={(e) => setPneuForm({ ...pneuForm, kmAtMaintenance: Number(e.target.value) })}
                                    min="0"
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-1">Current Kilometrage</label>
                                <input
                                    type="number"
                                    value={pneuForm.kilometrageActuel}
                                    onChange={(e) => setPneuForm({ ...pneuForm, kilometrageActuel: Number(e.target.value) })}
                                    min="0"
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">
                                    Add Pneu
                                </button>
                                <button type="button" onClick={() => setSelectedVehicle(null)} className="flex-1 py-2 bg-white/5 text-gray-300 rounded-lg border border-white/10">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Vehicles Table */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Plate Number</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM Total</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Pneus</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id} className="hover:bg-white/5 transition">
                                <td className="px-6 py-4 text-white font-medium">{vehicle.plateNumber}</td>
                                <td className="px-6 py-4 text-gray-300 capitalize">{vehicle.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(vehicle.status)}`}>
                                        {vehicle.status?.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{vehicle.kilometrageTotal} km</td>
                                <td className="px-6 py-4 text-gray-300">{vehicle.pneus?.length || 0}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedVehicle(vehicle)}
                                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 text-sm"
                                    >
                                        + Add Pneu
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {vehicles.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">No vehicles found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehiclesList;
