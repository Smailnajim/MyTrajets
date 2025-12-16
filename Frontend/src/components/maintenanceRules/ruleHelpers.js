// Maintenance rule helpers
export const maintenanceTypes = [
    'vidange', 'pneus', 'freins', 'mecanique', 'electrique', 'visite_technique', 'autre'
];

export const vehicleTypes = ['camion', 'remorque'];

export const getRuleTypeLabel = (type) => {
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
