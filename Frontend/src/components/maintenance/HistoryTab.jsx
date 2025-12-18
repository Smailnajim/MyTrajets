import { getTypeLabel } from './maintenanceHelpers';

const HistoryTab = ({ maintenances }) => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Vehicle</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Cost</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {maintenances.map((m) => (
                        <tr key={m._id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4 text-gray-300 text-sm">
                                {new Date(m.createdAt).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-6 py-4 text-white">{m.vehicleId?.plateNumber || '-'}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                                    {getTypeLabel(m.type)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{m.kmAtMaintenance?.toLocaleString() || 0} km</td>
                            <td className="px-6 py-4 text-gray-300">{m.cost ? `${m.cost} MAD` : '-'}</td>
                        </tr>
                    ))}
                    {maintenances.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                No maintenance records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTab;
