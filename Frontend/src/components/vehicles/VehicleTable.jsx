import VehicleStatusBadge from './VehicleStatusBadge';

const VehicleTable = ({ vehicles, onAddPneu, onEdit, onDelete }) => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Plate Number</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KM Total</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Pneus</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle._id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4 text-white font-medium">{vehicle.plateNumber}</td>
                            <td className="px-6 py-4 text-gray-300 capitalize">{vehicle.type}</td>
                            <td className="px-6 py-4"><VehicleStatusBadge status={vehicle.status} /></td>
                            <td className="px-6 py-4 text-gray-300">{vehicle.kilometrageTotal} km</td>
                            <td className="px-6 py-4 text-gray-300">{vehicle.pneus?.length || 0}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onAddPneu(vehicle)}
                                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 text-xs"
                                    >
                                        + Pneu
                                    </button>
                                    <button
                                        onClick={() => onEdit(vehicle)}
                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 text-xs"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(vehicle)}
                                        className="px-2 py-1 bg-red-500/20 text-red-300 rounded border border-red-500/30 text-xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {vehicles.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-400">No vehicles found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleTable;
