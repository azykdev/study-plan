import axios from "./axios";

export const yonalishlarService = {
  getAll() {
    return axios.get("/yonalishlar");
  },
  get(id) {
    return axios.get(`/yonalishlar/${id}`);
  },
  create(data) {
    return axios.post("/yonalishlar", data);
  },
  update(id, data) {
    return axios.put(`/yonalishlar/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/yonalishlar/${id}`);
  },
};