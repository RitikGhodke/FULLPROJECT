// import React from "react";

// export default function ProfilePage() {
//   const token = localStorage.getItem("token");

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Profile</h2>
//       {token ? <p>Logged in! Token: {token}</p> : <p>Please login first</p>}
//     </div>
//   );
// }



// import React from "react";

// export default function ProfilePage() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>👤 Profile Page</h1>
//       <p>Welcome! Here you can manage your profile details.</p>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";

// export default function ProfilePage(){
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [file, setFile] = useState(null);

//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   const loadUser = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/auth/me`, { headers });
//       setUser(res.data);
//       setName(res.data.name || "");
//       setPhone(res.data.phone || "");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(()=>{ loadUser(); }, []);

//   const save = async () => {
//     try {
//       await axios.put(`${API_BASE}/api/profile/update`, { name, phone }, { headers });
//       alert("Saved");
//       localStorage.setItem("name", name);
//       loadUser();
//     } catch (err) {
//       alert("Save failed");
//     }
//   };

//   const upload = async () => {
//     if (!file) { alert("Choose a file"); return; }
//     const fd = new FormData();
//     fd.append("avatar", file);
//     try {
//       await axios.post(`${API_BASE}/api/profile/avatar`, fd, { headers: { ...headers, "Content-Type": "multipart/form-data" } });
//       alert("Uploaded");
//       loadUser();
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div style={{maxWidth:900, margin:"30px auto", padding:20, background:"#fff", borderRadius:8}}>
//       <h2>Profile</h2>
//       {!user ? <p>Loading...</p> : (
//         <div style={{display:"flex", gap:20, alignItems:"flex-start"}}>
//           <div style={{width:220}}>
//             <div style={{width:200,height:200, borderRadius:8, overflow:"hidden", background:"#f3f4f6"}}>
//               <img src={user.avatar || "/images/placeholder.jpg"} alt="avatar" style={{width:"100%", height:"100%", objectFit:"cover"}} />
//             </div>
//             <input style={{marginTop:10}} type="file" onChange={e=>setFile(e.target.files[0])} />
//             <button onClick={upload} style={{marginTop:8, padding:"8px 12px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:6}}>Upload DP</button>
//           </div>

//           <div style={{flex:1}}>
//             <label>Name</label>
//             <input value={name} onChange={e=>setName(e.target.value)} style={input} />
//             <label style={{marginTop:12}}>Phone</label>
//             <input value={phone} onChange={e=>setPhone(e.target.value)} style={input} />
//             <label style={{marginTop:12}}>Email</label>
//             <input value={user.email} disabled style={input} />
//             <div style={{marginTop:12}}>
//               <button onClick={save} style={{padding:"8px 12px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:6}}>Save Profile</button>
//             </div>

//             <div style={{marginTop:18}}>
//               <h3>Wallet Balance</h3>
//               <p style={{fontSize:20, fontWeight:700}}>₹{user.walletBalance || 0}</p>
//             </div>

//             <div style={{marginTop:18}}>
//               <h3>Your Purchases</h3>
//               <UserPurchases userId={user._id} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function UserPurchases({ userId }){
//   const [purchases, setPurchases] = useState([]);
//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   useEffect(()=> {
//     (async ()=>{
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com"}/api/payment/wallet`, { headers });
//         setPurchases(res.data.purchases || []);
//       } catch (err) { console.error(err); }
//     })();
//   }, []);

//   return (
//     <div>
//       {purchases.length === 0 ? <p>No purchases yet</p> :
//         purchases.map(p => (
//           <div key={p._id} style={{padding:10, border:"1px solid #eee", borderRadius:8, marginBottom:8}}>
//             <div><strong>{p.productName}</strong> — ₹{p.amount}</div>
//             <div>Start: {new Date(p.startDate).toLocaleDateString()}</div>
//             <div>Expiry: {new Date(p.expiryDate).toLocaleDateString()}</div>
//             <div>Daily: ₹{Number(p.dailyProfit).toFixed(2)} • Remaining days: {p.remainingDays}</div>
//             <div>Active: {p.active ? "Yes" : "No"}</div>
//           </div>
//         ))
//       }
//     </div>
//   );
// }

// const input = { padding:10, borderRadius:6, border:"1px solid #e6e9ef", width:"100%" };











//after deploy

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [file, setFile] = useState(null);

//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   const loadUser = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/auth/me`, { headers });
//       setUser(res.data);
//       setName(res.data.name || "");
//       setPhone(res.data.phone || "");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { loadUser(); }, []);

//   const save = async () => {
//     try {
//       await axios.put(`${API_BASE}/api/profile/update`, { name, phone }, { headers });
//       alert("Saved");
//       localStorage.setItem("name", name);
//       loadUser();
//     } catch (err) {
//       alert("Save failed");
//     }
//   };

//   const upload = async () => {
//     if (!file) { alert("Choose a file"); return; }
//     const fd = new FormData();
//     fd.append("avatar", file);
//     try {
//       await axios.post(`${API_BASE}/api/profile/avatar`, fd, { headers: { ...headers, "Content-Type": "multipart/form-data" } });
//       alert("Uploaded");
//       loadUser();
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "30px auto", padding: 20, background: "#fff", borderRadius: 8 }}>
//       <h2>Profile</h2>
//       {!user ? <p>Loading...</p> : (
//         <div>
//           <label>Name</label>
//           <input value={name} onChange={(e) => setName(e.target.value)} style={input} />
//           <label style={{ marginTop: 12 }}>Phone</label>
//           <input value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />
//           <label style={{ marginTop: 12 }}>Email</label>
//           <input value={user.email} disabled style={input} />
//           <div style={{ marginTop: 12 }}>
//             <button onClick={save} style={{ padding: "8px 12px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 6 }}>Save Profile</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e6e9ef", width: "100%" };


















//after deploy

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   const loadUser = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/auth/me`, { headers });
//       setUser(res.data);
//       setName(res.data.name || "");
//       setPhone(res.data.phone || "");
//     } catch (err) {
//       console.error("Error loading user:", err.response?.data || err);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const save = async () => {
//     if (!name || !phone) {
//       alert("Name and Phone are required!");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.put(`${API_BASE}/api/profile/update`, { name, phone }, { headers });
//       alert(res.data.message || "Profile saved successfully!");
//       localStorage.setItem("name", name);
//       loadUser();
//     } catch (err) {
//       console.error("Save error:", err.response?.data || err);
//       alert(err.response?.data?.message || "Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const upload = async () => {
//     if (!file) {
//       alert("Choose a file to upload");
//       return;
//     }
//     const fd = new FormData();
//     fd.append("avatar", file);
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API_BASE}/api/profile/avatar`, fd, {
//         headers: { ...headers, "Content-Type": "multipart/form-data" }
//       });
//       alert(res.data.message || "Avatar uploaded successfully!");
//       loadUser();
//     } catch (err) {
//       console.error("Upload error:", err.response?.data || err);
//       alert(err.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "30px auto", padding: 20, background: "#fff", borderRadius: 8 }}>
//       <h2>Profile</h2>
//       {!user ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <label>Name</label>
//           <input value={name} onChange={(e) => setName(e.target.value)} style={input} />

//           <label style={{ marginTop: 12 }}>Phone</label>
//           <input value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />

//           <label style={{ marginTop: 12 }}>Email</label>
//           <input value={user.email} disabled style={input} />

//           <div style={{ marginTop: 12 }}>
//             <button
//               onClick={save}
//               disabled={loading}
//               style={{
//                 padding: "8px 12px",
//                 background: "var(--primary)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 6,
//                 cursor: loading ? "not-allowed" : "pointer"
//               }}
//             >
//               {loading ? "Saving..." : "Save Profile"}
//             </button>
//           </div>

//           <div style={{ marginTop: 20 }}>
//             <label>Upload Avatar</label>
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginTop: 8 }} />
//             <button
//               onClick={upload}
//               disabled={loading}
//               style={{
//                 padding: "8px 12px",
//                 background: "var(--primary)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 6,
//                 marginTop: 8,
//                 cursor: loading ? "not-allowed" : "pointer"
//               }}
//             >
//               {loading ? "Uploading..." : "Upload Avatar"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e6e9ef", width: "100%" };











// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";

// export default function ProfilePage(){
//   const [user,setUser]=useState(null);
//   const [name,setName]=useState("");
//   const [phone,setPhone]=useState("");
//   const [file,setFile]=useState(null);
//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization:`Bearer ${token}`} : {};

//   const loadUser = async ()=>{
//     try{
//       const res = await axios.get(`${API_BASE}/api/auth/me`,{headers});
//       setUser(res.data);
//       setName(res.data.name||"");
//       setPhone(res.data.phone||"");
//     }catch(err){ console.error(err); }
//   }

//   useEffect(()=>{ loadUser(); }, []);

//   const save = async ()=>{
//     try{
//       await axios.put(`${API_BASE}/api/profile/update`,{name,phone},{headers});
//       alert("Saved");
//       localStorage.setItem("name",name);
//       loadUser();
//     }catch(err){ alert("Save failed"); }
//   }

//   const upload = async ()=>{
//     if(!file){ alert("Choose a file"); return; }
//     const fd = new FormData();
//     fd.append("avatar",file);
//     try{
//       await axios.post(`${API_BASE}/api/profile/avatar`,fd,{headers:{...headers,"Content-Type":"multipart/form-data"}});
//       alert("Uploaded");
//       loadUser();
//     }catch(err){ alert("Upload failed"); }
//   }

//   if(!user) return <div>Loading...</div>;

//   return (
//     <div style={{maxWidth:900, margin:"30px auto", padding:20, background:"#fff", borderRadius:8}}>
//       <h2>Profile</h2>
//       <div>
//         <label>Name</label>
//         <input value={name} onChange={e=>setName(e.target.value)} style={input}/>
//         <label style={{marginTop:12}}>Phone</label>
//         <input value={phone} onChange={e=>setPhone(e.target.value)} style={input}/>
//         <label style={{marginTop:12}}>Email</label>
//         <input value={user.email} disabled style={input}/>
//         <div style={{marginTop:12}}>
//           <button onClick={save} style={{padding:"8px 12px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:6}}>Save Profile</button>
//         </div>
//         <div style={{marginTop:12}}>
//           <input type="file" onChange={e=>setFile(e.target.files[0])}/>
//           <button onClick={upload} style={{padding:"8px 12px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:6}}>Upload DP</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// const input = { padding:10, borderRadius:6, border:"1px solid #e6e9ef", width:"100%" };






//edit
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setUser({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      phone: localStorage.getItem("phone") || ""
    });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/auth");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Update localStorage
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("phone", user.phone);

      // Optional: Call API to update backend
      // await API.put("/auth/update-profile", user);

      alert("✅ Profile updated successfully!");
      setEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: 20,
            backdropFilter: "blur(10px)"
          }}
        >
          ← Back to Home
        </button>

        {/* Profile Card */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 40,
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          
          {/* Avatar */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 10px 30px rgba(102,126,234,0.3)"
            }}>
              {user.name.charAt(0).toUpperCase() || "U"}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>
              {user.name || "User"}
            </h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>Member since 2025</p>
          </div>

          {/* Form Fields */}
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            
            {/* Name Field */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1e293b",
                fontSize: 14
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                disabled={!editing}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 16,
                  outline: "none",
                  background: editing ? "#fff" : "#f8fafc",
                  color: editing ? "#1e293b" : "#64748b",
                  transition: "all 0.3s ease"
                }}
              />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1e293b",
                fontSize: 14
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                disabled={!editing}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 16,
                  outline: "none",
                  background: editing ? "#fff" : "#f8fafc",
                  color: editing ? "#1e293b" : "#64748b",
                  transition: "all 0.3s ease"
                }}
              />
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: 32 }}>
              <label style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1e293b",
                fontSize: 14
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                disabled={!editing}
                placeholder="Enter phone number"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 16,
                  outline: "none",
                  background: editing ? "#fff" : "#f8fafc",
                  color: editing ? "#1e293b" : "#64748b",
                  transition: "all 0.3s ease"
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {!editing ? (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 16
                    }}
                  >
                    ✏️ Edit Profile
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "#f1f5f9",
                      color: "#1e293b",
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 16
                    }}
                  >
                    📊 Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: loading ? "#94a3b8" : "#059669",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      cursor: loading ? "not-allowed" : "pointer",
                      fontWeight: 600,
                      fontSize: 16
                    }}
                  >
                    {loading ? "Saving..." : "💾 Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      loadUserData();
                    }}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "#f1f5f9",
                      color: "#64748b",
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 16
                    }}
                  >
                    ✕ Cancel
                  </button>
                </>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                marginTop: 24,
                padding: "14px",
                background: "#fee2e2",
                color: "#dc2626",
                border: "2px solid #fecaca",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16,
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#dc2626";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#fee2e2";
                e.target.style.color = "#dc2626";
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16
        }}>
          <div style={{
            background: "rgba(255,255,255,0.95)",
            padding: 20,
            borderRadius: 12,
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>AI Robots</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#667eea" }}>0</div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.95)",
            padding: 20,
            borderRadius: 12,
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>💰</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Total Earned</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#059669" }}>₹0</div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.95)",
            padding: 20,
            borderRadius: 12,
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Active Days</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0891b2" }}>0</div>
          </div>
        </div>
      </div>
    </div>
  );
}