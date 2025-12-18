// Trajet status helper functions
export const trajetStatuses = ['pending', 'in_progress', 'completed', 'cancelled', 'maintenance'];

export const getStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        in_progress: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        completed: 'bg-green-500/20 text-green-300 border-green-500/30',
        cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
        maintenance: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

export const getStatusLabel = (status) => {
    return status?.replace('_', ' ') || status;
};

export const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('fr-FR');
};
