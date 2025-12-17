const PermissionsReference = ({ permissions }) => {
    return (
        <div className="mt-8 bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Available Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions.map((perm) => (
                    <div key={perm.key} className="p-4 bg-white/5 rounded-lg">
                        <code className="text-purple-400 text-sm">{perm.key}</code>
                        <p className="text-gray-400 text-sm mt-1">{perm.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PermissionsReference;
