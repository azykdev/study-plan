import axios from "./axios";

export const AkademikService = {
  getAll() {
    return axios.get("/akademik-daraja");
  },
  get(id) {
    return axios.get(`/akademik-daraja/${id}`);
  },
  create(data) {
    return axios.post("/akademik-daraja", data);
  },
  update(id, data) {
    return axios.put(`/akademik-daraja/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/akademik-daraja/${id}`);
  },
};