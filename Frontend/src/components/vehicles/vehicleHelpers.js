// Vehicle status helper functions
export const vehicleTypes = ['camion', 'remorque'];
export const vehicleStatuses = ['available', 'on_trip', 'maintenance'];

export const getVehicleStatusColor = (status) => {
    const colors = {
        available: 'bg-green-500/20 text-green-300',
        on_trip: 'bg-blue-500/20 text-blue-300',
        maintenance: 'bg-orange-500/20 text-orange-300'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-300';
};

export const getStatusLabel = (status) => {
    return status?.replace('_', ' ') || status;
};
