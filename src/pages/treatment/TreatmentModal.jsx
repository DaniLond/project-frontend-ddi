import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useTreatments } from "../../context/TreatmentContext";

const TreatmentModal = ({
  isOpen,
  onClose,
  editingTreatment = null,
  appointment = null,
}) => {
  const { addTreatment, editTreatment } = useTreatments();
  const isEditing = Boolean(editingTreatment);

  const initialState = {
    id: "",
    descriptiont: "",
    dosage: "",
    frequency: "",
    dateStart: "",
    dateFinish: "",
    appointmentId: "",
    petId: "",
    typeTreatment: "",
    specifications: [{ key: "", value: "" }],
    notes: "",
  };

  const [treatment, setTreatment] = useState(initialState);

  useEffect(() => {
    if (editingTreatment) {
      const formattedTreatment = {
        ...editingTreatment,
        appointmentId: editingTreatment.appointmentId || "",
        typeTreatment: editingTreatment.typeTreatment || "",
        specifications: editingTreatment.specifications
          ? Object.entries(editingTreatment.specifications).map(
              ([key, value]) => ({ key, value }),
            )
          : [{ key: "", value: "" }],
        notes: editingTreatment.notes || "",
      };
      setTreatment(formattedTreatment);
    } else if (appointment) {
      setTreatment((prev) => ({
        ...prev,
        appointmentId: appointment.idAppointment,
        petId: appointment.pet.id,
      }));
    } else {
      setTreatment(initialState);
    }
  }, [editingTreatment, appointment, isOpen]);

  const handleChange = (name, value, index = null) => {
    // Modificación clave: manejo más preciso de las especificaciones
    if (name.startsWith("specifications")) {
      setTreatment((prev) => {
        // Crear una copia profunda de las especificaciones
        const updatedSpecs = [...prev.specifications];

        // Si es para agregar una nueva especificación
        if (index === null) {
          updatedSpecs.push({ key: "", value: "" });
        }
        // Si es para modificar una especificación existente
        else {
          // Determinar si se está modificando la clave o el valor
          const field = name.includes("key") ? "key" : "value";
          updatedSpecs[index][field] = value;
        }

        return {
          ...prev,
          specifications: updatedSpecs,
        };
      });
    }
    // Manejo de campos normales
    else {
      setTreatment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const generateTreatmentId = () => {
    return "TRT-" + Date.now();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const treatmentData = {
        ...treatment,
        appointmentId: treatment.appointmentId.trim() || null,
        specifications: treatment.specifications.reduce((acc, spec) => {
          if (spec.key.trim()) {
            acc[spec.key] = spec.value;
          }
          return acc;
        }, {}),
      };

      if (isEditing) {
        await editTreatment(treatment.id, treatmentData);
      } else {
        const newTreatment = {
          ...treatmentData,
          id: generateTreatmentId(),
        };
        await addTreatment(newTreatment);
      }
      onClose();
      setTreatment(initialState);
    } catch (error) {
      console.error(
        `Error al ${isEditing ? "actualizar" : "crear"} el tratamiento:`,
        error,
      );
      alert(`Error al ${isEditing ? "actualizar" : "crear"} el tratamiento`);
    }
  };

  const handleClose = () => {
    setTreatment(initialState);
    onClose();
  };

  const modalKey = isEditing ? `edit-${treatment.id}` : "create-treatment";

  return (
    <Modal key={modalKey} isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalContent key={`content-${modalKey}`}>
        {() => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {isEditing ? "Editar Tratamiento" : "Crear Nuevo Tratamiento"}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  key="input-description"
                  label="Descripción"
                  placeholder="Ingrese la descripción"
                  value={treatment.descriptiont}
                  onChange={(e) => handleChange("descriptiont", e.target.value)}
                  required
                />
                <Input
                  key="input-dosage"
                  label="Dosis"
                  placeholder="Ingrese la dosis"
                  value={treatment.dosage}
                  onChange={(e) => handleChange("dosage", e.target.value)}
                  required
                />
                <Input
                  key="input-frequency"
                  label="Frecuencia"
                  placeholder="Ingrese la frecuencia"
                  value={treatment.frequency}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                  required
                />
                <Input
                  key="input-dateStart"
                  type="date"
                  label="Fecha de inicio"
                  value={treatment.dateStart}
                  onChange={(e) => handleChange("dateStart", e.target.value)}
                  required
                />
                <Input
                  key="input-dateFinish"
                  type="date"
                  label="Fecha de finalización"
                  value={treatment.dateFinish}
                  onChange={(e) => handleChange("dateFinish", e.target.value)}
                />
                <Input
                  key="input-appointment"
                  label="Id de la cita médica"
                  placeholder="Ingrese el ID de la cita médica"
                  value={treatment.appointmentId || ""}
                  onChange={(e) =>
                    handleChange("appointmentId", e.target.value)
                  }
                  readOnly={Boolean(appointment)}
                />
                <Input
                  key="input-pet"
                  label="ID de Mascota"
                  placeholder="Ingrese el ID de la mascota"
                  value={treatment.petId}
                  onChange={(e) => handleChange("petId", e.target.value)}
                  readOnly={Boolean(appointment)}
                  required
                />
                <Input
                  key="input-type"
                  label="Tipo de Tratamiento"
                  placeholder="Ingrese el tipo de tratamiento"
                  value={treatment.typeTreatment}
                  onChange={(e) =>
                    handleChange("typeTreatment", e.target.value)
                  }
                  required
                />
                <Input
                  key="input-notes"
                  label="Notas"
                  placeholder="Ingrese las notas"
                  value={treatment.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />

                <Spacer y={2} />
                <h3 className="text-lg font-semibold">Especificaciones</h3>
                <div className="flex flex-wrap gap-4">
                  {treatment.specifications.map((spec, index) => (
                    <div
                      key={`spec-${index}`}
                      className="w-full md:w-[calc(50%-1rem)] flex gap-2"
                    >
                      <Input
                        label={`Clave ${index + 1}`}
                        placeholder="Clave"
                        value={spec.key}
                        onChange={(e) =>
                          handleChange(
                            `specifications[${index}].key`,
                            e.target.value,
                            index,
                          )
                        }
                      />
                      <Input
                        label={`Valor ${index + 1}`}
                        placeholder="Valor"
                        value={spec.value}
                        onChange={(e) =>
                          handleChange(
                            `specifications[${index}].value`,
                            e.target.value,
                            index,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => handleChange("specifications", null)}
                >
                  Agregar Especificación
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                {isEditing ? "Guardar Cambios" : "Crear Tratamiento"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TreatmentModal;
