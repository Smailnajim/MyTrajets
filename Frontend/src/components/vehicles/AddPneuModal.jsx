import { Modal } from '../ui';

const AddPneuModal = ({ vehicle, pneuForm, setPneuForm, onSubmit, onClose }) => {
    if (!vehicle) return null;

    return (
        <Modal isOpen={!!vehicle} onClose={onClose} title={`Add Pneu to ${vehicle.plateNumber}`}>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Serial Number</label>
                    <input
                        type="text"
                        value={pneuForm.serialNumber}
                        onChange={(e) => setPneuForm({ ...pneuForm, serialNumber: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="e.g. PN-001"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Position</label>
                    <input
                        type="text"
                        value={pneuForm.position}
                        onChange={(e) => setPneuForm({ ...pneuForm, position: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        placeholder="e.g. Front Left"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm mb-1">KM at Maintenance (Rule)</label>
                    <input
                        type="number"
                        value={pneuForm.kmAtMaintenance}
                        onChange={(e) => setPneuForm({ ...pneuForm, kmAtMaintenance: Number(e.target.value) })}
                        min="0"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Current Kilometrage</label>
                    <input
                        type="number"
                        value={pneuForm.kilometrageActuel}
                        onChange={(e) => setPneuForm({ ...pneuForm, kilometrageActuel: Number(e.target.value) })}
                        min="0"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                </div>
                <div className="flex gap-3">
                    <button type="submit" className="flex-1 py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">
                        Add Pneu
                    </button>
                    <button type="button" onClick={onClose} className="flex-1 py-2 bg-white/5 text-gray-300 rounded-lg border border-white/10">
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPneuModal;
