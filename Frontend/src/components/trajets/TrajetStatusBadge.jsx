import { getStatusColor } from './trajetHelpers';

const TrajetStatusBadge = ({ status }) => {
    return (
        <span className={`px-3 py-1 rounded-lg border capitalize ${getStatusColor(status)}`}>
            {status?.replace('_', ' ')}
        </span>
    );
};

export default TrajetStatusBadge;
