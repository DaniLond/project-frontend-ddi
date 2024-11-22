import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useRole } from "../../context/RoleContext";
import { useForm } from "react-hook-form";

export const RoleModal = ({ isOpen, onClose, roleToEdit }) => {
  const { createNewRole, updateRoleData } = useRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      nameRole: "",
    },
  });

  useEffect(() => {
    if (roleToEdit) {
      setValue("nameRole", roleToEdit.nameRole);
    } else {
      reset();
    }
  }, [roleToEdit, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (roleToEdit) {
        await updateRoleData(roleToEdit.roleId, data);
      } else {
        await createNewRole(data);
      }
      onClose();
      reset();
    } catch (error) {
      console.error("Error al enviar el rol:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {roleToEdit ? "Editar Rol" : "Crear Nuevo Rol"}
          </ModalHeader>
          <ModalBody>
            <Input
              label="Nombre del Rol"
              {...register("nameRole", { required: "Este campo es requerido" })}
              errorMessage={errors.nameRole?.message}
              value={roleToEdit?.nameRole}
              onChange={(e) => setValue("nameRole", e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              {roleToEdit ? "Actualizar" : "Crear"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
