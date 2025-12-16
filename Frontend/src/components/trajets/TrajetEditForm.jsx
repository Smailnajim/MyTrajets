import { trajetStatuses } from './trajetHelpers';

const TrajetEditForm = ({
    formData,
    handleInputChange,
    handleSubmit,
    updating,
    onCancel,
    chauffeurs,
    camions,
    remorques
}) => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-bold text-white">Edit Trajet</h1>
                <button onClick={onCancel} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chauffeur */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Chauffeur</label>
                        <select
                            name="chauffeurId"
                            value={formData.chauffeurId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            required
                        >
                            <option value="">Select Chauffeur</option>
                            {chauffeurs.map((c) => (
                                <option key={c._id} value={c._id}>{c.firstName} {c.lastName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Camion */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Camion</label>
                        <select
                            name="camionId"
                            value={formData.camionId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            required
                        >
                            <option value="">Select Camion</option>
                            {camions.map((c) => (
                                <option key={c._id} value={c._id}>{c.plateNumber}</option>
                            ))}
                        </select>
                    </div>

                    {/* Remorque */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Remorque (Optional)</label>
                        <select
                            name="remorqueId"
                            value={formData.remorqueId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="">No Remorque</option>
                            {remorques.map((r) => (
                                <option key={r._id} value={r._id}>{r.plateNumber}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                        <select
                            name="statuts"
                            value={formData.statuts}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        >
                            {trajetStatuses.map((s) => (
                                <option key={s} value={s}>{s.replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Départ */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Date Départ</label>
                        <input
                            type="datetime-local"
                            name="suiviDate.depart"
                            value={formData.suiviDate.depart}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Date Arrivée */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Date Arrivée</label>
                        <input
                            type="datetime-local"
                            name="suiviDate.arrive"
                            value={formData.suiviDate.arrive}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Kilometrage */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Kilométrage</label>
                        <input
                            type="number"
                            name="kilometrage"
                            value={formData.kilometrage}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Gasoil Départ */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Gasoil Départ (ML)</label>
                        <input
                            type="number"
                            name="suiviGasoilML.depart"
                            value={formData.suiviGasoilML.depart}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Gasoil Arrivée */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Gasoil Arrivée (ML)</label>
                        <input
                            type="number"
                            name="suiviGasoilML.arrive"
                            value={formData.suiviGasoilML.arrive}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updating}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
                    >
                        {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TrajetEditForm;
