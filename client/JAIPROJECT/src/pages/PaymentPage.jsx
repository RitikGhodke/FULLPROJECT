// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { addMoney } from "../api/payment";

// export default function PaymentPage() {
//   const [amount, setAmount] = useState(0);

//   const handleToken = async (token) => {
//     try {
//       const userId = "user_id_here"; // replace with logged in user id
//       const res = await addMoney({ amount, token, userId });
//       alert("Payment successful! New balance: " + res.walletBalance);
//     } catch (err) {
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Add Money</h2>
//       <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
//       <StripeCheckout
//         stripeKey="your_public_stripe_key_here"
//         token={handleToken}
//         amount={amount * 100}
//         currency="INR"
//       />
//     </div>
//   );
// }





// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";

// export default function PaymentPage() {
//   const [amount, setAmount] = useState(100);

//   const handleToken = (token) => {
//     console.log("Stripe Token:", token);
//     alert("Payment Successful!");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>💳 Payment Page</h1>
//       <p>Enter amount and proceed to pay:</p>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         style={{ padding: "10px", margin: "10px" }}
//       />
//       <StripeCheckout
//         stripeKey="your_stripe_public_key"
//         token={handleToken}
//         amount={amount * 100}
//         name="Jai Project Payment"
//         currency="INR"
//       />
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";
// const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

// const PRODUCTS = {
//   1:{ id:1, name:"AI Robot 1", price:100 },
//   2:{ id:2, name:"AI Robot 2", price:500 },
//   3:{ id:3, name:"AI Robot 3", price:1200 },
//   4:{ id:4, name:"AI Robot 4", price:2400 },
//   5:{ id:5, name:"AI Robot 5", price:4980 },
//   6:{ id:6, name:"AI Robot 6", price:9850 },
//   7:{ id:7, name:"AI Robot 7", price:15600 },
//   8:{ id:8, name:"AI Robot 8", price:22450 },
//   9:{ id:9, name:"AI Robot 9", price:35000 },
//   10:{ id:10, name:"AI Robot 10", price:55800 },
// };

// export default function PaymentPage(){
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       // 1) create order
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       // 2) open razorpay checkout
//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // verify on server
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
//             alert("Payment verification failed");
//             navigate("/cancel");
//           }
//         },
//         prefill: {
//           name: localStorage.getItem("name") || "",
//           email: localStorage.getItem("email") || ""
//         },
//         theme: { color: "#0b74de" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally { setLoading(false); }
//   };

//   if (!product) return <div style={{padding:24}}>Product not found</div>;

//   return (
//     <div style={{padding:24, maxWidth:720, margin:"40px auto", background:"#fff", borderRadius:8}}>
//       <h2>{product.name}</h2>
//       <p style={{fontSize:20, fontWeight:700}}>Price: ₹{product.price}</p>
//       <p style={{color:"var(--muted)"}}>This product has its own validity & daily profit configured on the backend.</p>
//       <button onClick={handlePay} disabled={loading} style={{marginTop:12, padding:"10px 14px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:8}}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }





//after deploy

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE;
// const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

// const PRODUCTS = {
//   1: { id: 1, name: "AI Robot 1", price: 100 },
//   2: { id: 2, name: "AI Robot 2", price: 500 },
//   3: { id: 3, name: "AI Robot 3", price: 1200 },
//   4: { id: 4, name: "AI Robot 4", price: 2400 },
//   5: { id: 5, name: "AI Robot 5", price: 4980 },
//   6: { id: 6, name: "AI Robot 6", price: 9850 },
//   7: { id: 7, name: "AI Robot 7", price: 15600 },
//   8: { id: 8, name: "AI Robot 8", price: 22450 },
//   9: { id: 9, name: "AI Robot 9", price: 35000 },
//   10: { id: 10, name: "AI Robot 10", price: 55800 },
// };

// export default function PaymentPage() {
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
//             alert("Payment verification failed");
//             navigate("/cancel");
//           }
//         },
//         prefill: {
//           name: localStorage.getItem("name") || "",
//           email: localStorage.getItem("email") || ""
//         },
//         theme: { color: "#0b74de" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

//   return (
//     <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
//       <h2>{product.name}</h2>
//       <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
//       <button onClick={handlePay} disabled={loading} style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }









// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";
// const RZP_KEY = ""; // skip abhi, key nahi hai

// const PRODUCTS = {
//   1: { id: 1, name: "AI Robot 1", price: 100 },
//   2: { id: 2, name: "AI Robot 2", price: 500 },
//   3: { id: 3, name: "AI Robot 3", price: 1200 },
//   4: { id: 4, name: "AI Robot 4", price: 2400 },
//   5: { id: 5, name: "AI Robot 5", price: 4980 },
//   6: { id: 6, name: "AI Robot 6", price: 9850 },
//   7: { id: 7, name: "AI Robot 7", price: 15600 },
//   8: { id: 8, name: "AI Robot 8", price: 22450 },
//   9: { id: 9, name: "AI Robot 9", price: 35000 },
//   10: { id: 10, name: "AI Robot 10", price: 55800 },
// };

// export default function PaymentPage() {
//   const { id } = useParams();
//   const product = PRODUCTS[id];
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   const handlePay = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("token");
//     if (!token) { alert("Please login first"); navigate("/auth"); return; }

//     try {
//       setLoading(true);
//       const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
//       const { order } = orderResp.data;

//       const options = {
//         key: RZP_KEY,
//         amount: order.amount,
//         currency: order.currency || "INR",
//         name: product.name,
//         description: `Purchase ${product.name}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(`${API_BASE}/api/payment/verify-payment`, {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId: product.id
//             }, { headers: getAuthHeader() });

//             alert("Payment successful");
//             navigate("/success");
//           } catch (err) {
//             console.error(err);
//             alert("Payment verification failed");
//             navigate("/cancel");
//           }
//         },
//         prefill: {
//           name: localStorage.getItem("name") || "",
//           email: localStorage.getItem("email") || ""
//         },
//         theme: { color: "#0b74de" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Order creation failed");
//     } finally { setLoading(false); }
//   };

//   if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

//   return (
//     <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
//       <h2>{product.name}</h2>
//       <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
//       <button onClick={handlePay} disabled={loading} style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>
//         {loading ? "Processing..." : `Pay ₹${product.price}`}
//       </button>
//     </div>
//   );
// }










import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";
const RZP_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const PRODUCTS = {
  1: { id: 1, name: "AI Robot 1", price: 100 },
  2: { id: 2, name: "AI Robot 2", price: 500 },
  3: { id: 3, name: "AI Robot 3", price: 1200 },
  4: { id: 4, name: "AI Robot 4", price: 2400 },
  5: { id: 5, name: "AI Robot 5", price: 4980 },
  6: { id: 6, name: "AI Robot 6", price: 9850 },
  7: { id: 7, name: "AI Robot 7", price: 15600 },
  8: { id: 8, name: "AI Robot 8", price: 22450 },
  9: { id: 9, name: "AI Robot 9", price: 35000 },
  10: { id: 10, name: "AI Robot 10", price: 55800 },
};

export default function PaymentPage() {
  const { id } = useParams();
  const product = PRODUCTS[id];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handlePay = async () => {
    if (!product) return;
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first"); navigate("/auth"); return; }

    try {
      setLoading(true);
      const orderResp = await axios.post(`${API_BASE}/api/payment/create-order`, { productId: product.id }, { headers: getAuthHeader() });
      const { order } = orderResp.data;

      const options = {
        key: RZP_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        name: product.name,
        description: `Purchase ${product.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(`${API_BASE}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId: product.id
            }, { headers: getAuthHeader() });

            alert("Payment successful");
            navigate("/success");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
            navigate("/cancel");
          }
        },
        prefill: {
          name: localStorage.getItem("name") || "",
          email: localStorage.getItem("email") || ""
        },
        theme: { color: "#0b74de" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order creation failed");
    } finally { setLoading(false); }
  };

  if (!product) return <div style={{ padding: 24 }}>Product not found</div>;

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
      <h2>{product.name}</h2>
      <p style={{ fontSize: 20, fontWeight: 700 }}>Price: ₹{product.price}</p>
      <p style={{ color: "var(--muted)" }}>This product has its own validity & daily profit configured on the backend.</p>
      <button onClick={handlePay} disabled={loading} style={{ marginTop: 12, padding: "10px 14px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 8 }}>
        {loading ? "Processing..." : `Pay ₹${product.price}`}
      </button>
    </div>
  );
}
