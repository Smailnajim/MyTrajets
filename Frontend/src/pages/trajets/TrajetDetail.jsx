import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTrajet, updateTrajet } from '../../services/trajetService';
import { getAllVehicles } from '../../services/vehicleService';
import { getAllUsers } from '../../services/adminService';
import { LoadingSpinner, Alert, PageHeader } from '../../components/ui';
import { TrajetViewMode, TrajetEditForm } from '../../components/trajets';

const TrajetDetail = () => {
    const { id } = useParams();
    const [trajet, setTrajet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updating, setUpdating] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Form data for editing
    const [formData, setFormData] = useState({
        chauffeurId: '',
        camionId: '',
        remorqueId: '',
        suiviDate: { depart: '', arrive: '' },
        suiviGasoilML: { depart: 0, arrive: 0 },
        kilometrage: 0,
        statuts: 'pending'
    });

    // Dropdown options
    const [chauffeurs, setChauffeurs] = useState([]);
    const [camions, setCamions] = useState([]);
    const [remorques, setRemorques] = useState([]);

    useEffect(() => {
        fetchTrajet();
        fetchDropdownData();
    }, [id]);

    const fetchTrajet = async () => {
        try {
            const response = await getTrajet(id);
            setTrajet(response.data);
            const t = response.data;
            setFormData({
                chauffeurId: t.chauffeurId?._id || '',
                camionId: t.camionId?._id || '',
                remorqueId: t.remorqueId?._id || '',
                suiviDate: {
                    depart: t.suiviDate?.depart ? new Date(t.suiviDate.depart).toISOString().slice(0, 16) : '',
                    arrive: t.suiviDate?.arrive ? new Date(t.suiviDate.arrive).toISOString().slice(0, 16) : ''
                },
                suiviGasoilML: {
                    depart: t.suiviGasoilML?.depart || 0,
                    arrive: t.suiviGasoilML?.arrive || 0
                },
                kilometrage: t.kilometrage || 0,
                statuts: t.statuts || 'pending'
            });
        } catch (err) {
            setError('Failed to fetch trajet details');
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const usersRes = await getAllUsers();
            const allUsers = usersRes.data || [];
            const chauffeurList = allUsers.filter(u =>
                u.roleId?.name?.toLowerCase() === 'chauffeur' ||
                u.roleId?.name?.toLowerCase() === 'driver'
            );
            setChauffeurs(chauffeurList.length > 0 ? chauffeurList : allUsers);

            const vehiclesRes = await getAllVehicles();
            const allVehicles = vehiclesRes.data || [];
            setCamions(allVehicles.filter(v => v.type === 'camion'));
            setRemorques(allVehicles.filter(v => v.type === 'remorque'));
        } catch (err) {
            console.error('Failed to fetch dropdown data', err);
        }
    };

    const handleStatusChange = async (newStatus) => {
        setUpdating(true);
        setError('');
        setSuccess('');
        try {
            await updateTrajet(id, { statuts: newStatus });
            fetchTrajet();
            setSuccess('Status updated successfully');
        } catch (err) {
            setError('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === 'kilometrage' ? Number(value) : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        setSuccess('');

        try {
            const updateData = {
                chauffeurId: formData.chauffeurId,
                camionId: formData.camionId,
                statuts: formData.statuts,
                kilometrage: Number(formData.kilometrage),
                suiviGasoilML: {
                    depart: Number(formData.suiviGasoilML.depart),
                    arrive: Number(formData.suiviGasoilML.arrive)
                }
            };

            if (formData.suiviDate.depart) {
                updateData['suiviDate.depart'] = new Date(formData.suiviDate.depart).toISOString();
            }
            if (formData.suiviDate.arrive) {
                updateData['suiviDate.arrive'] = new Date(formData.suiviDate.arrive).toISOString();
            }
            if (formData.remorqueId) {
                updateData.remorqueId = formData.remorqueId;
            }

            await updateTrajet(id, updateData);
            await fetchTrajet();
            setIsEditMode(false);
            setSuccess('Trajet updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update trajet');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <LoadingSpinner fullScreen />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <PageHeader
                breadcrumbs={[
                    { label: 'Trajets', to: '/trajets' },
                    { label: 'Details' }
                ]}
                actions={!isEditMode && (
                    <button
                        onClick={() => setIsEditMode(true)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                    >
                        ✏️ Edit Trajet
                    </button>
                )}
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Alert type="error" message={error} />
                <Alert type="success" message={success} />

                {trajet && !isEditMode && (
                    <TrajetViewMode
                        trajet={trajet}
                        onStatusChange={handleStatusChange}
                        updating={updating}
                    />
                )}

                {trajet && isEditMode && (
                    <TrajetEditForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        updating={updating}
                        onCancel={() => setIsEditMode(false)}
                        chauffeurs={chauffeurs}
                        camions={camions}
                        remorques={remorques}
                    />
                )}
            </main>
        </div>
    );
};

export default TrajetDetail;
