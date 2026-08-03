import React, { useState, useEffect } from "react";
import API from "../api";

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/payment/my-withdrawals");
      setWithdrawals(res.data.withdrawals || []);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: "#fef3c7", color: "#92400e", text: "⏳ Pending" },
      approved: { bg: "#d1fae5", color: "#065f46", text: "✅ Approved" },
      rejected: { bg: "#fee2e2", color: "#991b1b", text: "❌ Rejected" },
    };
    const style = styles[status] || styles.pending;
    return (
      <span
        style={{
          background: style.bg,
          color: style.color,
          padding: "6px 12px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 18, color: "#667eea" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 16px", maxWidth: 900, margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: "#1e293b" }}>
          📜 Withdrawal History
        </h2>

        {withdrawals.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8", padding: "20px 0" }}>
            Koi withdrawal request nahi mili
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 13 }}>
                    Amount
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 13 }}>
                    Requested On
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 13 }}>
                    Status
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 13 }}>
                    Processed On
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#667eea", fontSize: 15 }}>
                      ₹{w.amount}
                    </td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
                      {formatDate(w.createdAt)}
                    </td>
                    <td style={{ padding: "16px" }}>{getStatusBadge(w.status)}</td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#64748b" }}>
                      {w.status === "pending" ? "-" : formatDate(w.processedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}