import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials } from "../../types/auth";
import "./LoginForm.css";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}


function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();


    const normalizedUsername = username.trim();


    if (!normalizedUsername || !password) {
      return;
    }


    onSubmit({
      username: normalizedUsername,
      password,
    });
  };


  return (
     <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-form__title">Iniciar sesión</h1>
      <p className="login-form__description">Ingresa tus credenciales para continuar.</p>


      <div className="login-form__field">
        <label className="login-form__label" htmlFor="username">Usuario</label>


        <input
          className="login-form__input"
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Ingresa tu usuario"
          autoComplete="username"
          required
        />
      </div>


      <div className="login-form__field">
        <label className="login-form__label" htmlFor="password">Contraseña</label>


        <input
          className="login-form__input"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingrese su contraseña"
          autoComplete="current-password"
          required
        />
      </div>


      {error && (
       <p className="login-form__error" role="alert" aria-live="polite">
          {error}
        </p>
      )}


      <button className="login-form__button" type="submit">Ingresar</button>
    </form>
  );
}


export default LoginForm;
