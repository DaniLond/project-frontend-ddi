import React, { useEffect, useState, useCallback, memo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useCv } from "../../context/CvContext";
import { Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import CustomTable from "../../components/CustomTable";
import { CvModal } from "./CvModal";

// Memoize the action button component
const ActionButton = memo(({ onEdit, cv }) => (
  <div className="flex justify-center gap-2">
    <Button
      isIconOnly
      radius="full"
      size="sm"
      variant="light"
      onPress={() => onEdit(cv)}
    >
      <FaEdit className="text-primary" />
    </Button>
  </div>
));

function AdminCvPage() {
  const { fetchAllCvs } = useCv();
  const [cvs, setCvs] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);

  // Memoize fetch function
  const fetchCvs = useCallback(async () => {
    const data = await fetchAllCvs();
    setCvs(data || []);
  }, [fetchAllCvs]);

  useEffect(() => {
    fetchCvs();
  }, [fetchCvs]);

  const handleEdit = useCallback((cv) => {
    setSelectedCv(cv);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedCv(null);
    // Refresh the CVs list after closing the modal
    fetchCvs();
  }, [fetchCvs]);

  const handleCreate = useCallback(() => {
    setSelectedCv(null);
    setModalOpen(true);
  }, []);

  // Memoize transformed CVs
  const transformedCvs = React.useMemo(
    () =>
      cvs?.map((cv) => ({
        ...cv,
        id: cv.cvId,
      })) || [],
    [cvs],
  );

  const columns = React.useMemo(
    () => [
      { name: "ID", uid: "cvId", sortable: true },
      { name: "Usuario", uid: "idUser", sortable: true },
      { name: "Especialidad", uid: "speciality", sortable: true },
      { name: "Descripción", uid: "descriptioncv", sortable: true },
      { name: "Acciones", uid: "actions" },
    ],
    [],
  );

  const renderCell = useCallback(
    (cv, columnKey) => {
      switch (columnKey) {
        case "cvId":
          return cv.cvId;
        case "idUser":
          return cv.idUser;
        case "speciality":
          return cv.speciality;
        case "descriptioncv":
          return cv.descriptioncv;
        case "actions":
          return <ActionButton onEdit={handleEdit} cv={cv} />;
        default:
          return null;
      }
    },
    [handleEdit],
  );

  const Modal = useCallback(
    () => (
      <CvModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cvToEdit={selectedCv}
      />
    ),
    [isModalOpen, handleCloseModal, selectedCv],
  );

  return (
    <DefaultLayout>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-2xl font-bold">Currículums</h2>
          <Button onPress={handleCreate}>Crear CV</Button>
        </div>
      </div>

      <CustomTable
        elements={transformedCvs}
        name="CVs"
        columns={columns}
        initialVisibleColumns={[
          "cvId",
          "idUser",
          "speciality",
          "descriptioncv",
          "actions",
        ]}
        renderCell={renderCell}
        filterProperty="speciality"
        Modal={Modal}
      />
    </DefaultLayout>
  );
}

export default AdminCvPage;
