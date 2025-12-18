// Maintenance type labels helper
export const maintenanceTypes = [
    'vidange', 'pneus', 'freins', 'mecanique', 'electrique', 'visite_technique', 'autre'
];

export const getTypeLabel = (type) => {
    const labels = {
        vidange: 'Vidange',
        pneus: 'Pneus',
        freins: 'Freins',
        mecanique: 'Mécanique',
        electrique: 'Électrique',
        visite_technique: 'Visite Tech.',
        autre: 'Autre'
    };
    return labels[type] || type;
};
