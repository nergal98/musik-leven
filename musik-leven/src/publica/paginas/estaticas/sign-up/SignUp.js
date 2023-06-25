import React, { useState } from "react";
import AuthService from "../../../../servicios/AuthService";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Validador from "../utilidades/validador/Validador";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const [validations, setValidations] = useState({
    name: [],
    email: [],
    gender: [],
    password: [],
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    const validadorName = new Validador(name);
    const validadorEmail = new Validador(email);
    const validadorGender = new Validador(gender);
    const validadorPassword = new Validador(password);

    const nameValidation = validadorName
      .isNotEmpty("El nombre es obligatorio")
      .isLength(50, "El nombre es muy largo (máx 50)").result;
    const emailValidation = validadorEmail
      .isNotEmpty("El email es obligatorio")
      .isEmail("Formato de email inválido").result;
    const genderValidation = validadorGender.isNotEmpty(
      "El género es obligatorio"
    ).result;
    const passwordValidation = validadorPassword
      .isNotEmpty("La contraseña es obligatoria")
      .isLength(20, "La contraseña es muy larga (máx 20)").result;

    if (
      nameValidation.length ||
      emailValidation.length ||
      genderValidation.length ||
      passwordValidation.length
    ) {
      isValid = false;
      setValidations({
        name: nameValidation,
        email: emailValidation,
        gender: genderValidation,
        password: passwordValidation,
      });
    }

    return isValid;
  };

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
      <div>{validations.name.join(", ")}</div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div>{validations.email.join(", ")}</div>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <div>{validations.gender.join(", ")}</div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div>{validations.password.join(", ")}</div>

      <button onClick={handleSignUp}>SignUp</button>
    </div>
  );
};

export default SignUp;
