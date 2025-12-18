const VehicleFilters = ({ typeFilter, setTypeFilter, statusFilter, setStatusFilter }) => {
    const vehicleTypes = ['all', 'camion', 'remorque'];
    const vehicleStatuses = ['all', 'available', 'on_trip', 'maintenance'];

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <div>
                <label className="block text-gray-400 text-xs mb-1">Type</label>
                <div className="flex gap-2">
                    {vehicleTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`px-3 py-1 rounded-lg text-sm capitalize transition ${typeFilter === type
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-gray-400 text-xs mb-1">Status</label>
                <div className="flex gap-2">
                    {vehicleStatuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1 rounded-lg text-sm capitalize transition ${statusFilter === status
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {status.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VehicleFilters;
