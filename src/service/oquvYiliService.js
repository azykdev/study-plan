import axios from "./axios";

export const OquvYiliService = {
  getAll() {
    return axios.get("/oquv-bolimi-oquv-yillari");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-oquv-yillari/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-oquv-yillari", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-oquv-yillari/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-oquv-yillari/${id}`);
  },
};

