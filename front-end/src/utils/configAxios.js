import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useAuthStore } from "@/stores/authStore";

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});
instance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    config.headers.Authorization = `Bearer ${auth.token ? auth.token : ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// If API error
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    const router = useRouter();
    if (response) {
      switch (response.status) {
        case 400:
          console.error(
            "Bad Request: ",
            response.data.message || "Invalid request"
          );
          break;
        case 401:
          console.error(
            "Unauthorized: ",
            response.data.message || "Unauthorized access"
          );
          //nếu api hết hạn thì 1 là chuyển hướng đến trang login 2 là sử refresh token::
          break;
        case 403:
          console.error(
            "Forbidden: ",
            response.data.message || "Access forbidden"
          );
          //TODO: refresh token
          break;
        case 404:
          console.error(
            "Not Found: ",
            response.data.message || "Resource not found"
          );
          break;
        case 500:
          console.error(
            "Internal Server Error: ",
            response.data.message || "Server error"
          );
          break;
        default:
          console.error(
            "An unexpected error occurred: ",
            response.data.message || "Unknown error"
          );
          break;
      }
    }
  }
);
export default instance;
