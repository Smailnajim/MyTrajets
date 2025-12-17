const UserInfoCards = ({ user }) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">User Info</h3>
                    <p className="text-white">{user?.firstName} {user?.lastName}</p>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Role</h3>
                    <p className="text-purple-400 capitalize">{user?.role?.name}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Status</h3>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300">
                        Authorized
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCards;
