const MaintenanceTabs = ({ activeTab, setActiveTab, fleetCount, alertsCount, inMaintenanceCount }) => {
    const tabs = [
        { id: 'all-fleet', label: 'All Fleet', count: fleetCount },
        { id: 'alerts', label: 'Alerts', count: alertsCount },
        { id: 'in-maintenance', label: 'In Maintenance', count: inMaintenanceCount },
        { id: 'history', label: 'History' }
    ];

    return (
        <div className="flex gap-2 mb-6 flex-wrap">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === tab.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                            }`}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default MaintenanceTabs;
