import React, { useState, useEffect } from "react";
import AuthService from "../../../../servicios/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Validador from "../utilidades/validador/Validador";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validations, setValidations] = useState({
    email: [],
    password: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/privado");
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;

    const validadorEmail = new Validador(email);
    const validadorPassword = new Validador(password);

    const emailValidation = validadorEmail
      .isNotEmpty("El email es obligatorio")
      .isEmail("Formato de email inválido").result;
    const passwordValidation = validadorPassword
      .isNotEmpty("La contraseña es obligatoria")
      .isLength(20, "La contraseña es muy larga (máx 20)").result;

    if (emailValidation.length || passwordValidation.length) {
      isValid = false;
      setValidations({
        email: emailValidation,
        password: passwordValidation,
      });
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await AuthService.login(email, password);
      navigate("/privado");
    } catch (error) {
      alert("Se ha producido un error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div>{validations.email.join(", ")}</div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div>{validations.password.join(", ")}</div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
