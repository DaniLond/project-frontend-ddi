import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import User from "./pages/user/UserPage";
import Role from "./pages/role/RolesPage";
import AdminCv from "./pages/cvs/CvPage";
import Treatmet from "./pages/treatment/TreatmentPage";
import PetPage from "./pages/pet/PetPage";
import PermissionPage from "./pages/per/PermissionPage";
import Appointment from "./pages/appointment/AppointmentPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { UserProvider } from "./context/UserContext";
import { RoleProvider } from "./context/RoleContext";
import { CvProvider } from "./context/CvContext";
import { TreatmentProvider } from "./context/TreatmentContext";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { PetProvider } from "./context/PetContext";
import { PermissionProvider } from "./context/PermissionContext";
import { TreatmentProvider } from "./context/TreatmentContext";
import MedicalHistory from "./pages/medicalHistory/MedicalHistoryPage";
import { MedicalHistoryProvider } from "./context/MedicalHistoryContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppointmentProvider>
          <PetProvider>
            <PermissionProvider>
              <TreatmentProvider>
                <MedicalHistoryProvider>
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
                            <Route path="/appointment" element={<Appointment />} />
                            <Route
                              path="/medicalHistory"
                              element={<MedicalHistory />}
                            />
                            </Route>
                            <Route
                              element={
                                <ProtectedRoute allowedRoles={["ROLE_Admin"]} />
                              }
                            >
                              <Route path="/pets" element={<PetPage />} />
                            </Route>
                            <Route
                              element={
                                <ProtectedRoute allowedRoles={["ROLE_Admin"]} />
                              }
                            >
                              <Route
                                path="/permissions"
                                element={<PermissionPage />}
                              />
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
                  </BrowserRouter>
                </MedicalHistoryProvider>
              </TreatmentProvider>
            </PermissionProvider>
          </PetProvider>
        </AppointmentProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
