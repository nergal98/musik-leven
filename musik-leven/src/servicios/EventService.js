import axios from "../interceptor/Interceptor";

export default class EventService {
    static async getAllEvents() {
        try {
            const response = await axios.get("http://localhost:3000/eventos");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getEventById(id) {
        try {
            const response = await axios.get(`http://localhost:3000/eventos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createEvent(event) {
        try {
            const response = await axios.post("http://localhost:3000/eventos", event);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateEvent(event) {
        try {
            const response = await axios.put(`http://localhost:3000/eventos/${event.id}`, event);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteEvent(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/eventos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}