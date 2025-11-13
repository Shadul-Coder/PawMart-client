import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  // baseURL: "https://shadul-pawmart.vercel.app",
  baseURL: "https://shadul-pawmart-server.onrender.com/",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
