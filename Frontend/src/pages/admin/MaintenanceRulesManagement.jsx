import { useState, useEffect } from 'react';
import {
    getAllMaintenanceRules,
    createMaintenanceRule,
    updateMaintenanceRule,
    deleteMaintenanceRule
} from '../../services/maintenanceRuleService';
import { Alert } from '../../components/ui';
import { RulesTable, RuleFormModal } from '../../components/maintenanceRules';

const MaintenanceRulesManagement = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

            <Alert type="error" message={error} />
            <Alert type="success" message={success} />

            <RuleFormModal
                isOpen={showForm}
                onClose={resetForm}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                submitting={submitting}
                isEditing={!!editingRule}
            />

            <RulesTable rules={rules} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
        </div>
    );
};

export default MaintenanceRulesManagement;
