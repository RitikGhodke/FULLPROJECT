import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/payment" });

export const addMoney = (data) => API.post("/add-money", data).then(res => res.data);
