import axios from "./axios";

export const OquvYiliService = {
  getAll() {
    return axios.get("/oquv-yillari");
  },
  get(id) {
    return axios.get(`/oquv-yillari/${id}`);
  },
  create(data) {
    return axios.post("/oquv-yillari", data);
  },
  update(id, data) {
    return axios.put(`/oquv-yillari/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-yillari/${id}`);
  },
};

