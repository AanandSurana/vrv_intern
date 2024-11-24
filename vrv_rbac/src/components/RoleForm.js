import React, { useState } from "react";
import axios from "axios";

const RoleForm = ({ onRoleAdded, onClose }) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/roles", {
        name,
        permissions,
      });
      onRoleAdded(response.data.role);
      // Reset form fields
      setName("");
      setPermissions({ read: false, write: false, delete: false });
      onClose();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const togglePermission = (perm) =>
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-5 lg:flex gap-20">
      <div>
        <label className="block text-sm">Role Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          placeholder="Enter role name"
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

      <button
        type="submit"
        className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700"
      >
        Add Role
      </button>
    </form>
  );
};

export default RoleForm;
