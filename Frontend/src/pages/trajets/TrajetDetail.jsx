import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTrajet, updateTrajet } from '../../services/trajetService';
import { getAllVehicles } from '../../services/vehicleService';
import { getAllUsers } from '../../services/adminService';

const TrajetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trajet, setTrajet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updating, setUpdating] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Form data for editing
    const [formData, setFormData] = useState({
        chauffeurId: '',
        camionId: '',
        remorqueId: '',
        suiviDate: { depart: '', arrive: '' },
        suiviGasoilML: { depart: 0, arrive: 0 },
        kilometrage: 0,
        statuts: 'pending'
    });

    // Dropdown options
    const [chauffeurs, setChauffeurs] = useState([]);
    const [camions, setCamions] = useState([]);
    const [remorques, setRemorques] = useState([]);

    const statuses = ['pending', 'in_progress', 'completed', 'cancelled', 'maintenance'];

    useEffect(() => {
        fetchTrajet();
        fetchDropdownData();
    }, [id]);

    const fetchTrajet = async () => {
        try {
            const response = await getTrajet(id);
            setTrajet(response.data);
            // Initialize form data with trajet values
            const t = response.data;
            setFormData({
                chauffeurId: t.chauffeurId?._id || '',
                camionId: t.camionId?._id || '',
                remorqueId: t.remorqueId?._id || '',
                suiviDate: {
                    depart: t.suiviDate?.depart ? new Date(t.suiviDate.depart).toISOString().slice(0, 16) : '',
                    arrive: t.suiviDate?.arrive ? new Date(t.suiviDate.arrive).toISOString().slice(0, 16) : ''
                },
                suiviGasoilML: {
                    depart: t.suiviGasoilML?.depart || 0,
                    arrive: t.suiviGasoilML?.arrive || 0
                },
                kilometrage: t.kilometrage || 0,
                statuts: t.statuts || 'pending'
            });
        } catch (err) {
            setError('Failed to fetch trajet details');
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            // Fetch users (chauffeurs)
            const usersRes = await getAllUsers();
            const allUsers = usersRes.data || [];
            // Filter chauffeurs (users with chauffeur role)
            const chauffeurList = allUsers.filter(u =>
                u.roleId?.name?.toLowerCase() === 'chauffeur' ||
                u.roleId?.name?.toLowerCase() === 'driver'
            );
            setChauffeurs(chauffeurList.length > 0 ? chauffeurList : allUsers);

            // Fetch vehicles
            const vehiclesRes = await getAllVehicles();
            const allVehicles = vehiclesRes.data || [];
            setCamions(allVehicles.filter(v => v.type === 'camion'));
            setRemorques(allVehicles.filter(v => v.type === 'remorque'));
        } catch (err) {
            console.error('Failed to fetch dropdown data', err);
        }
    };

    const handleStatusChange = async (newStatus) => {
        setUpdating(true);
        setError('');
        setSuccess('');
        try {
            await updateTrajet(id, { statuts: newStatus });
            fetchTrajet();
            setSuccess('Status updated successfully');
        } catch (err) {
            setError('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === 'kilometrage' ? Number(value) : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        setSuccess('');

        try {
            const updateData = {
                chauffeurId: formData.chauffeurId,
                camionId: formData.camionId,
                statuts: formData.statuts,
                kilometrage: Number(formData.kilometrage),
                suiviGasoilML: {
                    depart: Number(formData.suiviGasoilML.depart),
                    arrive: Number(formData.suiviGasoilML.arrive)
                }
            };

            // Only include dates if they have values
            if (formData.suiviDate.depart) {
                updateData['suiviDate.depart'] = new Date(formData.suiviDate.depart).toISOString();
            }
            if (formData.suiviDate.arrive) {
                updateData['suiviDate.arrive'] = new Date(formData.suiviDate.arrive).toISOString();
            }

            // Only include remorqueId if selected
            if (formData.remorqueId) {
                updateData.remorqueId = formData.remorqueId;
            }

            await updateTrajet(id, updateData);
            await fetchTrajet();
            setIsEditMode(false);
            setSuccess('Trajet updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update trajet');
        } finally {
            setUpdating(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
            in_progress: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            completed: 'bg-green-500/20 text-green-300 border-green-500/30',
            cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
            maintenance: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleString('fr-FR');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-2xl font-bold text-white">MyTrajets</Link>
                            <span className="text-gray-400">/ <Link to="/trajets" className="hover:text-white">Trajets</Link> / Details</span>
                        </div>
                        {!isEditMode && (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                            >
                                ✏️ Edit Trajet
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
                )}
                {success && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
                )}

                {trajet && !isEditMode && (
                    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-2xl font-bold text-white">Trajet Details</h1>
                            <span className={`px-3 py-1 rounded-lg border capitalize ${getStatusColor(trajet.statuts)}`}>
                                {trajet.statuts?.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Chauffeur */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h3 className="text-sm text-gray-400 mb-2">Chauffeur</h3>
                                <p className="text-white font-medium">
                                    {trajet.chauffeurId?.firstName} {trajet.chauffeurId?.lastName}
                                </p>
                                <p className="text-gray-400 text-sm">{trajet.chauffeurId?.email}</p>
                            </div>

                            {/* Camion */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h3 className="text-sm text-gray-400 mb-2">Camion</h3>
                                <p className="text-white font-medium">{trajet.camionId?.plateNumber || '-'}</p>
                                <p className="text-gray-400 text-sm capitalize">{trajet.camionId?.type}</p>
                            </div>

                            {/* Remorque */}
                            {trajet.remorqueId && (
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-sm text-gray-400 mb-2">Remorque</h3>
                                    <p className="text-white font-medium">{trajet.remorqueId?.plateNumber || '-'}</p>
                                </div>
                            )}

                            {/* Dates */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h3 className="text-sm text-gray-400 mb-2">Date Départ</h3>
                                <p className="text-white">{formatDate(trajet.suiviDate?.depart)}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h3 className="text-sm text-gray-400 mb-2">Date Arrivée</h3>
                                <p className="text-white">{formatDate(trajet.suiviDate?.arrive)}</p>
                            </div>

                            {/* Kilometrage */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h3 className="text-sm text-gray-400 mb-2">Kilométrage</h3>
                                <p className="text-white text-lg font-medium">{trajet.kilometrage || 0} km</p>
                            </div>

                            {/* Gasoil */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <h3 className="text-sm text-gray-400 mb-2">Gasoil (ML)</h3>
                                <div className="flex gap-4">
                                    <div>
                                        <span className="text-gray-400 text-xs">Départ:</span>
                                        <p className="text-white">{trajet.suiviGasoilML?.depart || 0}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-xs">Arrivée:</span>
                                        <p className="text-white">{trajet.suiviGasoilML?.arrive || 0}</p>
                                    </div>
                                </div>
                                {trajet.consommation !== null && (
                                    <p className="text-purple-400 text-sm mt-2">Consommation: {trajet.consommation} ML</p>
                                )}
                            </div>
                        </div>

                        {/* Status Actions */}
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-sm text-gray-400 mb-3">Change Status</h3>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(status)}
                                        disabled={updating || trajet.statuts === status}
                                        className={`px-4 py-2 rounded-lg text-sm capitalize transition disabled:opacity-50 ${trajet.statuts === status
                                            ? getStatusColor(status)
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        {status.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Link
                                to="/trajets"
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                            >
                                ← Back to List
                            </Link>
                        </div>
                    </div>
                )}

                {/* Edit Form */}
                {trajet && isEditMode && (
                    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-2xl font-bold text-white">Edit Trajet</h1>
                            <button
                                onClick={() => setIsEditMode(false)}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Chauffeur */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Chauffeur</label>
                                    <select
                                        name="chauffeurId"
                                        value={formData.chauffeurId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                        required
                                    >
                                        <option value="">Select Chauffeur</option>
                                        {chauffeurs.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.firstName} {c.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Camion */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Camion</label>
                                    <select
                                        name="camionId"
                                        value={formData.camionId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                        required
                                    >
                                        <option value="">Select Camion</option>
                                        {camions.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.plateNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Remorque */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Remorque (Optional)</label>
                                    <select
                                        name="remorqueId"
                                        value={formData.remorqueId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    >
                                        <option value="">No Remorque</option>
                                        {remorques.map((r) => (
                                            <option key={r._id} value={r._id}>
                                                {r.plateNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                                    <select
                                        name="statuts"
                                        value={formData.statuts}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    >
                                        {statuses.map((s) => (
                                            <option key={s} value={s}>
                                                {s.replace('_', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date Départ */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Date Départ</label>
                                    <input
                                        type="datetime-local"
                                        name="suiviDate.depart"
                                        value={formData.suiviDate.depart}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>

                                {/* Date Arrivée */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Date Arrivée</label>
                                    <input
                                        type="datetime-local"
                                        name="suiviDate.arrive"
                                        value={formData.suiviDate.arrive}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>

                                {/* Kilometrage */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Kilométrage</label>
                                    <input
                                        type="number"
                                        name="kilometrage"
                                        value={formData.kilometrage}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>

                                {/* Gasoil Départ */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Gasoil Départ (ML)</label>
                                    <input
                                        type="number"
                                        name="suiviGasoilML.depart"
                                        value={formData.suiviGasoilML.depart}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>

                                {/* Gasoil Arrivée */}
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Gasoil Arrivée (ML)</label>
                                    <input
                                        type="number"
                                        name="suiviGasoilML.arrive"
                                        value={formData.suiviGasoilML.arrive}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditMode(false)}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                                >
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TrajetDetail;
