import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Button } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTreatments } from "../../context/TreatmentContext";
import TreatmentModal from "./TreatmentModal";

function TreatmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    treatments,
    loading,
    error,
    fetchTreatments,
    addTreatment,
    editTreatment,
    removeTreatment,
  } = useTreatments();

  const columns = [
    { name: "ID", uid: "idTrataments", sortable: true },
    { name: "Mascota", uid: "petId", sortable: true },
    { name: "Inicio", uid: "dateStart", sortable: true },
    { name: "Finalización", uid: "dateFinish", sortable: true },
    { name: "Descripción", uid: "descriptiont", sortable: false },
    { name: "Acciones", uid: "actions", sortable: false },
  ];

  useEffect(() => {
    fetchTreatments();
    console.log("Tratamientos después de fetch:", treatments);
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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (treatment) => {
    console.log("Editar tratamiento:", treatment);
    // Aquí puedes abrir un modal o redirigir a una página de edición
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este tratamiento?",
    );
    if (confirm) {
      removeTreatment(id);
    }
  };

  return (
    <DefaultLayout>
      <div className="p-2">
        <h2 className="text-gray-800 text-2xl font-bold">
          Gestión de Tratamientos
        </h2>
      </div>
      <CustomTable
        elements={treatments}
        name="Tratamientos"
        columns={columns}
        initialVisibleColumns={[
          "idTrataments",
          "petId",
          "dateStart",
          "actions",
        ]}
        handleCreate={handleCreate}
        renderCell={renderCell}
        filterProperty="description"
        additionalFilter={{
          label: "Filtrar por mascota",
          field: "petId",
        }}
      />
      <TreatmentModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </DefaultLayout>
  );
}

export default TreatmentsPage;
