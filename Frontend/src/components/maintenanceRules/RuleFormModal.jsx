import { Modal } from '../ui';
import { maintenanceTypes, vehicleTypes, getRuleTypeLabel } from './ruleHelpers';

const RuleFormModal = ({ isOpen, onClose, formData, handleInputChange, handleSubmit, submitting, isEditing }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Rule' : 'New Maintenance Rule'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Maintenance Type *</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="">Select Type</option>
                        {maintenanceTypes.map((t) => (
                            <option key={t} value={t}>{getRuleTypeLabel(t)}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Vehicle Type *</label>
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

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Interval (KM) *</label>
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

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Description (Optional)</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Additional details..."
                        className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                    >
                        {submitting ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default RuleFormModal;
