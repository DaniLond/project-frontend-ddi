import axios from "axios";

// Obtener todos los tratamientos
export const getAllTreatments = () => axios.get("/api/treatments");

// Obtener un tratamiento por ID
export const getTreatmentById = (treatmentId) =>
  axios.get(`/api/treatments/${treatmentId}`);

// Crear un nuevo tratamiento
export const createTreatment = (treatment) =>
  axios.post("/api/treatments", treatment);

// Actualizar un tratamiento existente
export const updateTreatment = (treatmentId, treatment) =>
  axios.put(`/api/treatments/${treatmentId}`, treatment);

// Eliminar un tratamiento por ID
export const deleteTreatment = (treatmentId) =>
  axios.delete(`/api/treatments/${treatmentId}`);
