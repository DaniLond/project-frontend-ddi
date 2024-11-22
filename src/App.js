import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import User from "./pages/user/UserPage";
import Role from "./pages/role/RolesPage";
import AdminCv from "./pages/cv/AdminCvPage";
import Treatmet from "./pages/treatment/TreatmentPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { UserProvider } from "./context/UserContext";
import { RoleProvider } from "./context/RoleContext";
import { CvProvider } from "./context/CvContext";
import { TreatmentProvider } from "./context/TreatmentContext";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RoleProvider>
          <CvProvider>
            <TreatmentProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />

                  {/* Rutas protegidas para todos los usuarios autenticados */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                  </Route>

                  {/* Rutas protegidas solo para administradores */}
                  <Route
                    element={<ProtectedRoute allowedRoles={["ROLE_Admin"]} />}
                  >
                    <Route path="/users" element={<User />} />
                  </Route>

                  <Route
                    element={<ProtectedRoute allowedRoles={["ROLE_Admin"]} />}
                  >
                    <Route path="/api/roles" element={<Role />} />
                  </Route>

                  <Route
                    element={<ProtectedRoute allowedRoles={["ROLE_Admin"]} />}
                  >
                    <Route path="/api/cvs" element={<AdminCv />} />
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute
                        allowedRoles={["ROLE_Admin", "ROLE_Veterinary"]}
                      />
                    }
                  >
                    <Route path="/api/treatments" element={<Treatmet />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TreatmentProvider>
          </CvProvider>
        </RoleProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
