import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import { authRepository } from "../../repositories/authRepository";
import type { LoginCredentials } from "../../types/auth";
import "../../components/auth/LoginForm.css";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  if (authRepository.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (credentials: LoginCredentials) => {
    setError("");

    const user = authRepository.login(credentials);

    if (!user) {
      setError("El usuario o la contraseña son incorrectos.");
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <main className="login-page">
      <section className="login-page__intro" aria-labelledby="login-page-title">
        <img
          className="login-page__school-logo"
          src="/logo-escudo.webp"
          alt="Escudo del Colegio Don Bosco Sucre"
        />
        <p className="login-page__school">Colegio Don Bosco Sucre</p>
        <h2 id="login-page-title">Registro de Entrevistas Académicas</h2>
        <p className="login-page__copy">
          Gestiona y consulta las solicitudes de entrevistas de forma ordenada.
        </p>
      </section>

      <LoginForm error={error} onSubmit={handleLogin} />
    </main>
  );
}

export default LoginPage;
