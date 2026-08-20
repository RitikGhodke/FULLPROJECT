import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function ReferAndEarn() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }
      const res = await API.get("/referral/info");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Referral fetch error:", err);
      if (err.response?.status === 401) navigate("/auth");
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(data.referralCode);
    alert("✅ Referral code copied!");
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert("Sahi amount daalo");
      return;
    }
    try {
      setSubmitting(true);
      await API.post("/referral/withdraw", { amount: Number(amount) });
      alert("✅ Withdrawal request bhej di gayi!");
      setAmount("");
      setShowWithdrawModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Withdrawal failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 20, color: "#667eea" }}>Loading...</div>
      </div>
    );
  }

  if (!data) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 16, color: "#dc2626" }}>Referral data load nahi ho payi. Baad me try karo.</div>
    </div>
  );
}

  return (
    <div className="referWrap">
      <style>{`
        .referWrap {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 16px 100px;
        }
        .referInner { max-width: 1000px; margin: 0 auto; }

        .headerCard {
          background: #fff; padding: 24px; border-radius: 16px;
          margin-bottom: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          text-align: center;
        }
        .headerCard h1 { font-size: 22px; font-weight: 800; color: #1e293b; margin-bottom: 6px; }
        .headerCard p { color: #64748b; font-size: 13px; }

        .codeRow {
          display: flex; gap: 8px; margin-top: 16px;
        }
        .codeInput {
          flex: 1; min-width: 0; padding: 14px; border: 2px dashed #667eea;
          border-radius: 10px; font-size: 18px; font-weight: 800; letter-spacing: 2px;
          text-align: center; color: #667eea; background: #f5f3ff; box-sizing: border-box;
        }
        .copyBtn {
          flex-shrink: 0; padding: 0 20px; border: none; border-radius: 10px;
          background: #667eea; color: #fff; font-weight: 700; cursor: pointer;
        }

        .statsRow {
          display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; padding-bottom: 4px; margin-bottom: 20px;
        }
        .statsRow::-webkit-scrollbar { display: none; }
        .statCard { scroll-snap-align: start; flex: 0 0 78%; border-radius: 16px; padding: 20px; }
        .statCard .label { font-size: 13px; margin-bottom: 6px; }
        .statCard .value { font-size: 28px; font-weight: 800; }
        .primaryStat {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: #fff; box-shadow: 0 10px 30px rgba(17,153,142,0.3);
        }
        .secondaryStat { background: #fff; box-shadow: 0 10px 40px rgba(0,0,0,0.15); }

        .sectionCard {
          background: #fff; border-radius: 16px; padding: 20px;
          margin-bottom: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }
        .sectionCard h2 { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 14px; }

        .rowTile {
          border: 1px solid #f1f5f9; border-radius: 12px; padding: 14px; margin-bottom: 10px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .rowTile .name { font-weight: 700; color: #1e293b; font-size: 14px; }
        .rowTile .meta { font-size: 12px; color: #64748b; }
        .rowTile .amt { font-weight: 700; color: #059669; font-size: 15px; }

        .levelBadge {
          font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 12px;
          background: #ede9fe; color: #7c3aed; margin-left: 6px;
        }

        .emptyState { text-align: center; padding: 32px 16px; color: #94a3b8; font-size: 14px; }

        .actionBar {
          position: fixed; left: 0; right: 0; bottom: 0; background: #fff;
          padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
          box-shadow: 0 -6px 24px rgba(0,0,0,0.12); z-index: 50;
        }
        .actionBar button {
          width: 100%; padding: 14px; border: none; border-radius: 12px;
          font-weight: 700; font-size: 14px; cursor: pointer;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: #fff;
        }

        @media (min-width: 720px) {
          .referWrap { padding: 40px 20px; }
          .statsRow { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); overflow: visible; }
          .statCard { flex: unset; }
          .actionBar {
            position: static; box-shadow: none; padding: 0; margin-bottom: 24px; background: transparent;
          }
          .actionBar button { width: auto; padding: 14px 32px; }
        }
      `}</style>

      <div className="referInner">
        {/* Header + referral code */}
        <div className="headerCard">
          <h1>🎁 Refer & Earn</h1>
          <p>Apna code share karo, jab bhi tumhari referral chain se koi purchase karega, tumhe commission milega</p>
          <div className="codeRow">
            <div className="codeInput">{data.referralCode}</div>
            <button className="copyBtn" onClick={copyCode}>Copy</button>
          </div>
        </div>

        {/* Balance + referrals count */}
        <div className="statsRow">
          <div className="statCard primaryStat">
            <div className="label" style={{ opacity: 0.9 }}>Referral Balance</div>
            <div className="value">₹{data.referralBalance}</div>
          </div>
          <div className="statCard secondaryStat">
            <div className="label" style={{ color: "#64748b" }}>Total Direct Referrals</div>
            <div className="value" style={{ color: "#1e293b" }}>{data.totalReferrals}</div>
          </div>
        </div>

        {/* Withdraw action */}
        <div className="actionBar">
          <button onClick={() => setShowWithdrawModal(true)}>💰 Withdraw Referral Balance</button>
        </div>

        {/* Withdraw modal */}
        {showWithdrawModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16
          }}>
            <div style={{
              background: "#fff", padding: 28, borderRadius: 16, maxWidth: 480,
              width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#1e293b" }}>
                💰 Withdraw Referral Balance
              </h2>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                Available: ₹{data.referralBalance}
              </p>
              <form onSubmit={handleWithdraw}>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  style={{
                    width: "100%", padding: "14px", marginBottom: 20,
                    border: "2px solid #e2e8f0", borderRadius: 8, fontSize: 16, boxSizing: "border-box"
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%", padding: "14px",
                    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                    color: "#fff", border: "none", borderRadius: 8, fontSize: 16,
                    fontWeight: 600, cursor: "pointer", marginBottom: 12,
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? "Processing..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  style={{
                    width: "100%", padding: "12px", background: "transparent", color: "#64748b",
                    border: "2px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        


                {/* Downline — 3 levels */}
        <div className="sectionCard">
          <h2>🌳 Your Downline (3 Levels)</h2>

          <h3 style={{ fontSize: 14, color: "#667eea", marginBottom: 8, marginTop: 12 }}>
            Level 1 ({data.downline.level1.length})
          </h3>
          {data.downline.level1.length === 0 ? (
            <div className="emptyState">Koi nahi</div>
          ) : (
            data.downline.level1.map((u) => (
              <div className="rowTile" key={u._id}>
                <div>
                  <div className="name">{u.name}</div>
                  <div className="meta">{u.email}</div>
                </div>
                <div className="meta">{new Date(u.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          )}

          <h3 style={{ fontSize: 14, color: "#667eea", marginBottom: 8, marginTop: 20 }}>
            Level 2 ({data.downline.level2.length})
          </h3>
          {data.downline.level2.length === 0 ? (
            <div className="emptyState">Koi nahi</div>
          ) : (
            data.downline.level2.map((u) => (
              <div className="rowTile" key={u._id}>
                <div>
                  <div className="name">{u.name}</div>
                  <div className="meta">{u.email}</div>
                </div>
                <div className="meta">{new Date(u.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          )}

          <h3 style={{ fontSize: 14, color: "#667eea", marginBottom: 8, marginTop: 20 }}>
            Level 3 ({data.downline.level3.length})
          </h3>
          {data.downline.level3.length === 0 ? (
            <div className="emptyState">Koi nahi</div>
          ) : (
            data.downline.level3.map((u) => (
              <div className="rowTile" key={u._id}>
                <div>
                  <div className="name">{u.name}</div>
                  <div className="meta">{u.email}</div>
                </div>
                <div className="meta">{new Date(u.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>

        {/* Earnings history */}
        <div className="sectionCard">
          <h2>📈 Earnings History</h2>
          {data.earnings.length === 0 ? (
            <div className="emptyState">Abhi tak koi earning nahi hui</div>
          ) : (
            data.earnings.map((e) => (
              <div className="rowTile" key={e._id}>
                <div>
                  <div className="name">
                    {e.fromUser?.name || "User"}
                    <span className="levelBadge">Level {e.level}</span>
                  </div>
                  <div className="meta">{new Date(e.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="amt">+₹{e.amount}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}