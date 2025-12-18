import { getRuleTypeLabel } from './ruleHelpers';

const RulesTable = ({ rules, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Vehicle</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Interval (KM)</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {rules.map((rule) => (
                        <tr key={rule._id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4 text-white">
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                                    {getRuleTypeLabel(rule.type)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-300 capitalize">{rule.vehicleType}</td>
                            <td className="px-6 py-4 text-gray-300">{rule.intervalKm.toLocaleString()} km</td>
                            <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">{rule.description || '-'}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(rule)}
                                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(rule._id)}
                                        className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-sm hover:bg-red-500/30 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {rules.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                No maintenance rules found. Click "+ Add Rule" to create one.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RulesTable;
