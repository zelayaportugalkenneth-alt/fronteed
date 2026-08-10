import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials } from "../../types/auth";
import "./LoginForm.css";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}


function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();


    const normalizedCarnet = carnet.trim();


    if (!normalizedCarnet || !password) {
      return;
    }


    onSubmit({
      carnet: normalizedCarnet,
      password,
    });
  };


  return (
     <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-form__title">Iniciar sesión</h1>


      <div className="login-form__field">
        <label className="login-form__label" htmlFor="carnet">Carnet de identidad</label>


        <input
          className="login-form__input"
          id="carnet"
          name="carnet"
          type="text"
          value={carnet}
          onChange={(event) => setCarnet(event.target.value)}
          placeholder="Ingrese su carnet"
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
