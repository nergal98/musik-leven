import React, { useState } from "react";
import AuthService from "../../../../servicios/AuthService";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Usamos useNavigate

  const handleSignUp = async () => {
    const user = { name, email, gender, password };
    try {
      await AuthService.signup(user);
      console.log("Registro exitoso!");
      navigate("/login"); // Navegamos al login después de un registro exitoso
    } catch (error) {
      console.log("Se ha producido un error", error);
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
