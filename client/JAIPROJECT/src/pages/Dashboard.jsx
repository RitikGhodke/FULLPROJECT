import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      // Fetch user purchases and payment status
      const response = await API.get("/payment/my-purchases");
      setPurchases(response.data.purchases || []);
      
      // Get user info from localStorage or API
      setUser({
        name: localStorage.getItem("name") || "User",
        email: localStorage.getItem("email") || "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      if (error.response?.status === 401) {
        navigate("/auth");
      }
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
      verified: { bg: "#d1fae5", color: "#065f46", text: "✅ Verified" },
      rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" },
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
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
            👋 Welcome, {user?.name}!
          </h1>
          <p style={{ color: "#64748b", fontSize: 16 }}>{user?.email}</p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          marginBottom: 32
        }}>
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: 24,
            borderRadius: 16,
            color: "#fff",
            boxShadow: "0 10px 30px rgba(102,126,234,0.3)"
          }}>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>Total Purchases</div>
            <div style={{ fontSize: 36, fontWeight: 800 }}>{purchases.length}</div>
          </div>

          <div style={{
            background: "#fff",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Verified Payments</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#059669" }}>
              {purchases.filter(p => p.status === "verified").length}
            </div>
          </div>

          <div style={{
            background: "#fff",
            padding: 24,
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Pending Verification</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#d97706" }}>
              {purchases.filter(p => p.status === "pending").length}
            </div>
          </div>
        </div>

        {/* Purchases Table */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: "#1e293b" }}>
            📦 My Purchases
          </h2>

          {purchases.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#94a3b8"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>No purchases yet</div>
              <p style={{ marginTop: 8 }}>Start investing in AI Robots to see them here!</p>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: 20,
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Product</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Transaction ID</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Date</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px", fontWeight: 600, color: "#1e293b" }}>
                        {purchase.productName}
                      </td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "#667eea" }}>
                        ₹{purchase.amount}
                      </td>
                      <td style={{ padding: "16px", fontSize: 13, color: "#64748b", fontFamily: "monospace" }}>
                        {purchase.transactionId}
                      </td>
                      <td style={{ padding: "16px", fontSize: 14, color: "#64748b" }}>
                        {new Date(purchase.submittedAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "16px" }}>
                        {getStatusBadge(purchase.status)}
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