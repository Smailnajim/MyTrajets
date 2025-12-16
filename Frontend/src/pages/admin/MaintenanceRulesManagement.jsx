import { useState, useEffect } from 'react';
import {
    getAllMaintenanceRules,
    createMaintenanceRule,
    updateMaintenanceRule,
    deleteMaintenanceRule
} from '../../services/maintenanceRuleService';

// Maintenance types from backend enum
const maintenanceTypes = [
    'vidange',          // Oil change
    'pneus',            // Tire replacement/check
    'freins',           // Brakes check/replacement
    'mecanique',        // General mechanical repair
    'electrique',       // Electrical repair
    'visite_technique', // Technical inspection
    'autre'             // Other
];

// Vehicle types from backend enum
const vehicleTypes = ['camion', 'remorque'];

const MaintenanceRulesManagement = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        vehicleType: '',
        intervalKm: '',
        description: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchRules();
    }, []);

    const fetchRules = async () => {
        try {
            setLoading(true);
            const response = await getAllMaintenanceRules();
            setRules(response.data || []);
        } catch (err) {
            setError('Failed to fetch maintenance rules');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'intervalKm' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            if (editingRule) {
                await updateMaintenanceRule(editingRule._id, formData);
                setSuccess('Maintenance rule updated successfully!');
            } else {
                await createMaintenanceRule(formData);
                setSuccess('Maintenance rule created successfully!');
            }
            resetForm();
            fetchRules();
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (rule) => {
        setEditingRule(rule);
        setFormData({
            type: rule.type,
            vehicleType: rule.vehicleType,
            intervalKm: rule.intervalKm,
            description: rule.description || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this rule?')) return;

        try {
            await deleteMaintenanceRule(id);
            setSuccess('Rule deleted successfully!');
            fetchRules();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete rule');
        }
    };

    const resetForm = () => {
        setFormData({ type: '', vehicleType: '', intervalKm: '', description: '' });
        setEditingRule(null);
        setShowForm(false);
    };

    const getTypeLabel = (type) => {
        const labels = {
            vidange: 'Vidange (Oil Change)',
            pneus: 'Pneus (Tires)',
            freins: 'Freins (Brakes)',
            mecanique: 'Mécanique',
            electrique: 'Électrique',
            visite_technique: 'Visite Technique',
            autre: 'Autre (Other)'
        };
        return labels[type] || type;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Maintenance Rules</h1>
                <button
                    onClick={() => { setShowForm(true); setEditingRule(null); }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                >
                    + Add Rule
                </button>
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">
                    {success}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl border border-white/10 p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editingRule ? 'Edit Rule' : 'New Maintenance Rule'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-white text-xl">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Maintenance Type */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Maintenance Type *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">Select Type</option>
                                    {maintenanceTypes.map((t) => (
                                        <option key={t} value={t}>{getTypeLabel(t)}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Vehicle Type */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Vehicle Type *
                                </label>
                                <select
                                    name="vehicleType"
                                    value={formData.vehicleType}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                >
                                    <option value="">Select Vehicle Type</option>
                                    {vehicleTypes.map((v) => (
                                        <option key={v} value={v} className="capitalize">{v}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Interval KM */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Interval (KM) *
                                </label>
                                <input
                                    type="number"
                                    name="intervalKm"
                                    value={formData.intervalKm}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    placeholder="e.g., 10000"
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Additional details..."
                                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                                >
                                    {submitting ? 'Saving...' : (editingRule ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Rules Table */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
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
                                            {getTypeLabel(rule.type)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 capitalize">{rule.vehicleType}</td>
                                    <td className="px-6 py-4 text-gray-300">{rule.intervalKm.toLocaleString()} km</td>
                                    <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">
                                        {rule.description || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(rule)}
                                                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(rule._id)}
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
            )}
        </div>
    );
};

export default MaintenanceRulesManagement;
