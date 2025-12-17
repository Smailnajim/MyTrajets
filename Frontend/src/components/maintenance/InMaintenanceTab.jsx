const InMaintenanceTab = ({ vehiclesInMaintenance, onFixComplete }) => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Plate Number</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM Total</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {vehiclesInMaintenance.map((vehicle) => (
                        <tr key={vehicle._id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4 text-white font-medium">{vehicle.plateNumber}</td>
                            <td className="px-6 py-4 text-gray-300 capitalize">{vehicle.type}</td>
                            <td className="px-6 py-4 text-gray-300">{vehicle.kilometrageTotal?.toLocaleString() || 0} km</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-sm border border-orange-500/30">
                                    🔧 In Maintenance
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onFixComplete(vehicle)}
                                    className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded text-sm hover:bg-green-500/30 transition border border-green-500/30"
                                >
                                    ✓ Fix & Complete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {vehiclesInMaintenance.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                No vehicles currently in maintenance
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InMaintenanceTab;
