import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CustomInput from "../../components/CustomInput";
import { useCv } from "../../context/CvContext";

export function CvModal({ isOpen, onClose, cvToEdit }) {
  const [formData, setFormData] = useState({
    cvId: "",
    idUser: "",
    speciality: "",
    descriptioncv: "",
  });
  const [errors, setErrors] = useState({});
  const { createCv, updateCv } = useCv();

  // Memoize form initialization
  const initializeForm = useCallback(() => {
    if (cvToEdit) {
      setFormData(cvToEdit);
    } else {
      setFormData({
        cvId: "",
        idUser: "",
        speciality: "",
        descriptioncv: "",
      });
    }
    setErrors({});
  }, [cvToEdit]);

  useEffect(() => {
    if (isOpen) {
      initializeForm();
    }
  }, [isOpen, initializeForm]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.cvId) newErrors.cvId = "El ID del CV es obligatorio";
    if (!formData.idUser) newErrors.idUser = "El ID del usuario es obligatorio";
    return newErrors;
  }, [formData.cvId, formData.idUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        if (cvToEdit) {
          await updateCv(cvToEdit.cvId, formData);
        } else {
          await createCv(formData);
        }
        onClose();
      } catch (error) {
        console.error("Error al procesar el formulario:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const formFields = [
    {
      name: "cvId",
      label: "ID del CV",
      placeholder: "Ingrese el ID del CV",
      disabled: !!cvToEdit,
    },
    {
      name: "idUser",
      label: "ID del Usuario",
      placeholder: "Ingrese el ID del usuario",
    },
    {
      name: "speciality",
      label: "Especialidad",
      placeholder: "Ingrese la especialidad",
    },
    {
      name: "descriptioncv",
      label: "Descripción",
      placeholder: "Ingrese la descripción",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            {cvToEdit ? "Editar CV" : "Crear CV"}
          </ModalHeader>
          <ModalBody>
            {formFields.map((field) => (
              <CustomInput
                key={field.name}
                type="text"
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                errorMessage={errors[field.name]}
                errors={errors}
                disabled={field.disabled}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancelar
            </Button>
            <Button
              className="bg-primary-dark text-white hover:bg-primary"
              type="submit"
            >
              {cvToEdit ? "Actualizar" : "Crear"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
