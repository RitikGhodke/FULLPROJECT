import axios from "axios";

const API = axios.create({ baseURL: "https://fullproject-9.onrender.com/api/auth" });muje

export const register = (data) => API.post("/register", data).then(res => res.data);
export const login = (data) => API.post("/login", data).then(res => res.data);
