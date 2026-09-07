import { useNavigate } from "react-router-dom";


import { authRepository } from "../repositories/authRepository";
import NavBar from "../components/NavBar";


function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();


  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };


  return (
    <>
      <NavBar userName={user?.name ?? "Invitado"} />

      <main>
        <h1>Registro de Entrevistas Académicas</h1>


        {user ? (
          <>
            <p>Bienvenido, {user.name}</p>
            <p>Usuario: {user.username}</p>
            <p>Rol: {user.role}</p>


            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>No existe una sesión activa.</p>
        )}
      </main>
    </>
  );
}


export default HomePage;
