import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:5000/";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Tạo instance của axios
const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify(params), // Không cần { params }
  headers: {
    "Content-Type": "application/json", // Cài sẵn header Content-Type
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào headers nếu có
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Xử lý lỗi cho request
  }
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => {
    return response?.data || response; // Trả về dữ liệu cần thiết
  },
  (error) => {
    if (!error.response) {
      console.log(error.message === "Network Error"); // Kiểm tra lỗi mạng
      alert("Không thể kết nối đến server: " + baseUrl); // Thông báo rõ ràng
    }
    return Promise.reject(error.response || error); // Ném lỗi để xử lý sau
  }
);

export default axiosClient;
