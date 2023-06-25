import axios from "../interceptor/Interceptor";
import Evento from "./modelo/Evento";

const BASE_URL = "http://localhost:3000";

export default class EventService {
  static async getAllEvents() {
    try {
      const response = await axios.get(`${BASE_URL}/eventos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getEventById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createEvent(event) {
    try {
      const newEvent = new Evento(event); 
      const response = await axios.post(`${BASE_URL}/eventos`, newEvent);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateEvent(event) {
    try {
      const updatedEvent = new Evento(event); 
      const response = await axios.put(
        `${BASE_URL}/eventos/${updatedEvent.id}`,
        updatedEvent
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteEvent(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/eventos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}