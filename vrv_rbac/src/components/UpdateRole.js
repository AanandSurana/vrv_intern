import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateRole = ({ role, onUpdate, onClose }) => {
  const [name, setName] = useState(role.name);
  const [permissions, setPermissions] = useState(role.permissions);
  const [originalRole, setOriginalRole] = useState(role);  // Store original role state for revert on error

  const togglePermission = (perm) =>
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    onUpdate({ ...role, name, permissions });

    try {
      const response = await axios.put(`http://localhost:5000/api/roles/${role._id}`, {
        name,
        permissions,
      });

      if (response.status === 200) {
        onUpdate(response.data); 
        onClose();  
      }
    } catch (error) {
      console.error("Error updating role:", error);
      onUpdate(originalRole);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-5">
      <div>
        <label className="block text-sm">Role Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Permissions</label>
        <div className="flex space-x-4">
          {["read", "write", "delete"].map((perm) => (
            <label key={perm} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={permissions[perm]}
                onChange={() => togglePermission(perm)}
                className="accent-rose-400"
              />
              <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-white text-rose-600 font-semibold hover:bg-gray-200 py-2 px-4 rounded-md">
        Update Role
      </button>
    </form>
  );
};

export default UpdateRole;