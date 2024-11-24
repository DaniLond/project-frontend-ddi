import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import User from "./pages/user/UserPage";
import PetPage from "./pages/pet/PetPage";
import PermissionPage from "./pages/per/PermissionPage";
import Appointment from "./pages/appointment/AppointmentPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { UserProvider } from "./context/UserContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { PetProvider } from "./context/PetContext";
import { PermissionProvider } from "./context/PermissionContext";
import { TreatmentProvider } from "./context/TreatmentContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppointmentProvider>
          <PetProvider>
            <PermissionProvider>
              <TreatmentProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/unauthorized"
                      element={<UnauthorizedPage />}
                    />

                    {/* Rutas protegidas para todos los usuarios autenticados */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/home" element={<Home />} />
                      <Route path="/appointment" element={<Appointment />} />
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
                      <Route path="/pets" element={<PetPage />} />
                    </Route>
                    <Route
                      element={<ProtectedRoute allowedRoles={["ROLE_Admin"]} />}
                    >
                      <Route path="/permissions" element={<PermissionPage />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </TreatmentProvider>
            </PermissionProvider>
          </PetProvider>
        </AppointmentProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
