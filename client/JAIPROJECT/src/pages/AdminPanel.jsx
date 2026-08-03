// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AdminPanel() {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all, pending, verified, rejected
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const fetchPayments = async () => {
//     try {
//       const response = await API.get("/payment/pending-payments");
//       setPayments(response.data.payments || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch payments error:", error);
//       if (error.response?.status === 401) {
//         navigate("/auth");
//       }
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (transactionId, status) => {
//     try {
//       await API.post("/payment/verify-payment-manual", {
//         transactionId,
//         status
//       });

//       alert(`✅ Payment ${status} successfully!`);
//       fetchPayments(); // Refresh list
//     } catch (error) {
//       console.error("Verify error:", error);
//       alert("❌ Verification failed");
//     }
//   };

//   const filteredPayments = payments.filter(p => {
//     if (filter === "all") return true;
//     return p.status === filter;
//   });

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       verified: { bg: "#d1fae5", color: "#065f46", text: "✅ Verified" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" },
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        
//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: 16
//         }}>
//           <div>
//             <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//               🔐 Admin Panel
//             </h1>
//             <p style={{ color: "#64748b", fontSize: 16 }}>Manage payment verifications</p>
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             style={{
//               padding: "12px 24px",
//               background: "#e2e8f0",
//               color: "#1e293b",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600
//             }}
//           >
//             ← Back to Home
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//           gap: 20,
//           marginBottom: 32
//         }}>
//           <div style={{
//             background: "#fff",
//             padding: 20,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//           }}>
//             <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Total Payments</div>
//             <div style={{ fontSize: 32, fontWeight: 800, color: "#667eea" }}>
//               {payments.length}
//             </div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 20,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//           }}>
//             <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Pending</div>
//             <div style={{ fontSize: 32, fontWeight: 800, color: "#d97706" }}>
//               {payments.filter(p => p.status === "pending").length}
//             </div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 20,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//           }}>
//             <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Verified</div>
//             <div style={{ fontSize: 32, fontWeight: 800, color: "#059669" }}>
//               {payments.filter(p => p.status === "verified").length}
//             </div>
//           </div>

//           <div style={{
//             background: "#fff",
//             padding: 20,
//             borderRadius: 12,
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//           }}>
//             <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Rejected</div>
//             <div style={{ fontSize: 32, fontWeight: 800, color: "#dc2626" }}>
//               {payments.filter(p => p.status === "rejected").length}
//             </div>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div style={{
//           background: "#fff",
//           padding: 16,
//           borderRadius: 12,
//           marginBottom: 20,
//           display: "flex",
//           gap: 12,
//           flexWrap: "wrap",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//         }}>
//           {["all", "pending", "verified", "rejected"].map(status => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               style={{
//                 padding: "10px 20px",
//                 background: filter === status ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f1f5f9",
//                 color: filter === status ? "#fff" : "#64748b",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 fontWeight: 600,
//                 textTransform: "capitalize",
//                 transition: "all 0.3s ease"
//               }}
//             >
//               {status === "all" ? "All Payments" : status}
//             </button>
//           ))}
//         </div>

//         {/* Payments Table */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             💳 Payment Transactions
//           </h2>

//           {filteredPayments.length === 0 ? (
//             <div style={{
//               textAlign: "center",
//               padding: "60px 20px",
//               color: "#94a3b8"
//             }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
//               <div style={{ fontSize: 18, fontWeight: 600 }}>No payments found</div>
//             </div>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Transaction ID</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Date</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPayments.map((payment, idx) => (
//                     <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px" }}>
//                         <div style={{ fontWeight: 600, color: "#1e293b" }}>{payment.userName}</div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>{payment.userEmail}</div>
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 600, color: "#1e293b" }}>
//                         {payment.productName}
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                         ₹{payment.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {payment.transactionId}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 14, color: "#64748b" }}>
//                         {new Date(payment.submittedAt).toLocaleDateString()}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {getStatusBadge(payment.status)}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {payment.status === "pending" && (
//                           <div style={{ display: "flex", gap: 8 }}>
//                             <button
//                               onClick={() => handleVerify(payment.transactionId, "verified")}
//                               style={{
//                                 padding: "8px 16px",
//                                 background: "#059669",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 13,
//                                 fontWeight: 600
//                               }}
//                             >
//                               ✓ Verify
//                             </button>
//                             <button
//                               onClick={() => handleVerify(payment.transactionId, "rejected")}
//                               style={{
//                                 padding: "8px 16px",
//                                 background: "#dc2626",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 13,
//                                 fontWeight: 600
//                               }}
//                             >
//                               ✗ Reject
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






//withdrall

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AdminPanel() {
//   const [payments, setPayments] = useState([]);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("payments"); // payments or withdrawals
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAdminAccess();
//   }, []);

//   const checkAdminAccess = async () => {
//     try {
//       const userEmail = localStorage.getItem("email");
//       const adminEmails = ["msdhoni5616000016@gmail.com"];
      
//       if (!adminEmails.includes(userEmail)) {
//         alert("Access Denied! Admin only.");
//         navigate("/");
//         return;
//       }

//       fetchData();
//     } catch (error) {
//       console.error("Error:", error);
//       navigate("/");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const paymentsRes = await API.get("/payment/pending-payments");
//       setPayments(paymentsRes.data.payments || []);

//       const withdrawalsRes = await API.get("/payment/withdrawal-requests");
//       setWithdrawals(withdrawalsRes.data.withdrawals || []);

//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Failed to load data");
//       setLoading(false);
//     }
//   };

//   const handleVerifyPayment = async (transactionId, status) => {
//     try {
//       await API.post("/payment/verify-payment-manual", {
//         transactionId,
//         status
//       });

//       alert(`Payment ${status}!`);
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed"));
//     }
//   };

//   const handleProcessWithdrawal = async (userId, amount, status) => {
//     try {
//       await API.post("/payment/process-withdrawal", {
//         userId,
//         amount,
//         status
//       });

//       alert(`Withdrawal ${status}!`);
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed"));
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       verified: { bg: "#d1fae5", color: "#065f46", text: "✅ Verified" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" },
//       approved: { bg: "#d1fae5", color: "#065f46", text: "✅ Approved" }
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        
//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//             🔐 Admin Panel
//           </h1>
//           <p style={{ color: "#64748b", fontSize: 16 }}>
//             Email: {localStorage.getItem("email")}
//           </p>
//         </div>

//         {/* Tabs */}
//         <div style={{
//           background: "#fff",
//           padding: 16,
//           borderRadius: 12,
//           marginBottom: 24,
//           display: "flex",
//           gap: 12,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//         }}>
//           <button
//             onClick={() => setTab("payments")}
//             style={{
//               padding: "12px 24px",
//               background: tab === "payments" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f1f5f9",
//               color: tab === "payments" ? "#fff" : "#64748b",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600,
//               fontSize: 14
//             }}
//           >
//             💳 Payments ({payments.filter(p => p.status === "pending").length})
//           </button>
//           <button
//             onClick={() => setTab("withdrawals")}
//             style={{
//               padding: "12px 24px",
//               background: tab === "withdrawals" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f1f5f9",
//               color: tab === "withdrawals" ? "#fff" : "#64748b",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600,
//               fontSize: 14
//             }}
//           >
//             💰 Withdrawals ({withdrawals.filter(w => w.status === "pending").length})
//           </button>
//         </div>

//         {/* Payments Table */}
//         {tab === "payments" && (
//           <div style={{
//             background: "#fff",
//             borderRadius: 16,
//             padding: 24,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//           }}>
//             <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//               Payment Verifications
//             </h2>

//             {payments.length === 0 ? (
//               <p style={{ textAlign: "center", color: "#94a3b8" }}>No payments yet</p>
//             ) : (
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Transaction ID</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payments.map((payment, idx) => (
//                       <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                         <td style={{ padding: "16px" }}>
//                           <div style={{ fontWeight: 600, color: "#1e293b" }}>{payment.userName}</div>
//                           <div style={{ fontSize: 12, color: "#64748b" }}>{payment.userEmail}</div>
//                         </td>
//                         <td style={{ padding: "16px", fontWeight: 600 }}>{payment.productName}</td>
//                         <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                           ₹{payment.amount}
//                         </td>
//                         <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                           {payment.transactionId}
//                         </td>
//                         <td style={{ padding: "16px" }}>
//                           {getStatusBadge(payment.status)}
//                         </td>
//                         <td style={{ padding: "16px" }}>
//                           {payment.status === "pending" && (
//                             <div style={{ display: "flex", gap: 8 }}>
//                               <button
//                                 onClick={() => handleVerifyPayment(payment.transactionId, "verified")}
//                                 style={{
//                                   padding: "8px 14px",
//                                   background: "#059669",
//                                   color: "#fff",
//                                   border: "none",
//                                   borderRadius: 6,
//                                   cursor: "pointer",
//                                   fontSize: 12,
//                                   fontWeight: 600
//                                 }}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 onClick={() => handleVerifyPayment(payment.transactionId, "rejected")}
//                                 style={{
//                                   padding: "8px 14px",
//                                   background: "#dc2626",
//                                   color: "#fff",
//                                   border: "none",
//                                   borderRadius: 6,
//                                   cursor: "pointer",
//                                   fontSize: 12,
//                                   fontWeight: 600
//                                 }}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Withdrawals Table */}
//         {tab === "withdrawals" && (
//           <div style={{
//             background: "#fff",
//             borderRadius: 16,
//             padding: 24,
//             boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//           }}>
//             <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//               Withdrawal Requests
//             </h2>

//             {withdrawals.length === 0 ? (
//               <p style={{ textAlign: "center", color: "#94a3b8" }}>No withdrawal requests</p>
//             ) : (
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Account</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>IFSC</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                       <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {withdrawals.map((withdrawal, idx) => (
//                       <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                         <td style={{ padding: "16px" }}>
//                           <div style={{ fontWeight: 600, color: "#1e293b" }}>{withdrawal.userName}</div>
//                           <div style={{ fontSize: 12, color: "#64748b" }}>{withdrawal.userEmail}</div>
//                         </td>
//                         <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                           ₹{withdrawal.amount}
//                         </td>
//                         <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                           {withdrawal.bankAccountNumber}
//                         </td>
//                         <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
//                           {withdrawal.ifscCode}
//                         </td>
//                         <td style={{ padding: "16px" }}>
//                           {getStatusBadge(withdrawal.status)}
//                         </td>
//                         <td style={{ padding: "16px" }}>
//                           {withdrawal.status === "pending" && (
//                             <div style={{ display: "flex", gap: 8 }}>
//                               <button
//                                 onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "approved")}
//                                 style={{
//                                   padding: "8px 14px",
//                                   background: "#059669",
//                                   color: "#fff",
//                                   border: "none",
//                                   borderRadius: 6,
//                                   cursor: "pointer",
//                                   fontSize: 12,
//                                   fontWeight: 600
//                                 }}
//                               >
//                                 Approve
//                               </button>
//                               <button
//                                 onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "rejected")}
//                                 style={{
//                                   padding: "8px 14px",
//                                   background: "#dc2626",
//                                   color: "#fff",
//                                   border: "none",
//                                   borderRadius: 6,
//                                   cursor: "pointer",
//                                   fontSize: 12,
//                                   fontWeight: 600
//                                 }}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AdminPanel() {
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAdminAccess();
//   }, []);

//   const checkAdminAccess = async () => {
//     try {
//       const userEmail = localStorage.getItem("email");
//       const adminEmails = ["msdhoni5616000016@gmail.com"];
      
//       if (!adminEmails.includes(userEmail)) {
//         alert("Access Denied! Admin only.");
//         navigate("/");
//         return;
//       }

//       fetchData();
//     } catch (error) {
//       console.error("Error:", error);
//       navigate("/");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const withdrawalsRes = await API.get("/payment/withdrawal-requests");
//       setWithdrawals(withdrawalsRes.data.withdrawals || []);

//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Failed to load data");
//       setLoading(false);
//     }
//   };

//   const handleProcessWithdrawal = async (userId, amount, status) => {
//     try {
//       await API.post("/payment/process-withdrawal", {
//         userId,
//         amount,
//         status
//       });

//       alert(`Withdrawal ${status}!`);
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed"));
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       approved: { bg: "#d1fae5", color: "#065f46", text: "✅ Approved" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" }
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        
//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//             🔐 Admin Panel
//           </h1>
//           <p style={{ color: "#64748b", fontSize: 16 }}>
//             Email: {localStorage.getItem("email")}
//           </p>
//         </div>

//         {/* Withdrawals Table */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             💰 Withdrawal Requests ({withdrawals.filter(w => w.status === "pending").length} pending)
//           </h2>

//           {withdrawals.length === 0 ? (
//             <p style={{ textAlign: "center", color: "#94a3b8" }}>No withdrawal requests</p>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Account</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>IFSC</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {withdrawals.map((withdrawal, idx) => (
//                     <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px" }}>
//                         <div style={{ fontWeight: 600, color: "#1e293b" }}>{withdrawal.userName}</div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>{withdrawal.userEmail}</div>
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                         ₹{withdrawal.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {withdrawal.bankAccountNumber}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
//                         {withdrawal.ifscCode}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {getStatusBadge(withdrawal.status)}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {withdrawal.status === "pending" && (
//                           <div style={{ display: "flex", gap: 8 }}>
//                             <button
//                               onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "approved")}
//                               style={{
//                                 padding: "8px 14px",
//                                 background: "#059669",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 12,
//                                 fontWeight: 600
//                               }}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "rejected")}
//                               style={{
//                                 padding: "8px 14px",
//                                 background: "#dc2626",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 12,
//                                 fontWeight: 600
//                               }}
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AdminPanel() {
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAdminAccess();
//   }, []);

//   const checkAdminAccess = async () => {
//     try {
//       const userEmail = localStorage.getItem("email");
//       const adminEmails = ["msdhoni5616000016@gmail.com"];
      
//       if (!adminEmails.includes(userEmail)) {
//         alert("Access Denied! Admin only.");
//         navigate("/");
//         return;
//       }

//       fetchData();
//     } catch (error) {
//       console.error("Error:", error);
//       navigate("/");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const withdrawalsRes = await API.get("/payment/withdrawal-requests");
//       setWithdrawals(withdrawalsRes.data.withdrawals || []);

//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Failed to load data");
//       setLoading(false);
//     }
//   };

//   const handleRunDistribution = async () => {
//     if (!window.confirm("Run daily profit distribution for all active purchases?")) return;
//     try {
//       await API.post("/admin/run-distribution");
//       alert("✅ Distribution executed successfully!");
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed to run distribution"));
//     }
//   };

//   const handleProcessWithdrawal = async (userId, amount, status) => {
//     try {
//       await API.post("/payment/process-withdrawal", {
//         userId,
//         amount,
//         status
//       });

//       alert(`Withdrawal ${status}!`);
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed"));
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       approved: { bg: "#d1fae5", color: "#065f46", text: "✅ Approved" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" }
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        
//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//             🔐 Admin Panel
//           </h1>
//           <p style={{ color: "#64748b", fontSize: 16, marginBottom: 16 }}>
//             Email: {localStorage.getItem("email")}
//           </p>
//           <button
//             onClick={handleRunDistribution}
//             style={{
//               padding: "12px 24px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600,
//               fontSize: 14
//             }}
//           >
//             🔄 Run Daily Distribution
//           </button>
//         </div>

//         {/* Withdrawals Table */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             💰 Withdrawal Requests ({withdrawals.filter(w => w.status === "pending").length} pending)
//           </h2>

//           {withdrawals.length === 0 ? (
//             <p style={{ textAlign: "center", color: "#94a3b8" }}>No withdrawal requests</p>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Account</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>IFSC</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {withdrawals.map((withdrawal, idx) => (
//                     <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px" }}>
//                         <div style={{ fontWeight: 600, color: "#1e293b" }}>{withdrawal.userName}</div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>{withdrawal.userEmail}</div>
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                         ₹{withdrawal.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {withdrawal.bankAccountNumber}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
//                         {withdrawal.ifscCode}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {getStatusBadge(withdrawal.status)}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {withdrawal.status === "pending" && (
//                           <div style={{ display: "flex", gap: 8 }}>
//                             <button
//                               onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "approved")}
//                               style={{
//                                 padding: "8px 14px",
//                                 background: "#059669",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 12,
//                                 fontWeight: 600
//                               }}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "rejected")}
//                               style={{
//                                 padding: "8px 14px",
//                                 background: "#dc2626",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 12,
//                                 fontWeight: 600
//                               }}
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// const UPLOADS_BASE = API.defaults.baseURL.replace(/\/api\/?$/, ""); // 👈 fix

// export default function AdminPanel() {
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [pendingPurchases, setPendingPurchases] = useState([]);
//   const [settings, setSettings] = useState({ upiId: "", qrImageUrl: "" });
//   const [upiInput, setUpiInput] = useState("");
//   const [qrFile, setQrFile] = useState(null);
//   const [savingSettings, setSavingSettings] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAdminAccess();
//   }, []);

//   const checkAdminAccess = async () => {
//     try {
//       const userEmail = localStorage.getItem("email");
//       const adminEmails = ["msdhoni5616000016@gmail.com"];

//       if (!adminEmails.includes(userEmail)) {
//         alert("Access Denied! Admin only.");
//         navigate("/");
//         return;
//       }

//       fetchData();
//     } catch (error) {
//       console.error("Error:", error);
//       navigate("/");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const [withdrawalsRes, pendingRes, settingsRes] = await Promise.all([
//         API.get("/payment/withdrawal-requests"),
//         API.get("/payment/pending-purchases"),
//         API.get("/payment/settings"),
//       ]);

//       setWithdrawals(withdrawalsRes.data.withdrawals || []);
//       setPendingPurchases(pendingRes.data.pending || []);
//       setSettings(settingsRes.data);
//       setUpiInput(settingsRes.data.upiId || "");

//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Failed to load data");
//       setLoading(false);
//     }
//   };

//   const handleRunDistribution = async () => {
//     if (!window.confirm("Run daily profit distribution for all active purchases?")) return;
//     try {
//       await API.post("/admin/run-distribution");
//       alert("✅ Distribution executed successfully!");
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed to run distribution"));
//     }
//   };

//   const handleProcessWithdrawal = async (userId, amount, status) => {
//     try {
//       await API.post("/payment/process-withdrawal", {
//         userId,
//         amount,
//         status
//       });

//       alert(`Withdrawal ${status}!`);
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed"));
//     }
//   };

//   const handleSaveSettings = async () => {
//     try {
//       setSavingSettings(true);
//       const formData = new FormData();
//       formData.append("upiId", upiInput);
//       if (qrFile) formData.append("qrImage", qrFile);

//       await API.post("/payment/settings", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ Payment settings updated!");
//       setQrFile(null);
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Failed to update settings"));
//     } finally {
//       setSavingSettings(false);
//     }
//   };

//   const handleApprovePurchase = async (purchaseId) => {
//     try {
//       await API.post("/payment/approve-purchase", { purchaseId });
//       alert("✅ Purchase approved!");
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Approval failed"));
//     }
//   };

//   const handleRejectPurchase = async (purchaseId) => {
//     if (!window.confirm("Reject this purchase?")) return;
//     try {
//       await API.post("/payment/reject-purchase", { purchaseId });
//       alert("❌ Purchase rejected");
//       fetchData();
//     } catch (error) {
//       alert("Error: " + (error.response?.data?.message || "Rejection failed"));
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
//       approved: { bg: "#d1fae5", color: "#065f46", text: "✅ Approved" },
//       rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" }
//     };
//     const style = styles[status] || styles.pending;
//     return (
//       <span style={{
//         background: style.bg,
//         color: style.color,
//         padding: "6px 12px",
//         borderRadius: 20,
//         fontSize: 13,
//         fontWeight: 600
//       }}>
//         {style.text}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       padding: "40px 20px"
//     }}>
//       <div style={{ maxWidth: 1400, margin: "0 auto" }}>

//         {/* Header */}
//         <div style={{
//           background: "#fff",
//           padding: 32,
//           borderRadius: 16,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
//             🔐 Admin Panel
//           </h1>
//           <p style={{ color: "#64748b", fontSize: 16, marginBottom: 16 }}>
//             Email: {localStorage.getItem("email")}
//           </p>
//           <button
//             onClick={handleRunDistribution}
//             style={{
//               padding: "12px 24px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600,
//               fontSize: 14
//             }}
//           >
//             🔄 Run Daily Distribution
//           </button>
//         </div>

//         {/* Payment Settings (QR + UPI) */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             🧾 Payment Settings (QR / UPI)
//           </h2>

//           <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
//             <div>
//               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Current QR</p>
//               {settings.qrImageUrl ? (
//   <img
//     src={`${UPLOADS_BASE}${settings.qrImageUrl}`}
//     alt="Current QR"
//     style={{ width: 160, height: 160, borderRadius: 8, border: "1px solid #e2e8f0" }}
//   />
// ) : (
//   <div style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #e2e8f0", borderRadius: 8, color: "#94a3b8", fontSize: 13 }}>
//     No QR set
//   </div>
// )}
//             </div>

//             <div style={{ flex: 1, minWidth: 260 }}>
//               <label style={{ display: "block", fontSize: 13, color: "#64748b", marginBottom: 6 }}>
//                 UPI ID
//               </label>
//               <input
//                 type="text"
//                 value={upiInput}
//                 onChange={(e) => setUpiInput(e.target.value)}
//                 placeholder="example@upi"
//                 style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 16, boxSizing: "border-box" }}
//               />

//               <label style={{ display: "block", fontSize: 13, color: "#64748b", marginBottom: 6 }}>
//                 Naya QR Image Upload karo
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setQrFile(e.target.files[0])}
//                 style={{ marginBottom: 16 }}
//               />

//               <button
//                 onClick={handleSaveSettings}
//                 disabled={savingSettings}
//                 style={{
//                   padding: "10px 20px",
//                   background: "#059669",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   cursor: savingSettings ? "not-allowed" : "pointer",
//                   fontWeight: 600,
//                   fontSize: 14
//                 }}
//               >
//                 {savingSettings ? "Saving..." : "Save Settings"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Pending Purchases (UTR verification) */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           marginBottom: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             🧐 Pending Purchases ({pendingPurchases.length})
//           </h2>

//           {pendingPurchases.length === 0 ? (
//             <p style={{ textAlign: "center", color: "#94a3b8" }}>No pending purchases</p>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>UTR</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pendingPurchases.map((p) => (
//                     <tr key={p._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px" }}>
//                         <div style={{ fontWeight: 600, color: "#1e293b" }}>{p.user?.name}</div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>{p.user?.email}</div>
//                       </td>
//                       <td style={{ padding: "16px" }}>{p.productName}</td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                         ₹{p.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {p.utrNumber}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         <div style={{ display: "flex", gap: 8 }}>
//                           <button
//                             onClick={() => handleApprovePurchase(p._id)}
//                             style={{
//                               padding: "8px 14px",
//                               background: "#059669",
//                               color: "#fff",
//                               border: "none",
//                               borderRadius: 6,
//                               cursor: "pointer",
//                               fontSize: 12,
//                               fontWeight: 600
//                             }}
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleRejectPurchase(p._id)}
//                             style={{
//                               padding: "8px 14px",
//                               background: "#dc2626",
//                               color: "#fff",
//                               border: "none",
//                               borderRadius: 6,
//                               cursor: "pointer",
//                               fontSize: 12,
//                               fontWeight: 600
//                             }}
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Withdrawals Table */}
//         <div style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
//         }}>
//           <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
//             💰 Withdrawal Requests ({withdrawals.filter(w => w.status === "pending").length} pending)
//           </h2>

//           {withdrawals.length === 0 ? (
//             <p style={{ textAlign: "center", color: "#94a3b8" }}>No withdrawal requests</p>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Account</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>IFSC</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
//                     <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {withdrawals.map((withdrawal, idx) => (
//                     <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                       <td style={{ padding: "16px" }}>
//                         <div style={{ fontWeight: 600, color: "#1e293b" }}>{withdrawal.userName}</div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>{withdrawal.userEmail}</div>
//                       </td>
//                       <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
//                         ₹{withdrawal.amount}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
//                         {withdrawal.bankAccountNumber}
//                       </td>
//                       <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
//                         {withdrawal.ifscCode}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {getStatusBadge(withdrawal.status)}
//                       </td>
//                       <td style={{ padding: "16px" }}>
//                         {withdrawal.status === "pending" && (
//                           <div style={{ display: "flex", gap: 8 }}>
//                             <button
//                               onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "approved")}
//                               style={{
//                                 padding: "8px 14px",
//                                 background: "#059669",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 12,
//                                 fontWeight: 600
//                               }}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() => handleProcessWithdrawal(withdrawal.userId, withdrawal.amount, "rejected")}
//                               style={{
//                                 padding: "8px 14px",
//                                 background: "#dc2626",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                                 fontSize: 12,
//                                 fontWeight: 600
//                               }}
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const UPLOADS_BASE = API.defaults.baseURL.replace(/\/api\/?$/, ""); // 👈 fix

export default function AdminPanel() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [settings, setSettings] = useState({ upiId: "", qrImageUrl: "" });
  const [upiInput, setUpiInput] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      const adminEmails = ["msdhoni5616000016@gmail.com"];

      if (!adminEmails.includes(userEmail)) {
        alert("Access Denied! Admin only.");
        navigate("/");
        return;
      }

      fetchData();
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };

  const fetchData = async () => {
    try {
      const [withdrawalsRes, pendingRes, settingsRes] = await Promise.all([
        API.get("/payment/withdrawal-requests"),
        API.get("/payment/pending-purchases"),
        API.get("/payment/settings"),
      ]);

      setWithdrawals(withdrawalsRes.data.withdrawals || []);
      setPendingPurchases(pendingRes.data.pending || []);
      setSettings(settingsRes.data);
      setUpiInput(settingsRes.data.upiId || "");

      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to load data");
      setLoading(false);
    }
  };

  const handleRunDistribution = async () => {
    if (!window.confirm("Run daily profit distribution for all active purchases?")) return;
    try {
      await API.post("/admin/run-distribution");
      alert("✅ Distribution executed successfully!");
      fetchData();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Failed to run distribution"));
    }
  };

  // 👇 CHANGED: ab withdrawalId use ho raha hai (userId/amount ki jagah)
  const handleProcessWithdrawal = async (withdrawalId, status) => {
    try {
      await API.post("/payment/process-withdrawal", {
        withdrawalId,
        status
      });

      alert(`Withdrawal ${status}!`);
      fetchData();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Failed"));
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true);
      const formData = new FormData();
      formData.append("upiId", upiInput);
      if (qrFile) formData.append("qrImage", qrFile);

      await API.post("/payment/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Payment settings updated!");
      setQrFile(null);
      fetchData();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Failed to update settings"));
    } finally {
      setSavingSettings(false);
    }
  };

  const handleApprovePurchase = async (purchaseId) => {
    try {
      await API.post("/payment/approve-purchase", { purchaseId });
      alert("✅ Purchase approved!");
      fetchData();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Approval failed"));
    }
  };

  const handleRejectPurchase = async (purchaseId) => {
    if (!window.confirm("Reject this purchase?")) return;
    try {
      await API.post("/payment/reject-purchase", { purchaseId });
      alert("❌ Purchase rejected");
      fetchData();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Rejection failed"));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
      approved: { bg: "#d1fae5", color: "#065f46", text: "✅ Approved" },
      rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" }
    };
    const style = styles[status] || styles.pending;
    return (
      <span style={{
        background: style.bg,
        color: style.color,
        padding: "6px 12px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600
      }}>
        {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
            🔐 Admin Panel
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 16 }}>
            Email: {localStorage.getItem("email")}
          </p>
          <button
            onClick={handleRunDistribution}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14
            }}
          >
            🔄 Run Daily Distribution
          </button>
        </div>

        {/* Payment Settings (QR + UPI) */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
            🧾 Payment Settings (QR / UPI)
          </h2>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Current QR</p>
              {settings.qrImageUrl ? (
  <img
    src={`${UPLOADS_BASE}${settings.qrImageUrl}`}
    alt="Current QR"
    style={{ width: 160, height: 160, borderRadius: 8, border: "1px solid #e2e8f0" }}
  />
) : (
  <div style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #e2e8f0", borderRadius: 8, color: "#94a3b8", fontSize: 13 }}>
    No QR set
  </div>
)}
            </div>

            <div style={{ flex: 1, minWidth: 260 }}>
              <label style={{ display: "block", fontSize: 13, color: "#64748b", marginBottom: 6 }}>
                UPI ID
              </label>
              <input
                type="text"
                value={upiInput}
                onChange={(e) => setUpiInput(e.target.value)}
                placeholder="example@upi"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 16, boxSizing: "border-box" }}
              />

              <label style={{ display: "block", fontSize: 13, color: "#64748b", marginBottom: 6 }}>
                Naya QR Image Upload karo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setQrFile(e.target.files[0])}
                style={{ marginBottom: 16 }}
              />

              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                style={{
                  padding: "10px 20px",
                  background: "#059669",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: savingSettings ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: 14
                }}
              >
                {savingSettings ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>

        {/* Pending Purchases (UTR verification) */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
            🧐 Pending Purchases ({pendingPurchases.length})
          </h2>

          {pendingPurchases.length === 0 ? (
            <p style={{ textAlign: "center", color: "#94a3b8" }}>No pending purchases</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>UTR</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPurchases.map((p) => (
                    <tr key={p._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{p.user?.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{p.user?.email}</div>
                      </td>
                      <td style={{ padding: "16px" }}>{p.productName}</td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
                        ₹{p.amount}
                      </td>
                      <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
                        {p.utrNumber}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => handleApprovePurchase(p._id)}
                            style={{
                              padding: "8px 14px",
                              background: "#059669",
                              color: "#fff",
                              border: "none",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: 12,
                              fontWeight: 600
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectPurchase(p._id)}
                            style={{
                              padding: "8px 14px",
                              background: "#dc2626",
                              color: "#fff",
                              border: "none",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: 12,
                              fontWeight: 600
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Withdrawals Table */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
            💰 Withdrawal Requests ({withdrawals.filter(w => w.status === "pending").length} pending)
          </h2>

          {withdrawals.length === 0 ? (
            <p style={{ textAlign: "center", color: "#94a3b8" }}>No withdrawal requests</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>User</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Account</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>IFSC</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{withdrawal.userName}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{withdrawal.userEmail}</div>
                      </td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 16 }}>
                        ₹{withdrawal.amount}
                      </td>
                      <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
                        {withdrawal.bankAccountNumber}
                      </td>
                      <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
                        {withdrawal.ifscCode}
                      </td>
                      <td style={{ padding: "16px" }}>
                        {getStatusBadge(withdrawal.status)}
                      </td>
                      <td style={{ padding: "16px" }}>
                        {withdrawal.status === "pending" && (
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              onClick={() => handleProcessWithdrawal(withdrawal._id, "approved")}
                              style={{
                                padding: "8px 14px",
                                background: "#059669",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleProcessWithdrawal(withdrawal._id, "rejected")}
                              style={{
                                padding: "8px 14px",
                                background: "#dc2626",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 600
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}