import axios from "./axios";

// Obtener todos los CVs
export const getAllCvs = () => axios.get("/api/cvs");

// Obtener un CV por ID
export const getCvById = (cvId) => axios.get(`/api/cvs/${cvId}`);

// Crear un nuevo CV
export const createCv = (cv) => axios.post("/api/cvs", cv);

// Eliminar un CV por ID
export const deleteCv = (cvId) => axios.delete(`/api/cvs/${cvId}`);
