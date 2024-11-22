import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useRole } from "../../context/RoleContext";
import { Button } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RoleModal } from "./RoleModal";
import CustomTable from "../../components/CustomTable";

function RolePage() {
  const { roles, fetchAllRoles, removeRole } = useRole();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleEdit = (role) => {
    setRoleToEdit(role);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setRoleToEdit(null);
    fetchAllRoles();
  };

  const handleDelete = async (id) => {
    await removeRole(id);
    fetchAllRoles();
  };

  // Transformar los roles para incluir id
  const transformedRoles =
    roles?.map((role) => ({
      ...role,
      id: role.roleId,
    })) || [];

  const columns = [
    { name: "ID", uid: "roleId", sortable: true },
    { name: "NOMBRE", uid: "nameRole", sortable: true },
    { name: "ACCIONES", uid: "actions" },
  ];

  const renderCell = (role, columnKey) => {
    switch (columnKey) {
      case "roleId":
        return role.roleId;
      case "nameRole":
        return role.nameRole;
      case "actions":
        return (
          <div className="flex justify-center gap-2">
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onPress={() => handleEdit(role)}
            >
              <FaEdit className="text-primary" />
            </Button>
            {/* <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              color="danger"
              onPress={() => handleDelete(role.roleId)}
            >
              <FaTrash className="text-danger" />
            </Button> */}
          </div>
        );
      default:
        return null;
    }
  };

  const Modal = () => (
    <RoleModal
      isOpen={isEditModalOpen}
      onClose={handleCloseModal}
      roleToEdit={roleToEdit}
    />
  );

  return (
    <DefaultLayout>
      <div className="p-2">
        <h2 className="text-gray-800 text-2xl font-bold">Roles</h2>
      </div>

      <CustomTable
        elements={transformedRoles}
        name="roles"
        columns={columns}
        initialVisibleColumns={["roleId", "nameRole", "actions"]}
        renderCell={renderCell}
        filterProperty="nameRole"
        Modal={Modal}
      />
    </DefaultLayout>
  );
}

export default RolePage;
