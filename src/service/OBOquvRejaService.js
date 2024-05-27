import axios from "./axios";

export const OBOquvRejaService = {
  getAll() {
    return axios.get("/oquv-bolimi-oquv-reja");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-oquv-reja/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-oquv-reja", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-oquv-reja/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-oquv-reja/${id}`);
  },
};