import axios from "./axios";

export const BelgilanishlarService = {
  getAll() {
    return axios.get("/oquv-bolimi-belgilanishi");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-belgilanishi/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-belgilanishi", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-belgilanishi/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-belgilanishi/${id}`);
  },
};