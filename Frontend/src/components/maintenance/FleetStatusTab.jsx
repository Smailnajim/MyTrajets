import StatusBadge from './StatusBadge';
import { getTypeLabel } from './maintenanceHelpers';

const FleetStatusTab = ({ fleetStatus }) => {
    const camions = fleetStatus.filter(v => v?.vehicle?.type === 'camion');
    const remorques = fleetStatus.filter(v => v?.vehicle?.type === 'remorque');

    const VehicleCard = ({ item }) => (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">{item?.vehicle?.plateNumber}</h3>
                <span className="text-gray-400 text-sm capitalize">{item?.vehicle?.type}</span>
            </div>
            {item?.report?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {item?.report?.map((report, idx) => (
                        <div key={idx} className="bg-white/5 rounded p-2 border border-white/10">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300 text-xs">{getTypeLabel(report.ruleType)}</span>
                                <StatusBadge status={report.status} />
                            </div>
                            <p className="text-xs text-gray-500">
                                {report.distanceSince?.toLocaleString()} / {report.ruleInterval?.toLocaleString()} km
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No maintenance rules defined for this vehicle type</p>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Camions Section */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    🚛 Camions
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-sm">
                        {camions.length}
                    </span>
                </h2>
                <div className="space-y-3">
                    {camions.length === 0 ? (
                        <p className="text-gray-400 text-sm">No camions found</p>
                    ) : (
                        camions.map((item) => <VehicleCard key={item?.vehicle?.id} item={item} />)
                    )}
                </div>
            </div>

            {/* Remorques Section */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    🚚 Remorques
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-sm">
                        {remorques.length}
                    </span>
                </h2>
                <div className="space-y-3">
                    {remorques.length === 0 ? (
                        <p className="text-gray-400 text-sm">No remorques found</p>
                    ) : (
                        remorques.map((item) => (
                            <div key={item?.vehicle?.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-white font-medium">{item?.vehicle?.plateNumber}</h3>
                                    <span className="text-gray-400 text-sm capitalize">{item?.vehicle?.type}</span>
                                </div>
                                {item?.report?.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {item?.report?.map((report, idx) => (
                                            <div key={idx} className="bg-white/5 rounded p-2 border border-white/10">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-gray-300 text-xs">{getTypeLabel(report.ruleType)}</span>
                                                    <StatusBadge status={report.status} />
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {report.distanceSince?.toLocaleString()} / {report.ruleInterval?.toLocaleString()} km
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">
                                        No maintenance rules defined for this vehicle type.{' '}
                                        <a href="/admin/maintenance-rules" className="text-purple-400 hover:underline">Add rules →</a>
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FleetStatusTab;
