import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://invapi.studioerp.com/api",
});
