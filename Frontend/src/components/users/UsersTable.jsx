import { useState } from "react";
import {changePassword} from "./../../services/adminService.js";

const UsersTable = ({ users, roles, onRoleChange, onAccept }) => {
    const [password, setPass] = useState('');
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-white/5">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4 text-white">{user.firstName} {user.lastName}</td>
                            <td className="px-6 py-4 text-gray-300">{user.email}</td>
                            <td className="px-6 py-4">
                                <select
                                    value={user.roleId?._id || ''}
                                    onChange={(e) => onRoleChange(user._id, e.target.value)}
                                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {roles.map((role) => (
                                        <option key={role._id} value={role._id} className="bg-slate-800">
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-sm ${user.etat === 'authorise'
                                        ? 'bg-green-500/20 text-green-300'
                                        : 'bg-yellow-500/20 text-yellow-300'
                                    }`}>
                                    {user.etat === 'authorise' ? 'Authorized' : 'Pending'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {user.etat !== 'authorise' && (
                                    <button
                                        onClick={() => onAccept(user._id)}
                                        className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg border border-green-500/30 transition text-sm"
                                    >
                                        Authorize
                                    </button>
                                )}
                                
                                <input 
                                type="text"
                                onChange={(e)=>setPass(e.target.value)}
                                value={password}
                                placeholder="password"
                                />

                                <button
                                onClick={()=>changePassword(user._id, password)}
                                >change pass</button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-400">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
