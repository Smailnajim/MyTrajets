// Status badge component for maintenance status
const StatusBadge = ({ status }) => {
    const styles = {
        good: 'bg-green-500/20 text-green-300 border-green-500/30',
        warning: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        overdue: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    const labels = { good: '✓ OK', warning: '⚠ Soon', overdue: 'Overdue' };

    return (
        <span className={`px-2 py-1 rounded text-xs border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default StatusBadge;
