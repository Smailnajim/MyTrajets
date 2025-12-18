import { getVehicleStatusColor } from './vehicleHelpers';

const VehicleStatusBadge = ({ status }) => {
    return (
        <span className={`px-2 py-1 rounded text-sm ${getVehicleStatusColor(status)}`}>
            {status?.replace('_', ' ')}
        </span>
    );
};

export default VehicleStatusBadge;
