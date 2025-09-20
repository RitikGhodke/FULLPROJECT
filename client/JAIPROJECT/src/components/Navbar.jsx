// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav style={styles.nav}>
//       <h2 style={styles.logo}>🌐 Jai Project</h2>
//       <div style={styles.links}>
//         <Link to="/" style={styles.link}>Home</Link>
//         <Link to="/auth" style={styles.link}>Auth</Link>
//         <Link to="/profile" style={styles.link}>Profile</Link>
//         <Link to="/payment" style={styles.link}>Payment</Link>
//       </div>
//     </nav>
//   );
// }

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     background: "#007bff",
//     color: "#fff",
//   },
//   logo: { margin: 0 },
//   links: { display: "flex", gap: "15px" },
//   link: { color: "#fff", textDecoration: "none", fontWeight: "bold" },
// };



import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/auth");
  };

  return (
    <header style={{
      height:64, display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 20px", background: "linear-gradient(90deg,#0b74de,#0369a1)", color:"#fff"
    }}>
      <div style={{fontWeight:700, fontSize:18, cursor:"pointer"}} onClick={()=>navigate("/")}>🚀 JaiProject</div>
      <nav style={{display:"flex", gap:12, alignItems:"center"}}>
        <Link to="/" style={{color:"#fff", textDecoration:"none"}}>Home</Link>
        <Link to="/profile" style={{color:"#fff", textDecoration:"none"}}>Profile</Link>
        {token ? (
          <>
            <span style={{opacity:0.95}}>Hi, {name || "User"}</span>
            <button onClick={logout} style={{background:"#fff", color:"var(--primary)", border:"none", padding:"6px 10px", borderRadius:6}}>Logout</button>
          </>
        ) : (
          <Link to="/auth" style={{color:"#fff", textDecoration:"none"}}>Sign In</Link>
        )}
      </nav>
    </header>
  );
}
