import axios from "axios";

const API = axios.create({ baseURL: "https://fullproject-9.onrender.com/api/payment" });

export const addMoney = (data) => API.post("/add-money", data).then(res => res.data);
