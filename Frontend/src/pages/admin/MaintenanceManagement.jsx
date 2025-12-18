import { useState, useEffect } from 'react';
import { getFleetMaintenanceStatus, getAllMaintenances, createMaintenance } from '../../services/maintenanceService';
import { getAllVehicles, updateVehicle } from '../../services/vehicleService';
import {
    MaintenanceTabs,
    MaintenanceFormModal,
    FleetStatusTab,
    AlertsTab,
    InMaintenanceTab,
    HistoryTab
} from '../../components/maintenance';

const MaintenanceManagement = () => {
    const [fleetStatus, setFleetStatus] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('all-fleet');

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        vehicleId: '',
        type: '',
        kmAtMaintenance: '',
        cost: '',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statusRes, maintenancesRes, vehiclesRes] = await Promise.all([
                getFleetMaintenanceStatus(),
                getAllMaintenances(),
                getAllVehicles()
            ]);
            setFleetStatus(statusRes.data || []);
            setMaintenances(maintenancesRes.data || []);
            setVehicles(vehiclesRes.data || []);
        } catch (err) {
            setError('Failed to fetch maintenance data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['kmAtMaintenance', 'cost'].includes(name) ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSendToMaintenance = async (item) => {
        try {
            setError('');
            const vehicleId = item?.vehicle?.id;
            const issues = item?.report?.filter(r => r.status === 'warning' || r.status === 'overdue') || [];

            // Create maintenance records for each issue
            for (const issue of issues) {
                await createMaintenance({
                    vehicleId: vehicleId,
                    type: issue.ruleType,
                    kmAtMaintenance: issue.currentKm,
                    cost: 0,
                    notes: `Auto-created: ${issue.status} - ${issue.distanceSince}/${issue.ruleInterval} km`
                });
            }

            // Update vehicle status to maintenance
            await updateVehicle(vehicleId, { status: 'maintenance' });
            setSuccess(`Vehicle sent to maintenance! ${issues.length} maintenance record(s) created.`);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send vehicle to maintenance');
        }
    };

    const handleFixComplete = async (vehicle) => {
        try {
            setError('');
            await updateVehicle(vehicle._id, { status: 'available' });
            setSuccess('Vehicle fixed and now available!');
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update vehicle status');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            await createMaintenance(formData);
            await updateVehicle(formData.vehicleId, { status: 'available' });
            setSuccess('Maintenance recorded and vehicle is now available!');
            setFormData({ vehicleId: '', type: '', kmAtMaintenance: '', cost: '', notes: '' });
            setShowForm(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to record maintenance');
        } finally {
            setSubmitting(false);
        }
    };

    // Computed values
    const vehiclesNeedingMaintenance = fleetStatus.filter(v =>
        v?.report?.some(r => r.status === 'warning' || r.status === 'overdue')
    );
    const vehiclesInMaintenance = vehicles.filter(v => v.status === 'maintenance');

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Maintenance Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                >
                    + Record Maintenance
                </button>
            </div>

            {/* Alerts */}
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
            )}
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">{success}</div>
            )}

            {/* Tabs */}
            <MaintenanceTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                fleetCount={fleetStatus.length}
                alertsCount={vehiclesNeedingMaintenance.length}
                inMaintenanceCount={vehiclesInMaintenance.length}
            />

            {/* Form Modal */}
            <MaintenanceFormModal
                showForm={showForm}
                setShowForm={setShowForm}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                submitting={submitting}
                vehicles={vehicles}
            />

            {/* Content */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <>
                    {activeTab === 'all-fleet' && <FleetStatusTab fleetStatus={fleetStatus} />}
                    {activeTab === 'alerts' && (
                        <AlertsTab
                            vehiclesNeedingMaintenance={vehiclesNeedingMaintenance}
                            onSendToMaintenance={(item) => handleSendToMaintenance(item)}
                        />
                    )}
                    {activeTab === 'in-maintenance' && (
                        <InMaintenanceTab
                            vehiclesInMaintenance={vehiclesInMaintenance}
                            onFixComplete={handleFixComplete}
                        />
                    )}
                    {activeTab === 'history' && <HistoryTab maintenances={maintenances} />}
                </>
            )}
        </div>
    );
};

export default MaintenanceManagement;
