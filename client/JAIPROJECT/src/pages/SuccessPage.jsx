import React from "react";
import { Link } from "react-router-dom";
export default function SuccessPage(){
  return (
    <div style={{padding:40, textAlign:"center"}}>
      <h1 style={{color:"#059669"}}>✅ Payment Successful</h1>
      <p>Thanks for your purchase. You can check your wallet & purchases in Profile.</p>
      <Link to="/" style={{display:"inline-block", marginTop:16, padding:"8px 12px", background:"var(--primary)", color:"#fff", borderRadius:8}}>Go Home</Link>
    </div>
  );
}
