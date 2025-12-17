import StatusBadge from './StatusBadge';
import { getTypeLabel } from './maintenanceHelpers';

const AlertsTab = ({ vehiclesNeedingMaintenance, onSendToMaintenance }) => {
    // console.log('vehiclesNeedingMaintenance\n',vehiclesNeedingMaintenance)
    if (vehiclesNeedingMaintenance.length === 0) {
        return (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                <p className="text-green-300 text-lg">✓ All vehicles are in good condition!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {vehiclesNeedingMaintenance.map((item) => (
                <div key={item?.vehicle?.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-white font-medium">{item?.vehicle?.plateNumber}</h3>
                            <p className="text-gray-400 text-sm capitalize">{item?.vehicle?.type}</p>
                        </div>
                        <button
                            onClick={() => onSendToMaintenance(item)}
                            className="px-3 py-1.5 bg-orange-500/20 text-orange-300 rounded-lg text-sm hover:bg-orange-500/30 transition border border-orange-500/30"
                        >
                            🔧 Send to Maintenance
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {item?.report?.filter(r => r.status !== 'good').map((report, idx) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-gray-300 text-sm">{getTypeLabel(report.ruleType)}</span>
                                    <StatusBadge status={report.status} />
                                </div>
                                <p className="text-xs text-gray-400">
                                    {report.distanceSince.toLocaleString()} / {report.ruleInterval.toLocaleString()} km
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlertsTab;
