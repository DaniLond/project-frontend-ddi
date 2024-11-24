import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Button } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTreatments } from "../../context/TreatmentContext";
import TreatmentModal from "./TreatmentModal";

function TreatmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);

  const { treatments, loading, error, fetchTreatments, removeTreatment } =
    useTreatments();

  const columns = [
    { name: "ID", uid: "idTrataments", sortable: true },
    { name: "Mascota", uid: "petId", sortable: true },
    { name: "Cita", uid: "appoinmentIdAppointment", sortable: true },
    { name: "Inicio", uid: "dateStart", sortable: true },
    { name: "Finalización", uid: "dateFinish", sortable: true },
    { name: "Frecuencia", uid: "frequency", sortable: true },
    { name: "Dosis", uid: "dosage", sortable: true },
    { name: "Descripción", uid: "descriptiont", sortable: false },
    { name: "Acciones", uid: "actions", sortable: false },
  ];

  useEffect(() => {
    fetchTreatments();
  }, []);

  const renderCell = (treatment, columnKey) => {
    switch (columnKey) {
      case "actions":
        return (
          <div className="flex justify-center gap-2">
            <Button size="sm" onClick={() => handleEdit(treatment)}>
              Editar
            </Button>
            <Button
              size="sm"
              color="error"
              onClick={() => handleDelete(treatment.idTrataments)}
            >
              Eliminar
            </Button>
          </div>
        );
      default:
        return treatment[columnKey] || "N/A";
    }
  };

  const handleCreate = () => {
    setEditingTreatment(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTreatment(null);
  };

  const handleEdit = (treatment) => {
    setEditingTreatment(treatment);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este tratamiento?",
    );
    if (confirm) {
      removeTreatment(id);
    }
  };

  const transformedTreatments =
    treatments?.map((treatment) => ({
      ...treatment,
      id: treatment.idTrataments,
    })) || [];

  return (
    <DefaultLayout>
      <div className="p-2">
        <h2 className="text-gray-800 text-2xl font-bold">
          Gestión de Tratamientos
        </h2>
      </div>
      <CustomTable
        elements={transformedTreatments}
        name="Tratamientos"
        columns={columns}
        initialVisibleColumns={[
          "idTrataments",
          "petId",
          "appoinmentIdAppointment",
          "dateStart",
          "dateFinish",
          "frequency",
          "dosage",
          "actions",
        ]}
        handleCreate={handleCreate}
        renderCell={renderCell}
        filterProperty="descriptiont"
        additionalFilter={{
          label: "Filtrar por mascota",
          field: "petId",
        }}
      />
      <TreatmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTreatment={editingTreatment}
      />
    </DefaultLayout>
  );
}

export default TreatmentsPage;
