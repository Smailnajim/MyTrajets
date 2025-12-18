import { Link } from 'react-router-dom';
import TrajetStatusBadge from './TrajetStatusBadge';
import { formatDate } from './trajetHelpers';

const TrajetTable = ({ trajets, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Chauffeur</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Camion</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date Départ</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
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
                            <td className="px-6 py-4 text-gray-300 text-sm">
                                {formatDate(trajet.suiviDate?.depart)}
                            </td>
                            <td className="px-6 py-4 text-gray-300">{trajet.kilometrage || 0} km</td>
                            <td className="px-6 py-4">
                                <TrajetStatusBadge status={trajet.statuts} />
                            </td>
                            <td className="px-6 py-4">
                                <Link
                                    to={`/trajets/${trajet._id}`}
                                    className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded text-sm hover:bg-purple-500/30 transition"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {trajets.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                No trajets found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TrajetTable;
