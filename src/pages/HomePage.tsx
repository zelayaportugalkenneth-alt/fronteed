import { useNavigate } from "react-router-dom";


import { authRepository } from "../repositories/authRepository";
import NavBar from "../components/NavBar";
import SecretaryDashboard from "../components/SecretaryDashboard";


function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();


  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };


  return (
    <>
      <NavBar userName={user?.name ?? "Invitado"} onLogout={handleLogout} />

      {user?.role === "SECRETARIA_INFORMACIONES" ? (
        <SecretaryDashboard />
      ) : (
        <main className="role-welcome">
          <p className="eyebrow">Profesor</p>
          <h1>Registro de Entrevistas Académicas</h1>
          <p>Bienvenido, {user?.name ?? "Invitado"}.</p>
        </main>
      )}
    </>
  );
}


export default HomePage;
