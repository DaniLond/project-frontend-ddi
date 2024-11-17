import axios from "./axios";

export const getUserById = (id) => axios.get(`/users/${id}`);
export const getAllUsers = () => axios.get("/users");
export const updateUser = (id, user) => axios.put(`/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`/users/${id}`);
export const activateUser = (id) => axios.get(`/users/activate/${id}`);
