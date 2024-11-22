import axios from "./axios";

export const getAllRoles = () => axios.get("/api/roles");
export const createRole = (role) => axios.post("/api/roles", role);
export const assignRoleToUser = (userId, roleId) =>
  axios.post(`/api/roles/assign?userId=${userId}&roleId=${roleId}`);
export const deleteRole = (roleId) => axios.delete(`/api/roles/${roleId}`);
export const removeRoleFromUser = (userId, roleId) =>
  axios.delete(`/api/roles/remove?userId=${userId}&roleId=${roleId}`);
export const updateRole = async (roleId, roleData) => {
  return await axios.put(`/api/roles/${roleId}`, roleData);
};
