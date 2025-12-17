import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTrajets, getTrajetsByStatus } from '../../services/trajetService';
import { PageHeader, Alert, LoadingSpinner } from '../../components/ui';
import { TrajetStatusBadge, trajetStatuses, formatDate } from '../../components/trajets';

const TrajetsList = () => {
    const [trajets, setTrajets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const allStatuses = ['all', ...trajetStatuses];

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <PageHeader
                breadcrumbs={[{ label: 'Trajets' }]}
                actions={
                    <Link
                        to="/trajets/new"
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                    >
                        + New Trajet
                    </Link>
                }
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {allStatuses.map((status) => (
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

                <Alert type="error" message={error} />

                {loading ? (
                    <LoadingSpinner />
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
                                        <td className="px-6 py-4 text-gray-300">{trajet.camionId?.plateNumber || '-'}</td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">{formatDate(trajet.suiviDate?.depart)}</td>
                                        <td className="px-6 py-4 text-gray-300 text-sm">{formatDate(trajet.suiviDate?.arrive)}</td>
                                        <td className="px-6 py-4"><TrajetStatusBadge status={trajet.statuts} /></td>
                                        <td className="px-6 py-4 text-gray-300">{trajet.kilometrage || 0} km</td>
                                        <td className="px-6 py-4">
                                            <Link to={`/trajets/${trajet._id}`} className="text-purple-400 hover:text-purple-300 text-sm">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {trajets.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-400">No trajets found</td>
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
