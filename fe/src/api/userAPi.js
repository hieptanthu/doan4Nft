import axiosClient from "./axiosClient";
const URL = "/user/";

const UserApi = {
  find: (data) => axiosClient.post(`${URL}`, data),
  getById: (_id) => axiosClient.get(`${URL}${_id}`),
  update: (_id, data) => axiosClient.put(`${URL}${_id}`, data),
  create: (data) => axiosClient.post(URL, data),
  delete: (_id) => axiosClient.delete(`${URL}${_id}`),
};

export default UserApi;
