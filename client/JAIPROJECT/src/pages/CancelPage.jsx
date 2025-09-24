// import React from "react";
// import { Link } from "react-router-dom";
// export default function CancelPage(){
//   return (
//     <div style={{padding:40, textAlign:"center"}}>
//       <h1 style={{color:"#dc2626"}}>❌ Payment Cancelled</h1>
//       <p>Your payment was not completed.</p>
//       <Link to="/" style={{display:"inline-block", marginTop:16, padding:"8px 12px", background:"var(--primary)", color:"#fff", borderRadius:8}}>Go Home</Link>
//     </div>
//   );
// }






//final deploy


// src/pages/Cancel.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div
      style={{
        padding: 40,
        maxWidth: 600,
        margin: "50px auto",
        textAlign: "center",
        background: "#ffe6e6",
        borderRadius: 10,
        border: "1px solid #ff4d4f",
      }}
    >
      <h1 style={{ color: "#ff4d4f" }}>❌ Payment Failed / Cancelled</h1>
      <p style={{ fontSize: 18, marginTop: 20 }}>
        Your payment could not be completed. You can try again.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: 30,
          padding: "10px 20px",
          background: "#ff4d4f",
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
