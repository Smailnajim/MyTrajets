import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTrajet } from '../../services/trajetService';
import { getAllVehicles } from '../../services/vehicleService';
import { getAllUsers } from '../../services/adminService';

const CreateTrajet = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [chauffeurs, setChauffeurs] = useState([]);
    const [camions, setCamions] = useState([]);
    const [remorques, setRemorques] = useState([]);

    const [formData, setFormData] = useState({
        chauffeurId: '',
        camionId: '',
        remorqueId: '',
        suiviDate: { depart: '' },
        suiviGasoilML: { depart: 0 },
        emplacement: {
            depart: { lat: 0, lng: 0, address: '' }
        },
        statuts: 'pending'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, vehiclesRes] = await Promise.all([
                getAllUsers(),
                getAllVehicles()
            ]);
            // Filter chauffeurs (users with chauffeur role)
            const allUsers = usersRes.data || [];
            setChauffeurs(allUsers.filter(u => u.roleId?.name === 'chauffeur'));

            const allVehicles = vehiclesRes.data || [];
            setCamions(allVehicles.filter(v => v.type === 'camion'));
            setRemorques(allVehicles.filter(v => v.type === 'remorque'));
        } catch (err) {
            setError('Failed to load data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child, subChild] = name.split('.');
            if (subChild) {
                setFormData(prev => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: {
                            ...prev[parent][child],
                            [subChild]: value
                        }
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [parent]: { ...prev[parent], [child]: value }
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                suiviGasoilML: { depart: Number(formData.suiviGasoilML.depart) },
                emplacement: {
                    depart: {
                        lat: Number(formData.emplacement.depart.lat),
                        lng: Number(formData.emplacement.depart.lng),
                        address: formData.emplacement.depart.address
                    }
                }
            };
            if (!payload.remorqueId) delete payload.remorqueId;

            await createTrajet(payload);
            setSuccess('Trajet created successfully!');
            setTimeout(() => navigate('/trajets'), 1500);
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Failed to create trajet';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-2xl font-bold text-white">MyTrajets</Link>
                            <span className="text-gray-400">/ <Link to="/trajets" className="hover:text-white">Trajets</Link> / New</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Trajet</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
                )}
                {success && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
                )}

                <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-5">
                    {/* Chauffeur */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Chauffeur *</label>
                        <select
                            name="chauffeurId"
                            value={formData.chauffeurId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="" className="bg-slate-800">Select chauffeur</option>
                            {chauffeurs.map(c => (
                                <option key={c._id} value={c._id} className="bg-slate-800">
                                    {c.firstName} {c.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Camion */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Camion *</label>
                        <select
                            name="camionId"
                            value={formData.camionId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="" className="bg-slate-800">Select camion</option>
                            {camions.map(c => (
                                <option key={c._id} value={c._id} className="bg-slate-800">
                                    {c.plateNumber} ({c.status})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Remorque (optional) */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Remorque (optional)</label>
                        <select
                            name="remorqueId"
                            value={formData.remorqueId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="" className="bg-slate-800">No remorque</option>
                            {remorques.map(r => (
                                <option key={r._id} value={r._id} className="bg-slate-800">
                                    {r.plateNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Departure Date */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Departure Date *</label>
                        <input
                            type="datetime-local"
                            name="suiviDate.depart"
                            value={formData.suiviDate.depart}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Gasoil Depart */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Gasoil at Departure (ML)</label>
                        <input
                            type="number"
                            name="suiviGasoilML.depart"
                            value={formData.suiviGasoilML.depart}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Departure Location */}
                    <div className="border-t border-white/10 pt-5">
                        <h3 className="text-white font-medium mb-3">Departure Location *</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    name="emplacement.depart.lat"
                                    value={formData.emplacement.depart.lat}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    name="emplacement.depart.lng"
                                    value={formData.emplacement.depart.lng}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="block text-gray-400 text-xs mb-1">Address</label>
                            <input
                                type="text"
                                name="emplacement.depart.address"
                                value={formData.emplacement.depart.address}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Casablanca, Morocco"
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Trajet'}
                        </button>
                        <Link to="/trajets" className="px-6 py-3 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition">
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateTrajet;
