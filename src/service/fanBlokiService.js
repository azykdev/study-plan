import axios from "./axios";

export const FanBlokiService = {
  getAll() {
    return axios.get("/oquv-bolimi-fan-bloki");
  },
  get(id) {
    return axios.get(`/oquv-bolimi-fan-bloki/${id}`);
  },
  create(data) {
    return axios.post("/oquv-bolimi-fan-bloki", data);
  },
  update(id, data) {
    return axios.put(`/oquv-bolimi-fan-bloki/${id}`, data);
  },
  delete(id) {
    return axios.delete(`/oquv-bolimi-fan-bloki/${id}`);
  },
};