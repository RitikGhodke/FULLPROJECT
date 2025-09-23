// import { useState } from "react";
// import { register, login } from "../api/auth";
// import { useNavigate } from "react-router-dom";

// export default function AuthRegisterPage() {
//   const [mode, setMode] = useState("register");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [invite, setInvite] = useState("");
//   const [message, setMessage] = useState(null);
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   async function onSubmit(e) {
//     e.preventDefault();
//     setMessage(null);
//     setErrors([]);
//     setLoading(true);

//     try {
//       if (mode === "register") {
//         const res = await register({ name, email, phone, password, inviteCode: invite });
//         setMessage("Account created. Please login.");
//         setMode("login");
//       } else {
//         const res = await login({ email, password });
//         localStorage.setItem("token", res.token);
//         setMessage("Logged in successfully!");
//         navigate("/profile");
//       }
//     } catch (err) {
//       setErrors([err.response?.data?.message || "Server error"]);
//     }

//     setLoading(false);
//   }

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>{mode === "register" ? "Register" : "Login"}</h2>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {errors.map((err, idx) => <p key={idx} style={{ color: "red" }}>{err}</p>)}
//       <form onSubmit={onSubmit}>
//         {mode === "register" && (
//           <>
//             <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
//             <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
//             <input type="text" placeholder="Invite Code" value={invite} onChange={e => setInvite(e.target.value)} />
//           </>
//         )}
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//         <button type="submit" disabled={loading}>{loading ? "Processing..." : mode === "register" ? "Register" : "Login"}</button>
//       </form>
//       <p style={{ marginTop: "10px" }}>
//         {mode === "register" ? "Already have an account?" : "Don't have an account?"}
//         <span style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }} onClick={() => setMode(mode === "register" ? "login" : "register")}>
//           {mode === "register" ? "Login" : "Register"}
//         </span>
//       </p>
//     </div>
//   );
// }



// import React, { useState } from "react";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div style={styles.container}>
//       <h1>{isLogin ? "Login" : "Register"}</h1>
//       <form style={styles.form}>
//         <input type="email" placeholder="Email" style={styles.input} />
//         <input type="password" placeholder="Password" style={styles.input} />
//         {!isLogin && <input type="text" placeholder="Name" style={styles.input} />}
//         <button style={styles.btn}>{isLogin ? "Login" : "Register"}</button>
//       </form>
//       <p onClick={() => setIsLogin(!isLogin)} style={styles.switch}>
//         {isLogin ? "New user? Register here" : "Already have an account? Login"}
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: { textAlign: "center", marginTop: "50px" },
//   form: { display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" },
//   input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
//   btn: { padding: "10px", border: "none", borderRadius: "5px", background: "#007bff", color: "#fff", cursor: "pointer" },
//   switch: { marginTop: "10px", color: "blue", cursor: "pointer" },
// };





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com" ;

// export default function AuthPage(){
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading,setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally { setLoading(false); }
//   };

//   return (
//     <div style={{maxWidth:460, margin:"40px auto", padding:18, background:"#fff", borderRadius:8, boxShadow:"0 6px 20px rgba(2,6,23,0.06)"}}>
//       <h2 style={{textAlign:"center"}}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{display:"flex", flexDirection:"column", gap:10, marginTop:12}}>
//         {!isLogin && <>
//           <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required style={input}/>
//           <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required style={input}/>
//         </>}
//         <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={input}/>
//         <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={input}/>
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{textAlign:"center", marginTop:12}}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={()=>setIsLogin(!isLogin)} style={{marginLeft:8, background:"none", border:"none", color:"var(--primary)", cursor:"pointer"}}>{isLogin ? "Create account" : "Login"}</button>
//       </p>
//     </div>
//   );
// }

// const input = { padding:10, borderRadius:6, border:"1px solid #e5e7eb", width:"100%" };
// const btn = { padding:10, borderRadius:6, border:"none", background:"var(--primary)", color:"#fff", fontWeight:600 };






//after deploy

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE;

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 460, margin: "40px auto", padding: 18, background: "#fff", borderRadius: 8 }}>
//       <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
//         {!isLogin && (
//           <>
//             <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required style={input} />
//             <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={input} />
//           </>
//         )}
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={input} />
//         <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={input} />
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: 12 }}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 8, background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
//           {isLogin ? "Create account" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" };
// const btn = { padding: 10, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };









// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = "https://fullproject-9.onrender.com";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       } else {
//         const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("name", res.data.user?.name || "");
//         localStorage.setItem("email", res.data.user?.email || "");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     } finally { setLoading(false); }
//   };

//   return (
//     <div style={{ maxWidth: 460, margin: "40px auto", padding: 18, background: "#fff", borderRadius: 8, boxShadow: "0 6px 20px rgba(2,6,23,0.06)" }}>
//       <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Create account"}</h2>
//       <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
//         {!isLogin && <>
//           <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required style={input} />
//           <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required style={input} />
//         </>}
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={input} />
//         <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={input} />
//         <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: 12 }}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 8, background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>{isLogin ? "Create account" : "Login"}</button>
//       </p>
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" };
// const btn = { padding: 10, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };










// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "https://fullproject-9.onrender.com";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let res;
//       if (isLogin) {
//         res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
//       } else {
//         res = await axios.post(`${API_BASE}/api/auth/register`, { name, phone, email, password });
//       }

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("name", res.data.user?.name || "");
//       localStorage.setItem("email", res.data.user?.email || "");
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error occurred");
//       console.error(err.response || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 460, margin: "40px auto", padding: 18, background: "#fff", borderRadius: 8, boxShadow: "0 6px 20px rgba(2,6,23,0.06)" }}>
//       <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Create Account"}</h2>
//       <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
//         {!isLogin && (
//           <>
//             <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={input} />
//             <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required style={input} />
//           </>
//         )}
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={input} />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={input} />
//         <button type="submit" disabled={loading} style={btn}>
//           {loading ? "Please wait..." : (isLogin ? "Login" : "Register")}
//         </button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: 12 }}>
//         {isLogin ? "New here?" : "Already registered?"}
//         <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 8, background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
//           {isLogin ? "Create Account" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// }

// const input = { padding: 10, borderRadius: 6, border: "1px solid #e5e7eb", width: "100%" };
// const btn = { padding: 10, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };


















import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://fullproject-9.onrender.com";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user?.name || "");
        localStorage.setItem("email", res.data.user?.email || "");
        navigate("/");
      } else {
        const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, phone, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user?.name || "");
        localStorage.setItem("email", res.data.user?.email || "");
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally { setLoading(false); }
  };

  return (
    <div style={{maxWidth:460, margin:"40px auto", padding:18, background:"#fff", borderRadius:8}}>
      <h2 style={{textAlign:"center"}}>{isLogin ? "Login" : "Create account"}</h2>
      <form onSubmit={submit} style={{display:"flex", flexDirection:"column", gap:10, marginTop:12}}>
        {!isLogin && <>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required style={input}/>
          <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required style={input}/>
        </>}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={input}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={input}/>
        <button type="submit" disabled={loading} style={btn}>{loading ? "Please wait..." : (isLogin ? "Login" : "Register")}</button>
      </form>
      <p style={{textAlign:"center", marginTop:12}}>
        {isLogin ? "New here?" : "Already registered?"}
        <button onClick={()=>setIsLogin(!isLogin)} style={{marginLeft:8, background:"none", border:"none", color:"var(--primary)", cursor:"pointer"}}>
          {isLogin ? "Create account" : "Login"}
        </button>
      </p>
    </div>
  );
}
const input = { padding:10, borderRadius:6, border:"1px solid #e5e7eb", width:"100%" };
const btn = { padding:10, borderRadius:6, border:"none", background:"var(--primary)", color:"#fff", fontWeight:600 };










