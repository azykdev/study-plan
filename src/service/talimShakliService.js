import axios from "./axios";

export const TalimShakliService = {
  getAll() {
    return axios.get("/oquv-bolimi-talim-shakli");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-talim-shakli/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-talim-shakli", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-talim-shakli/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-talim-shakli/${id}`);
  },
};