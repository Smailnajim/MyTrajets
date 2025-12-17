import { maintenanceTypes, getTypeLabel } from './maintenanceHelpers';

const MaintenanceFormModal = ({
    showForm,
    setShowForm,
    formData,
    handleInputChange,
    handleSubmit,
    submitting,
    vehicles
}) => {
    if (!showForm) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl border border-white/10 p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Record Maintenance</h2>
                    <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Vehicle *</label>
                        <select
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="">Select Vehicle</option>
                            {vehicles.map((v) => (
                                <option key={v._id} value={v._id}>{v.plateNumber} ({v.type})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Type *</label>
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

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">KM at Maintenance *</label>
                        <input
                            type="number"
                            name="kmAtMaintenance"
                            value={formData.kmAtMaintenance}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Cost (Optional)</label>
                        <input
                            type="number"
                            name="cost"
                            value={formData.cost}
                            onChange={handleInputChange}
                            min="0"
                            placeholder="0"
                            className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MaintenanceFormModal;
