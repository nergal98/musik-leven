import React, { useState } from "react";
import AuthService from "../../../../servicios/AuthService";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (!name || !email || !gender || !password) {
      isValid = false;
      errorMessage = "Todos los campos son requeridos.";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      isValid = false;
      errorMessage = "Por favor introduce una dirección de correo electrónico válida.";
    }

    if (!isValid) {
      alert(errorMessage);
    }

    return isValid;
  }

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    const user = { name, email, gender, password };
    try {
      await AuthService.signup(user);
      console.log("Registro exitoso!");
      navigate("/login");
    } catch (error) {
      alert("Se ha producido un error: " + error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>SignUp</button>
    </div>
  );
};

export default SignUp;