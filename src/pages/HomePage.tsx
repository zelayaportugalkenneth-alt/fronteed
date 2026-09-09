import { Navigate, useNavigate } from "react-router-dom";

import { authRepository } from "../repositories/authRepository";
import NavBar from "../components/NavBar";
import ProfessorDashboard from "../components/ProfessorDashboard";
import SecretaryDashboard from "../components/SecretaryDashboard";

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <NavBar userName={user.name} onLogout={handleLogout} />

      {user.role === "SECRETARIA_INFORMACIONES" ? (
        <SecretaryDashboard />
      ) : user.role === "PROFESOR" ? (
        <ProfessorDashboard />
      ) : (
        <main className="role-welcome">
          <p className="eyebrow">Administrador</p>
          <h1>Registro de Entrevistas Académicas</h1>
          <p>Bienvenido, {user.name}.</p>
        </main>
      )}
    </>
  );
}

export default HomePage;
