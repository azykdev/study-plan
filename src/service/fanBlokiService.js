import axios from "./axios";

export const FanBlokiService = {
  getAll() {
    return axios.get("/fan-bloki");
  },
  get(id) {
    return axios.get(`/fan-bloki/${id}`);
  },
  create(data) {
    return axios.post("/fan-bloki", data);
  },
  update(id, data) {
    return axios.put(`/fan-bloki/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/fan-bloki/${id}`);
  },
};