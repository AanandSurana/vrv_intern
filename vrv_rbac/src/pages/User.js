//goodcode
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import UpdateUser from "../components/UpdateUser";
import { MdOutlineDelete, MdUpdate } from "react-icons/md";
import {GridLoader} from "react-spinners";
import ProfileIcon from "../components/ProfileIcon";
const User = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [roles, setRoles] = useState([]);

  const toggleForm = () => setShowForm((prev) => !prev);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/roles");
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setShowForm(false);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (updatedUserData, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        updatedUserData
      );
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? response.data : user))
      );
      setUserToUpdate(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-4 bg-zinc-900 min-h-screen text-white flex flex-col">
      <button
        onClick={toggleForm}
        className="bg-white text-black py-2 px-4 rounded-md hover:bg-rose-600 hover:text-white"
      >
        {showForm ? "Cancel" : "Add New User"}
      </button>

      {showForm && (
        <div className="mt-4">
          <UserForm onUserAdded={addUser} roles = {roles} onClose={() => setShowForm(false)} />
        </div>
      )}

      <h2 className="text-xl font-bold mt-8">All Users</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <GridLoader
          color="rgba(225, 29, 72,1)"
          // size={100}
          />
        </div>
      ) : users.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className={`bg-zinc-800 p-4 rounded-md shadow-md flex justify-between items-center
                ${
                user.status === "active" ? "border-green-500 border" : "border-red-500 border"
              }`}
            >
              {userToUpdate && userToUpdate._id === user._id ? (
                <UpdateUser
                  user={userToUpdate}
                  onUpdate={updateUser}
                  roles = {roles}
                  onClose={() => setUserToUpdate(null)}
                />
              ) : (
                <div>
                  <p>
                    <div className="flex items-center gap-2">
                      <ProfileIcon name={user.name} bgColor="bg-rose-500" textColor="text-white" />
                      <span className="font-bold">{user.name}</span> 
                    </div>
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-bold">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-bold">Status:</span> {user.status}
                  </p>
                </div>
              )}

              {!userToUpdate || userToUpdate._id !== user._id ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-rose-600 text-white py-1 px-3 rounded-md hover:bg-rose-700"
                  >
                   <span className="flex items-center gap-1 justify-between"> Delete <MdOutlineDelete /> </span>
                  </button>
                  <button
                    onClick={() => setUserToUpdate(user)}
                    className="bg-white py-1 px-3 rounded-md hover:bg-gray-400 text-rose-600 font-semibold"
                  >
                    <span className="flex items-center gap-1 "> Update <MdUpdate /></span>
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default User;
