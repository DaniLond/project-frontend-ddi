import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useAppointment } from "../../context/AppointmentContext";
import CustomTable from "../../components/CustomTable";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppointmentModal } from "./AppointmentModal";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { es } from "date-fns/locale";
import Alert from "../../components/Alert";

function AppointmentPage() {
  const {
    appointments,
    fetchAppointments,
    removeAppointment,
    errors: appointmentErrors,
  } = useAppointment();
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [visibleErrors, setVisibleErrors] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setVisibleErrors(appointmentErrors);
  }, [appointmentErrors]);

  const canEditAppointment = (appointment) => {
    console.log(user.roles);
    if (user.roles.includes("ROLE_Admin")) return true;
    if (user.roles.includes("ROLE_Veterinary"))
      return appointment.idUser === user.id;
    if (user.roles.includes("ROLE_Owner")) {
      return false;
    }
    return false;
  };

  const handleEdit = (appointment) => {
    setAppointmentToEdit(appointment);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setAppointmentToEdit(null);
  };

  const handleDelete = async (id) => {
    await removeAppointment(id);
  };

  const handleCreateNew = () => {
    setAppointmentToEdit(null);
    setIsEditModalOpen(true);
  };

  const handleCloseAlert = (index) => {
    setVisibleErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };

  const columns = [
    { name: "ID", uid: "idAppointment", sortable: true },
    { name: "FECHA", uid: "dateDates", sortable: true },
    { name: "HORA", uid: "hourapp", sortable: true },
    { name: "MASCOTA", uid: "pet" },
    { name: "ESTADO", uid: "statesTypeStates" },
    { name: "OBSERVACIONES", uid: "observations" },
    { name: "USUARIO", uid: "user" },
    { name: "ACCIONES", uid: "actions" },
  ];

  const visibleColumns = user.roles.includes("ROLE_Owner")
    ? columns.filter((col) => col.uid !== "actions")
    : columns;

  const initialVisibleColumns = [
    "dateDates",
    "hourapp",
    "pet",
    "statesTypeStates",
    "observations",
    "actions",
  ];

  const renderCell = (appointment, columnKey) => {
    switch (columnKey) {
      case "dateDates":
        return format(
          new Date(appointment.dateDates + "T00:00:00"),
          "dd 'de' MMMM, yyyy",
          {
            locale: es,
          },
        );
      case "hourapp":
        return format(new Date(`2000-01-01T${appointment.hourapp}`), "hh:mm a");
      case "pet":
        return appointment.pet.name;
      case "user":
        return appointment.user.name;
      case "statesTypeStates":
        return (
          <span
            className={`badge rounded-full text-background px-2 py-1 ${
              appointment.statesTypeStates === "Scheduled"
                ? "bg-warning"
                : appointment.statesTypeStates === "Completed"
                  ? "bg-success"
                  : appointment.statesTypeStates === "Cancelled"
                    ? "bg-error"
                    : "bg-primary"
            }`}
          >
            {appointment.statesTypeStates}
          </span>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap -2">
            {canEditAppointment(appointment) && (
              <Dropdown className="bg-background border-1 border-primary">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <FaEdit className="text-primary" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  color="primary"
                  variant="bordered"
                  disallowEmptySelection
                >
                  <DropdownItem
                    startContent={<FaEdit />}
                    onClick={() => handleEdit(appointment)}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    startContent={<MdDelete />}
                    className="text-danger"
                    color="danger"
                    onClick={() => handleDelete(appointment.idAppointment)}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        );
      case "observations":
        return (
          <div className="max-w-xs truncate">{appointment[columnKey]}</div>
        );
      default:
        return appointment[columnKey];
    }
  };

  return (
    <DefaultLayout>
      {(visibleErrors || []).map((error, i) => (
        <Alert
          type={true}
          title="Error"
          message={error}
          key={i}
          onClose={() => handleCloseAlert(i)}
        />
      ))}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 text-2xl font-bold">Citas</h2>
        </div>
        <CustomTable
          elements={appointments}
          name="Citas"
          columns={visibleColumns}
          initialVisibleColumns={initialVisibleColumns}
          handleCreate={
            user.roles.includes("ROLE_Owner") ? null : handleCreateNew
          }
          Modal={AppointmentModal}
          renderCell={renderCell}
          filterProperty="idAppointment"
        />
        <AppointmentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          appointmentToEdit={appointmentToEdit}
        />
      </div>
    </DefaultLayout>
  );
}

export default AppointmentPage;
