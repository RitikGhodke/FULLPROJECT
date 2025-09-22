// import axios from "axios";

// const API = axios.create({ baseURL: "https://fullproject-9.onrender.com/api/payment" });

// export const addMoney = (data) => API.post("/add-money", data).then(res => res.data);








//after deploy

import axios from "axios";

// Backend ka base URL
const API_URL = "https://fullproject-9.onrender.com/api/payment";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Create Razorpay order
export const createOrder = async (productId, token) => {
  const res = await API.post(
    "/create-order",
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Verify payment
export const verifyPayment = async (paymentData, token) => {
  const res = await API.post(
    "/verify-payment",
    paymentData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Get wallet & purchases
export const getWallet = async (token) => {
  const res = await API.get("/wallet", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
