import React, { createContext, useContext, useState } from "react";
import { getAllCvs, getCvById, createCv, deleteCv } from "../api/cv";

// Crear el contexto
const CvContext = createContext();

// Hook personalizado para usar el contexto
export const useCv = () => useContext(CvContext);

// Proveedor del contexto
export const CvProvider = ({ children }) => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener todos los CVs
  const fetchAllCvs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAllCvs();
      setCvs(data); // Actualizar el estado con los CVs obtenidos
      return data;
    } catch (err) {
      console.error("Error al obtener los CVs:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un CV por ID
  const fetchCvById = async (cvId) => {
    try {
      const { data } = await getCvById(cvId);
      return data;
    } catch (err) {
      console.error(`Error al obtener el CV con ID ${cvId}:`, err);
      setError(err.message);
      return null;
    }
  };

  // Función para crear un nuevo CV
  const addCv = async (cv) => {
    try {
      const { data } = await createCv(cv);
      // Opcionalmente, puedes actualizar el estado local
      setCvs((prevCvs) => [...prevCvs, data]);
      return data;
    } catch (err) {
      console.error("Error al crear el CV:", err);
      setError(err.message);
      throw err; // Lanzar el error para manejarlo fuera del contexto si es necesario
    }
  };

  // Función para eliminar un CV por ID
  const removeCv = async (cvId) => {
    try {
      await deleteCv(cvId);
      // Opcionalmente, puedes actualizar el estado local
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.cvId !== cvId));
    } catch (err) {
      console.error(`Error al eliminar el CV con ID ${cvId}:`, err);
      setError(err.message);
      throw err; // Lanzar el error para manejarlo fuera del contexto
    }
  };

  // Valor proporcionado por el contexto
  const value = {
    cvs, // Lista de CVs
    loading, // Estado de carga
    error, // Error en la operación
    fetchAllCvs, // Función para obtener todos los CVs
    fetchCvById, // Función para obtener un CV por ID
    addCv, // Función para crear un nuevo CV
    removeCv, // Función para eliminar un CV
  };

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
};
