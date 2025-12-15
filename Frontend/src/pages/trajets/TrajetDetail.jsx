import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTrajet, updateTrajet } from '../../services/trajetService';

const TrajetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trajet, setTrajet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchTrajet();
    }, [id]);

    const fetchTrajet = async () => {
        try {
            const response = await getTrajet(id);
            setTrajet(response.data);
        } catch (err) {
            setError('Failed to fetch trajet details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        setUpdating(true);
        try {
            await updateTrajet(id, { statuts: newStatus });
            fetchTrajet();
        } catch (err) {
            setError('Failed to update status');
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
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
                )}

                {trajet && (
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
                                <div className="flex gap-4">
                                    <div>
                                        <span className="text-gray-400 text-xs">Départ:</span>
                                        <p className="text-white">{trajet.kilometrage?.depart || 0} km</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-xs">Arrivée:</span>
                                        <p className="text-white">{trajet.kilometrage?.arrive || 0} km</p>
                                    </div>
                                </div>
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
                                {['pending', 'in_progress', 'completed', 'cancelled', 'maintenance'].map((status) => (
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
            </main>
        </div>
    );
};

export default TrajetDetail;
