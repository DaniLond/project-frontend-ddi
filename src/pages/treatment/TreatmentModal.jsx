import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useTreatments } from "../../context/TreatmentContext";

const TreatmentModal = ({ isOpen, onClose }) => {
  const { addTreatment } = useTreatments();

  const [treatment, setTreatment] = useState({
    idTrataments: "", // Añadido para coincidir con el backend
    descriptiont: "",
    dosage: "",
    frequency: "",
    dateStart: "",
    dateFinish: "",
    petId: "",
  });

  const handleChange = (name, value) => {
    setTreatment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateTreatmentId = () => {
    // Generar un ID único para el tratamiento
    return "TRT-" + Date.now();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTreatment = {
      ...treatment,
      idTrataments: generateTreatmentId(), // Generar ID único
      dateStart: treatment.dateStart, // Asegurarse que la fecha esté en formato correcto
      dateFinish: treatment.dateFinish, // Asegurarse que la fecha esté en formato correcto
    };

    try {
      await addTreatment(newTreatment);
      onClose();
    } catch (error) {
      console.error("Error al crear el tratamiento:", error);
      alert("Error al crear el tratamiento");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Crear Nuevo Tratamiento
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Descripción"
                placeholder="Ingrese la descripción"
                value={treatment.descriptiont}
                onChange={(e) => handleChange("descriptiont", e.target.value)}
                required
              />
              <Input
                label="Dosis"
                placeholder="Ingrese la dosis"
                value={treatment.dosage}
                onChange={(e) => handleChange("dosage", e.target.value)}
                required
              />
              <Input
                label="Frecuencia"
                placeholder="Ingrese la frecuencia"
                value={treatment.frequency}
                onChange={(e) => handleChange("frequency", e.target.value)}
                required
              />
              <Input
                type="date"
                label="Fecha de inicio"
                value={treatment.dateStart}
                onChange={(e) => handleChange("dateStart", e.target.value)}
                required
              />
              <Input
                type="date"
                label="Fecha de finalización"
                value={treatment.dateFinish}
                onChange={(e) => handleChange("dateFinish", e.target.value)}
              />
              <Input
                label="ID de Mascota"
                placeholder="Ingrese el ID de la mascota"
                value={treatment.petId}
                onChange={(e) => handleChange("petId", e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              Crear Tratamiento
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TreatmentModal;
