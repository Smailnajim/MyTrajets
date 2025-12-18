import { Link } from 'react-router-dom';
import { InfoCard } from '../ui';
import TrajetStatusBadge from './TrajetStatusBadge';
import { trajetStatuses, getStatusColor, formatDate } from './trajetHelpers';

const TrajetViewMode = ({ trajet, onStatusChange, updating, onEdit }) => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-bold text-white">Trajet Details</h1>
                <TrajetStatusBadge status={trajet.statuts} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Chauffeur */}
                <InfoCard
                    label="Chauffeur"
                    value={`${trajet.chauffeurId?.firstName} ${trajet.chauffeurId?.lastName}`}
                    subValue={trajet.chauffeurId?.email}
                />

                {/* Camion */}
                <InfoCard
                    label="Camion"
                    value={trajet.camionId?.plateNumber}
                    subValue={trajet.camionId?.type}
                />

                {/* Remorque */}
                {trajet.remorqueId && (
                    <InfoCard
                        label="Remorque"
                        value={trajet.remorqueId?.plateNumber}
                    />
                )}

                {/* Dates */}
                <InfoCard label="Date Départ" value={formatDate(trajet.suiviDate?.depart)} />
                <InfoCard label="Date Arrivée" value={formatDate(trajet.suiviDate?.arrive)} />

                {/* Kilometrage */}
                <InfoCard label="Kilométrage" value={`${trajet.kilometrage || 0} km`} />

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
                    {trajetStatuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => onStatusChange(status)}
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
    );
};

export default TrajetViewMode;
