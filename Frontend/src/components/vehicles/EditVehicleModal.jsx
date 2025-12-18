import { useState, useEffect } from 'react';
import { Modal } from '../ui';

const EditVehicleModal = ({ vehicle, onClose, onSave, saving }) => {
    const [formData, setFormData] = useState({
        plateNumber: '',
        type: 'camion',
        status: 'available',
        kilometrageTotal: 0
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                plateNumber: vehicle.plateNumber || '',
                type: vehicle.type || 'camion',
                status: vehicle.status || 'available',
                kilometrageTotal: vehicle.kilometrageTotal || 0
            });
        }
    }, [vehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'kilometrageTotal' ? Number(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!vehicle) return null;

    return (
        <Modal isOpen={!!vehicle} onClose={onClose} title="Edit Vehicle">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Plate Number</label>
                    <input
                        type="text"
                        name="plateNumber"
                        value={formData.plateNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white"
                    >
                        <option value="camion">Camion</option>
                        <option value="remorque">Remorque</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white"
                    >
                        <option value="available">Available</option>
                        <option value="on_trip">On Trip</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-300 text-sm mb-1">Total Kilometrage</label>
                    <input
                        type="number"
                        name="kilometrageTotal"
                        value={formData.kilometrageTotal}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                </div>
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 bg-white/5 text-gray-300 rounded-lg border border-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditVehicleModal;
