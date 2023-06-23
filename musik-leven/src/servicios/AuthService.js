import axios from "../interceptor/Interceptor";

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await axios.get("http://localhost:3000/usuarios", { params: { email, password } });
            if (response.data.length > 0) {
                sessionStorage.setItem("token", "fakeToken");
                return response.data[0];
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
            // Verificar si el correo electrónico ya está en uso
            const existingUserResponse = await axios.get("http://localhost:3000/usuarios", { params: { email: user.email } });
            if (existingUserResponse.data.length > 0) {
                throw new Error("Este correo electrónico ya está en uso");
            }
            const response = await axios.post("http://localhost:3000/usuarios", user);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}