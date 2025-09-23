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











import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://fullproject-9.onrender.com";

export default function ProfilePage(){
  const [user,setUser]=useState(null);
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [file,setFile]=useState(null);
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization:`Bearer ${token}`} : {};

  const loadUser = async ()=>{
    try{
      const res = await axios.get(`${API_BASE}/api/auth/me`,{headers});
      setUser(res.data);
      setName(res.data.name||"");
      setPhone(res.data.phone||"");
    }catch(err){ console.error(err); }
  }

  useEffect(()=>{ loadUser(); }, []);

  const save = async ()=>{
    try{
      await axios.put(`${API_BASE}/api/profile/update`,{name,phone},{headers});
      alert("Saved");
      localStorage.setItem("name",name);
      loadUser();
    }catch(err){ alert("Save failed"); }
  }

  const upload = async ()=>{
    if(!file){ alert("Choose a file"); return; }
    const fd = new FormData();
    fd.append("avatar",file);
    try{
      await axios.post(`${API_BASE}/api/profile/avatar`,fd,{headers:{...headers,"Content-Type":"multipart/form-data"}});
      alert("Uploaded");
      loadUser();
    }catch(err){ alert("Upload failed"); }
  }

  if(!user) return <div>Loading...</div>;

  return (
    <div style={{maxWidth:900, margin:"30px auto", padding:20, background:"#fff", borderRadius:8}}>
      <h2>Profile</h2>
      <div>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} style={input}/>
        <label style={{marginTop:12}}>Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} style={input}/>
        <label style={{marginTop:12}}>Email</label>
        <input value={user.email} disabled style={input}/>
        <div style={{marginTop:12}}>
          <button onClick={save} style={{padding:"8px 12px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:6}}>Save Profile</button>
        </div>
        <div style={{marginTop:12}}>
          <input type="file" onChange={e=>setFile(e.target.files[0])}/>
          <button onClick={upload} style={{padding:"8px 12px", background:"var(--primary)", color:"#fff", border:"none", borderRadius:6}}>Upload DP</button>
        </div>
      </div>
    </div>
  );
}
const input = { padding:10, borderRadius:6, border:"1px solid #e6e9ef", width:"100%" };







