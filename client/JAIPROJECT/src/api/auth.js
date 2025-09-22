// import axios from "axios";

// const API = axios.create({ baseURL: "https://fullproject-9.onrender.com/api/auth" });muje

// export const register = (data) => API.post("/register", data).then(res => res.data);
// export const login = (data) => API.post("/login", data).then(res => res.data);





//after deploy

import axios from "axios";

// Backend ka base URL
const API_URL = "https://fullproject-9.onrender.com/api/auth";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Register
export const register = async (data) => {
  const res = await API.post("/register", data);
  return res.data;
};

// Login
export const login = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};
