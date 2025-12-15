import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTrajets, getTrajetsByStatus } from '../../services/trajetService.js';

const TrajetsList = () => {
    const [trajets, setTrajets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const statuses = ['all', 'pending', 'in_progress', 'completed', 'cancelled', 'maintenance'];

    useEffect(() => {
        fetchTrajets();
    }, [statusFilter]);

    const fetchTrajets = async () => {
        setLoading(true);
        try {
            let response;
            if (statusFilter === 'all') {
                response = await getAllTrajets();
            } else {
                response = await getTrajetsByStatus(statusFilter);
            }
            setTrajets(response.data || []);
        } catch (err) {
            setError('Failed to fetch trajets');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-500/20 text-yellow-300',
            in_progress: 'bg-blue-500/20 text-blue-300',
            completed: 'bg-green-500/20 text-green-300',
            cancelled: 'bg-red-500/20 text-red-300',
            maintenance: 'bg-orange-500/20 text-orange-300'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-300';
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-2xl font-bold text-white">MyTrajets</Link>
                            <span className="text-gray-400">/ Trajets</span>
                        </div>
                        <Link to="/trajets/new" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition">
                            + New Trajet
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition whitespace-nowrap ${statusFilter === status
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {status.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Chauffeur</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Camion</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Départ</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Arrivée</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {trajets.map((trajet) => (
                                    <tr key={trajet._id} className="hover:bg-white/5 transition">
                                        <td className="px-6 py-4 text-white">
                                            {trajet.chauffeurId?.firstName} {trajet.chauffeurId?.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {trajet.camionId?.immatriculation || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">
                                            {formatDate(trajet.suiviDate?.depart)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">
                                            {formatDate(trajet.suiviDate?.arrive)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-sm capitalize ${getStatusColor(trajet.statuts)}`}>
                                                {trajet.statuts?.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {trajet.kilometrage?.arrive ? trajet.kilometrage.arrive - trajet.kilometrage.depart : '-'} km
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/trajets/${trajet._id}`}
                                                className="text-purple-400 hover:text-purple-300 text-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {trajets.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                                            No trajets found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TrajetsList;
