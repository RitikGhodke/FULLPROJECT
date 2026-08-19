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



// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const token = localStorage.getItem("token");
//   const name = localStorage.getItem("name");
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("name");
//     navigate("/auth");
//   };

//   return (
//     <header style={{
//       height:64, display:"flex", alignItems:"center", justifyContent:"space-between",
//       padding:"0 20px", background: "linear-gradient(90deg,#0b74de,#0369a1)", color:"#fff"
//     }}>
//       <div style={{fontWeight:700, fontSize:18, cursor:"pointer"}} onClick={()=>navigate("/")}>🚀 JaiProject</div>
//       <nav style={{display:"flex", gap:12, alignItems:"center"}}>
//         <Link to="/" style={{color:"#fff", textDecoration:"none"}}>Home</Link>
//         <Link to="/profile" style={{color:"#fff", textDecoration:"none"}}>Profile</Link>
//         {token ? (
//           <>
//             <span style={{opacity:0.95}}>Hi, {name || "User"}</span>
//             <button onClick={logout} style={{background:"#fff", color:"var(--primary)", border:"none", padding:"6px 10px", borderRadius:6}}>Logout</button>
//           </>
//         ) : (
//           <Link to="/auth" style={{color:"#fff", textDecoration:"none"}}>Sign In</Link>
//         )}
//       </nav>
//     </header>
//   );
// }





//edit

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userName = localStorage.getItem("name") || "User";

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.clear();
//       navigate("/auth");
//     }
//   };

//   return (
//     <nav style={{
//       background: "rgba(255,255,255,0.95)",
//       backdropFilter: "blur(10px)",
//       padding: "16px 24px",
//       boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//       position: "sticky",
//       top: 0,
//       zIndex: 1000
//     }}>
//       <div style={{
//         maxWidth: 1200,
//         margin: "0 auto",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: 16
//       }}>
        
//         {/* Logo */}
//         <Link to="/" style={{
//           fontSize: 24,
//           fontWeight: 800,
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           textDecoration: "none"
//         }}>
//           🤖 AI Robots
//         </Link>

//         {/* Nav Links */}
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 20,
//           flexWrap: "wrap"
//         }}>
//           <Link to="/" style={{
//             color: "#64748b",
//             textDecoration: "none",
//             fontWeight: 600,
//             fontSize: 15,
//             transition: "color 0.3s ease"
//           }}
//           onMouseEnter={(e) => e.target.style.color = "#667eea"}
//           onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//             🏠 Home
//           </Link>

//           {isLoggedIn && (
//             <>
//               <Link to="/dashboard" style={{
//                 color: "#64748b",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 fontSize: 15,
//                 transition: "color 0.3s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.color = "#667eea"}
//               onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//                 📊 Dashboard
//               </Link>

//               <Link to="/profile" style={{
//                 color: "#64748b",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 fontSize: 15,
//                 transition: "color 0.3s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.color = "#667eea"}
//               onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//                 👤 Profile
//               </Link>

//               <Link to="/admin" style={{
//                 color: "#64748b",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 fontSize: 15,
//                 transition: "color 0.3s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.color = "#667eea"}
//               onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//                 🔐 Admin
//               </Link>

//               <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 padding: "8px 16px",
//                 background: "#f1f5f9",
//                 borderRadius: 20
//               }}>
//                 <span style={{ fontSize: 14, color: "#64748b" }}>
//                   Hi, <strong style={{ color: "#1e293b" }}>{userName}</strong>
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     padding: "6px 12px",
//                     background: "#fee2e2",
//                     color: "#dc2626",
//                     border: "none",
//                     borderRadius: 6,
//                     cursor: "pointer",
//                     fontSize: 13,
//                     fontWeight: 600,
//                     transition: "all 0.3s ease"
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = "#dc2626";
//                     e.target.style.color = "#fff";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = "#fee2e2";
//                     e.target.style.color = "#dc2626";
//                   }}
//                 >
//                   Logout
//                 </button>
//               </div>
//             </>
//           )}

//           {!isLoggedIn && (
//             <Link to="/auth">
//               <button style={{
//                 padding: "10px 20px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 fontWeight: 600,
//                 fontSize: 14,
//                 boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
//                 transition: "transform 0.2s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
//               onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
//                 Login / Register
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }





// //withdrall


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userEmail = localStorage.getItem("email") || "";
//   const userName = localStorage.getItem("name") || "User";

//   // ✅ Admin emails list
//   const adminEmails = ["msdhoni5616000016@gmail.com"];
//   const isAdmin = adminEmails.includes(userEmail);

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.clear();
//       navigate("/auth");
//     }
//   };

//   return (
//     <nav style={{
//       background: "rgba(255,255,255,0.95)",
//       backdropFilter: "blur(10px)",
//       padding: "16px 24px",
//       boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//       position: "sticky",
//       top: 0,
//       zIndex: 1000
//     }}>
//       <div style={{
//         maxWidth: 1200,
//         margin: "0 auto",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: 16
//       }}>
        
//         {/* Logo */}
//         <Link to="/" style={{
//           fontSize: 24,
//           fontWeight: 800,
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           textDecoration: "none"
//         }}>
//           🤖 AI Robots
//         </Link>

//         {/* Nav Links */}
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 20,
//           flexWrap: "wrap"
//         }}>
//           <Link to="/" style={{
//             color: "#64748b",
//             textDecoration: "none",
//             fontWeight: 600,
//             fontSize: 15,
//             transition: "color 0.3s ease"
//           }}
//           onMouseEnter={(e) => e.target.style.color = "#667eea"}
//           onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//             🏠 Home
//           </Link>

//           {/* Telegram Link - Available for everyone */}
//           <a
//             href="https://t.me/+YkEN6s3Hm_oxY2Nl"
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{
//               color: "#0088cc",
//               textDecoration: "none",
//               fontWeight: 600,
//               fontSize: 15,
//               transition: "color 0.3s ease"
//             }}
//             onMouseEnter={(e) => e.target.style.color = "#006ba3"}
//             onMouseLeave={(e) => e.target.style.color = "#0088cc"}>
//             💬 Telegram
//           </a>

//           {isLoggedIn && (
//             <>
//               <Link to="/dashboard" style={{
//                 color: "#64748b",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 fontSize: 15,
//                 transition: "color 0.3s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.color = "#667eea"}
//               onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//                 📊 Dashboard
//               </Link>

//               <Link to="/profile" style={{
//                 color: "#64748b",
//                 textDecoration: "none",
//                 fontWeight: 600,
//                 fontSize: 15,
//                 transition: "color 0.3s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.color = "#667eea"}
//               onMouseLeave={(e) => e.target.style.color = "#64748b"}>
//                 👤 Profile
//               </Link>

//               {/* ✅ Admin Link - Only visible for admin */}
//               {isAdmin && (
//                 <Link to="/admin" style={{
//                   color: "#dc2626",
//                   textDecoration: "none",
//                   fontWeight: 600,
//                   fontSize: 15,
//                   transition: "color 0.3s ease"
//                 }}
//                 onMouseEnter={(e) => e.target.style.color = "#b91c1c"}
//                 onMouseLeave={(e) => e.target.style.color = "#dc2626"}>
//                   🔐 Admin
//                 </Link>
//               )}

//               <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 padding: "8px 16px",
//                 background: "#f1f5f9",
//                 borderRadius: 20
//               }}>
//                 <span style={{ fontSize: 14, color: "#64748b" }}>
//                   Hi, <strong style={{ color: "#1e293b" }}>{userName}</strong>
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     padding: "6px 12px",
//                     background: "#fee2e2",
//                     color: "#dc2626",
//                     border: "none",
//                     borderRadius: 6,
//                     cursor: "pointer",
//                     fontSize: 13,
//                     fontWeight: 600,
//                     transition: "all 0.3s ease"
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = "#dc2626";
//                     e.target.style.color = "#fff";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = "#fee2e2";
//                     e.target.style.color = "#dc2626";
//                   }}
//                 >
//                   Logout
//                 </button>
//               </div>
//             </>
//           )}

//           {!isLoggedIn && (
//             <Link to="/auth">
//               <button style={{
//                 padding: "10px 20px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 fontWeight: 600,
//                 fontSize: 14,
//                 boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
//                 transition: "transform 0.2s ease"
//               }}
//               onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
//               onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
//                 Login / Register
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }













import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const userEmail = localStorage.getItem("email") || "";
  const userName = localStorage.getItem("name") || "User";

  const adminEmails = ["msdhoni5616000016@gmail.com"];
  const isAdmin = adminEmails.includes(userEmail);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/auth");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <style>{`
        .navbar {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          padding: 14px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
        }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .hamburger span {
          width: 24px;
          height: 2.5px;
          background: #1e293b;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        .navLinks {
          display: none;
          flex-direction: column;
          gap: 4px;
          margin-top: 16px;
        }
        .navLinks.open { display: flex; }

        .navLink {
          color: #334155;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          padding: 12px 8px;
          border-bottom: 1px solid #f1f5f9;
        }

        .userChip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 8px;
          margin-top: 6px;
        }
        .logoutBtn {
          padding: 8px 14px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
        }
        .loginBtn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          width: 100%;
        }

        /* Desktop */
        @media (min-width: 760px) {
          .hamburger { display: none; }
          .navLinks {
            display: flex !important;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            margin-top: 0;
          }
          .navLink {
            border-bottom: none;
            padding: 0;
          }
          .userChip {
            background: #f1f5f9;
            border-radius: 20px;
            margin-top: 0;
            padding: 8px 16px;
          }
          .loginBtn { width: auto; }
        }
      `}</style>

      <div className="navInner">
        <Link to="/" className="logo" onClick={closeMenu}>
          🤖 AI Robots
        </Link>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navLinks ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="navLink" onClick={closeMenu}>🏠 Home</Link>

          <a
            href="https://t.me/+QAfFaYJsN4hlOWM1"
            target="_blank"
            rel="noopener noreferrer"
            className="navLink"
            style={{ color: "#0088cc" }}
            onClick={closeMenu}
          >
            💬 Telegram
          </a>

          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="navLink" onClick={closeMenu}>📊 Dashboard</Link>
              <Link to="/profile" className="navLink" onClick={closeMenu}>👤 Profile</Link>
              <Link to="/withdrawal-history" className="navLink" onClick={closeMenu}>📜 Withdrawals</Link>
              <Link to="/refer-and-earn" className="navLink" onClick={closeMenu}>🎁 Refer & Earn</Link>

              {isAdmin && (
                <Link to="/admin" className="navLink" style={{ color: "#dc2626" }} onClick={closeMenu}>
                  🔐 Admin
                </Link>
              )}

              <div className="userChip">
                <span style={{ fontSize: 14, color: "#64748b" }}>
                  Hi, <strong style={{ color: "#1e293b" }}>{userName}</strong>
                </span>
                <button className="logoutBtn" onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}

          {!isLoggedIn && (
            <Link to="/auth" onClick={closeMenu} style={{ marginTop: 8 }}>
              <button className="loginBtn">Login / Register</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}