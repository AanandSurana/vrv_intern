//goodcode
import React, { useState } from "react";
import axios from "axios";
import { RiUserAddLine } from "react-icons/ri";

const UserForm = ({ onUserAdded, roles, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        role,
        status
      });

      // Pass the newly created user object back to the parent
      onUserAdded(response.data);

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setStatus("user");

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-5 rounded-md">
      <div>
        <label className="block text-sm">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          required
        >
        {roles.map((role) => (
          <option key={role._id} value={role.name}>{role.name}</option>
        ))}
        </select>
      </div>

      <div>
        <label className="block text-sm">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 bg-zinc-600 text-white rounded-md"
          required
        >
          <option value="active" className="hover:bg-rose-400">Active</option>
          <option value="inactive" className="hover:bg-rose-400">Inactive</option>
        </select>
      </div>



      <button type="submit" className="bg-rose-600 hover:bg-rose-800 text-white py-2 px-4 rounded-md mt-4">
        <span className="flex items-center justify-between gap-2"> Add User <RiUserAddLine /> </span>
      </button>
    </form>
  );
};

export default UserForm;
