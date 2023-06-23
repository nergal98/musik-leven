import React, { useState, useEffect } from "react";
import AuthService from "../../../../servicios/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/privado");
    }
  }, [navigate]);

  const handleLogin = async () => {
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
