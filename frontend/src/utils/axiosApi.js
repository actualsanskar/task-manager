import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manger-backend-3l7m.onrender.com/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await api.post("/new-refresh-token");
      console.log(res);

      // accessToken = res.data;

      return api(originalRequest);
    }

    return Promise.reject(err);
  }
);

export { api };
