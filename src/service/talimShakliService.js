import axios from "./axios";

export const TalimShakliService = {
  getAll() {
    return axios.get("/talim-shakli");
  },
  get(id) {
    return axios.get(`/talim-shakli/${id}`);
  },
  create(data) {
    return axios.post("/talim-shakli", data);
  },
  update(id, data) {
    return axios.put(`/talim-shakli/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/talim-shakli/${id}`);
  },
};