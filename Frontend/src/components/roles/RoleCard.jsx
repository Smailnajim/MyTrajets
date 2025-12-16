const RoleCard = ({ role, icon, iconColor, description, permissions }) => {
    return (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{role}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{description}</p>
            <div className="space-y-2">
                {permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{perm}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleCard;
