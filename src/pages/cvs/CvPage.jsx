import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Button } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useCv } from "../../context/CvContext";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import CVModal from "./CVModal";

function CvPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCV, setEditingCV] = useState(null);
  const { cvs, loading, error, fetchCVs, removeCV } = useCv();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const columns = [
    { name: "ID", uid: "cvId", sortable: true },
    { name: "Usuario", uid: "idUser", sortable: true },
    { name: "Especialidad", uid: "speciality", sortable: true },
    { name: "Descripción", uid: "descriptioncv", sortable: false },
    { name: "Acciones", uid: "actions", sortable: false },
  ];

  const initialVisibleColumns = [
    "cvId",
    "idUser",
    "speciality",
    "descriptioncv",
    "actions",
  ];

  useEffect(() => {
    fetchCVs();
  }, [refreshTrigger]); // Solo se ejecuta cuando refreshTrigger cambia

  const renderCell = (cv, columnKey) => {
    switch (columnKey) {
      case "actions":
        return (
          <div className="flex justify-center gap-2">
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onPress={() => handleEdit(cv)}
            >
              <FaEdit className="text-primary" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              color="danger"
              onPress={() => handleDelete(cv.cvId)}
            >
              <FaTrash className="text-danger" />
            </Button>
          </div>
        );
      default:
        return cv[columnKey] || "N/A";
    }
  };

  const handleCreate = () => {
    setEditingCV(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCV(null);
    // Refrescar los datos solo cuando se cierra el modal después de una operación exitosa
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEdit = (cv) => {
    setEditingCV(cv);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este CV?",
    );
    if (confirm) {
      await removeCV(id);
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  // Asegurarse de que cvs es un array antes de mapearlo
  const transformedCVs = Array.isArray(cvs)
    ? cvs.map((cv) => ({
        ...cv,
        id: cv.cvId,
      }))
    : [];

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gestión de CVs</h1>
          </div>
          <div className="text-center py-4">Cargando...</div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de CVs</h1>
        </div>

        {error && (
          <div className="text-red-500">Error al cargar los CVs: {error}</div>
        )}

        <CustomTable
          elements={transformedCVs}
          name="CVs"
          columns={columns}
          initialVisibleColumns={initialVisibleColumns}
          handleCreate={handleCreate}
          renderCell={renderCell}
          filterProperty="speciality"
          keyField="cvId"
        />

        <CVModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingCV={editingCV}
        />
      </div>
    </DefaultLayout>
  );
}

export default CvPage;
