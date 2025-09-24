// import React from "react";
// import { Link } from "react-router-dom";
// export default function SuccessPage(){
//   return (
//     <div style={{padding:40, textAlign:"center"}}>
//       <h1 style={{color:"#059669"}}>✅ Payment Successful</h1>
//       <p>Thanks for your purchase. You can check your wallet & purchases in Profile.</p>
//       <Link to="/" style={{display:"inline-block", marginTop:16, padding:"8px 12px", background:"var(--primary)", color:"#fff", borderRadius:8}}>Go Home</Link>
//     </div>
//   );
// }



//final deploy

// src/pages/Success.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div
      style={{
        padding: 40,
        maxWidth: 600,
        margin: "50px auto",
        textAlign: "center",
        background: "#e6ffed",
        borderRadius: 10,
        border: "1px solid #00b894",
      }}
    >
      <h1 style={{ color: "#00b894" }}>✅ Payment Successful!</h1>
      <p style={{ fontSize: 18, marginTop: 20 }}>
        Thank you for your purchase. Your payment has been completed successfully.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: 30,
          padding: "10px 20px",
          background: "#00b894",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
}

