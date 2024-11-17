import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import User from "./pages/user/UserPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { UserProvider } from "./context/UserContext";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
            <Route element={<ProtectedRoute allowedRoles={["ROLE_Admin"]} />}>
              <Route path="/users" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
