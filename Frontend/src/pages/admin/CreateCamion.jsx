import { useState } from 'react';
import { createCamion } from '../../services/camionService.js';

const statusOptions = [
    { value: 'available', label: 'Disponible' },
    { value: 'on_trip', label: 'En mission' },
    { value: 'maintenance', label: 'Maintenance' }
];

const initialForm = {
    plateNumber: '',
    status: 'available',
    kilometrageTotal: '',
    lat: '',
    lng: ''
};

const CreateCamion = () => {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const buildPayload = () => {
        const payload = {
            plateNumber: formData.plateNumber.trim(),
            status: formData.status
        };

        if (formData.kilometrageTotal) {
            payload.kilometrageTotal = Number(formData.kilometrageTotal);
        }

        const position = {};
        if (formData.lat !== '') {
            const lat = Number(formData.lat);
            if (!Number.isNaN(lat)) position.lat = lat;
        }
        if (formData.lng !== '') {
            const lng = Number(formData.lng);
            if (!Number.isNaN(lng)) position.lng = lng;
        }
        if (Object.keys(position).length) {
            payload.position = position;
        }

        return payload;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.plateNumber.trim()) {
            setError('Veuillez renseigner une immatriculation valide.');
            return;
        }

        setLoading(true);
        try {
            const payload = buildPayload();
            const response = await createCamion(payload);
            const createdPlate = response?.data?.plateNumber || payload.plateNumber;
            setSuccess(`Camion ${createdPlate} créé avec succès.`);
            setFormData(initialForm);
        } catch (err) {
            const message = err.response?.data?.message || 'Échec de la création du camion. Réessayez plus tard.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Créer un Camion</h2>
                    <p className="text-gray-400 text-sm">Ajoutez un camion à la flotte pour l&apos;affecter aux trajets.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-6">
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">{error}</div>
                )}
                {success && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">{success}</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Immatriculation *</label>
                        <input
                            type="text"
                            name="plateNumber"
                            value={formData.plateNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="AA-123-AA"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Statut</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {statusOptions.map((status) => (
                                <option key={status.value} value={status.value} className="bg-slate-900">
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Kilométrage total</label>
                        <input
                            type="number"
                            name="kilometrageTotal"
                            value={formData.kilometrageTotal}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="0"
                            min="0"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Latitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                name="lat"
                                value={formData.lat}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="35.6895"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Longitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                name="lng"
                                value={formData.lng}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="-5.0000"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-60"
                    >
                        {loading ? 'Création en cours...' : 'Créer le camion'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setFormData(initialForm);
                            setError('');
                            setSuccess('');
                        }}
                        className="px-6 py-3 bg-white/10 text-gray-200 rounded-lg border border-white/20 hover:bg-white/20 transition"
                    >
                        Réinitialiser
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCamion;
