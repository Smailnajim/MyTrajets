import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../../services/vehicleService.js';

const CreateVehicle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        plateNumber: '',
        type: 'camion',
        status: 'available',
        kilometrageTotal: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const vehicleTypes = ['camion', 'remorque'];
    const vehicleStatuses = ['available', 'on_trip', 'maintenance'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'kilometrageTotal' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await createVehicle(formData);
            setSuccess('Vehicle created successfully!');
            setFormData({ plateNumber: '', type: 'camion', status: 'available', kilometrageTotal: 0 });
            setTimeout(() => navigate('/admin/vehicles'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create vehicle');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Create New Vehicle</h2>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl border border-white/10 p-6 max-w-lg">
                <div className="space-y-5">
                    {/* Plate Number */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Plate Number</label>
                        <input
                            type="text"
                            name="plateNumber"
                            value={formData.plateNumber}
                            onChange={handleChange}
                            required
                            placeholder="e.g. ABC-1234"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Vehicle Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        >
                            {vehicleTypes.map(type => (
                                <option key={type} value={type} className="bg-slate-800 capitalize">{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        >
                            {vehicleStatuses.map(status => (
                                <option key={status} value={status} className="bg-slate-800">{status.replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>

                    {/* Kilometrage */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Initial Kilometrage</label>
                        <input
                            type="number"
                            name="kilometrageTotal"
                            value={formData.kilometrageTotal}
                            onChange={handleChange}
                            min="0"
                            placeholder="0"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Vehicle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVehicle;
