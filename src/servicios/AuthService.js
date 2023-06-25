import axios from "../interceptor/Interceptor";
import Usuario from "./modelo/Usuario";

const BASE_URL = "http://localhost:3000";

export default class AuthService {
  static async login(email, password) {
    try {
      const response = await axios.get(`${BASE_URL}/usuarios`, {
        params: { email, password },
      });
      if (response.data.length > 0) {
        const user = new Usuario(
          response.data[0].name,
          response.data[0].email,
          response.data[0].gender,
          response.data[0].password,
          response.data[0].id
        );
        sessionStorage.setItem("token", "fakeToken");
        return user;
      } else {
        throw new Error("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      throw error;
    }
  }
  static logout() {
    sessionStorage.removeItem("token");
  }

  static isAuthenticated() {
    return sessionStorage.getItem("token") !== null;
  }

  static async signup(user) {
    try {
      const existingUserResponse = await axios.get(`${BASE_URL}/usuarios`, {
        params: { email: user.email },
      });
      if (existingUserResponse.data.length > 0) {
        throw new Error("Este correo electrónico ya está en uso");
      }

      const newUser = new Usuario(
        user.name,
        user.email,
        user.gender,
        user.password
      );
      const response = await axios.post(`${BASE_URL}/usuarios`, newUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
