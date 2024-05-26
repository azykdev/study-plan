import axios from "./axios";

export const BelgilanishlarService = {
  getAll() {
    return axios.get("/belgilanishi");
  },
  get(id) {
    return axios.get(`/belgilanishi/${id}`);
  },
  create(data) {
    return axios.post("/belgilanishi", data);
  },
  update(id, data) {
    return axios.put(`/belgilanishi/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/belgilanishi/${id}`);
  },
};