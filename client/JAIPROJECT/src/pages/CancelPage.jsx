import React from "react";
import { Link } from "react-router-dom";
export default function CancelPage(){
  return (
    <div style={{padding:40, textAlign:"center"}}>
      <h1 style={{color:"#dc2626"}}>❌ Payment Cancelled</h1>
      <p>Your payment was not completed.</p>
      <Link to="/" style={{display:"inline-block", marginTop:16, padding:"8px 12px", background:"var(--primary)", color:"#fff", borderRadius:8}}>Go Home</Link>
    </div>
  );
}
