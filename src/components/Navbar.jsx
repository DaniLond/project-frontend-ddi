import { useAuth } from "../context/AuthContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  User,
} from "@nextui-org/react";
import { FaHome, FaUsers } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout, hasRole } = useAuth();

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-gray-200">
      <div className="flex items-center justify-center h-16">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                color: "primary",
                name: user?.sub?.[0]?.toUpperCase() || "U",
              }}
              className="transition-transform"
              description={user?.sub}
            />
          </DropdownTrigger>
          <DropdownMenu variant="flat" disabledKeys={["user"]}>
            <DropdownItem
              key={"logout"}
              color="danger"
              onClick={() => logout()}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4">
          <h6 className="text-primary-dark text-sm font-bold px-4">
            PRINCIPAL
          </h6>
          <Link
            to="/home"
            className="text-black hover:text-primary-dark text-sm flex items-center hover:bg-primary-light rounded px-4 py-3 transition-all"
          >
            <FaHome className="w-[18px] h-[18px] mr-4" />
            Inicio
          </Link>
          {hasRole(["ROLE_Admin"]) && (
            <Link
              to="/users"
              className="text-black hover:text-primary-dark text-sm flex items-center hover:bg-primary-light rounded px-4 py-3 transition-all"
            >
              <FaUsers className="w-[18px] h-[18px] mr-4" />
              Usuarios
            </Link>
          )}
          <Link
            to="/appointment"
            className="text-black hover:text-primary-dark text-sm flex items-center hover:bg-primary-light rounded px-4 py-3 transition-all"
          >
            <CgCalendarDates className="w-[18px] h-[18px] mr-4" />
            Citas
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
