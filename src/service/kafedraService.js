import axios from "./axios";

export const KafedraService = {
  getAll() {
    return axios.get("/oquv-bolimi-kafedralar");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-kafedralar/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-kafedralar", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-kafedralar/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-kafedralar/${id}`);
  },
};