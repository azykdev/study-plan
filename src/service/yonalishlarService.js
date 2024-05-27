import axios from "./axios";

export const YonalishlarService = {
  getAll() {
    return axios.get("/oquv-bolimi-yonalishlar");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-yonalishlar/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-yonalishlar", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-yonalishlar/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-yonalishlar/${id}`);
  },
};