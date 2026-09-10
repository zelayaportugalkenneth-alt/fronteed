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
        <div className="login-page__badge">DB</div>
        <p className="login-page__school">Colegio Don Bosco Sucre</p>
        <h2 id="login-page-title">Registro de Entrevistas Académicas</h2>
        <p className="login-page__copy">
          Una forma sencilla, ordenada y moderna de gestionar las entrevistas académicas.
        </p>
        <div className="login-page__line" aria-hidden="true" />
        <p className="login-page__welcome">Bienvenido al sistema</p>
      </section>

      <LoginForm error={error} onSubmit={handleLogin} />
    </main>
  );
}

export default LoginPage;
