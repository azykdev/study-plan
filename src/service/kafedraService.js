import axios from "./axios";

export const KafedraService = {
  getAll() {
    return axios.get("/kafedralar");
  },
  get(id) {
    return axios.get(`/kafedralar/${id}`);
  },
  create(data) {
    return axios.post("/kafedralar", data);
  },
  update(id, data) {
    return axios.put(`/kafedralar/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/kafedralar/${id}`);
  },
};