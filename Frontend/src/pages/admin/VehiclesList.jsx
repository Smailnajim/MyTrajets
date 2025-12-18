import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllVehicles, addPneuToVehicle, updateVehicle, deleteVehicle } from '../../services/vehicleService.js';
import { LoadingSpinner, Alert } from '../../components/ui';
import { VehicleTable, AddPneuModal, EditVehicleModal, VehicleFilters } from '../../components/vehicles';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [saving, setSaving] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [pneuForm, setPneuForm] = useState({
        serialNumber: '',
        position: '',
        kmAtMaintenance: 0,
        kilometrageActuel: 0
    });

    useEffect(() => {
        fetchVehicles();
    }, [typeFilter, statusFilter]);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const filters = {};
            if (typeFilter !== 'all') filters.type = typeFilter;
            if (statusFilter !== 'all') filters.status = statusFilter;
            const response = await getAllVehicles(filters);
            setVehicles(response.data || []);
        } catch (err) {
            setError('Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPneu = async (e) => {
        e.preventDefault();
        if (!selectedVehicle) return;

        try {
            await addPneuToVehicle(selectedVehicle._id, pneuForm);
            setSuccess('Pneu added successfully!');
            setPneuForm({ serialNumber: '', position: '', kmAtMaintenance: 0, kilometrageActuel: 0 });
            setSelectedVehicle(null);
            fetchVehicles();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add pneu');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleEditSave = async (formData) => {
        if (!editingVehicle) return;
        setSaving(true);
        try {
            await updateVehicle(editingVehicle._id, formData);
            setSuccess('Vehicle updated successfully!');
            setEditingVehicle(null);
            fetchVehicles();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update vehicle');
            setTimeout(() => setError(''), 3000);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (vehicle) => {
        if (!window.confirm(`Are you sure you want to delete ${vehicle.plateNumber}?`)) return;

        try {
            await deleteVehicle(vehicle._id);
            setSuccess('Vehicle deleted successfully!');
            fetchVehicles();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete vehicle');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Vehicles Management</h2>
                <Link to="/admin/camions/new" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium">
                    + New Vehicle
                </Link>
            </div>

            <VehicleFilters
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <Alert type="error" message={error} />
            <Alert type="success" message={success} />

            <AddPneuModal
                vehicle={selectedVehicle}
                pneuForm={pneuForm}
                setPneuForm={setPneuForm}
                onSubmit={handleAddPneu}
                onClose={() => setSelectedVehicle(null)}
            />

            <EditVehicleModal
                vehicle={editingVehicle}
                onClose={() => setEditingVehicle(null)}
                onSave={handleEditSave}
                saving={saving}
            />

            <VehicleTable
                vehicles={vehicles}
                onAddPneu={setSelectedVehicle}
                onEdit={setEditingVehicle}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default VehiclesList;
