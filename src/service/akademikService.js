import axios from "./axios";

export const AkademikService = {
  getAll() {
    return axios.get("/oquv-bolimi-akademik-daraja");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-akademik-daraja/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-akademik-daraja", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-akademik-daraja/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-akademik-daraja/${id}`);
  },
};