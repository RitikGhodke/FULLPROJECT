// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>🚀 Welcome to Jai project</h1>
//       <p style={styles.subtitle}>Choose where you want to go:</p>

//       <div style={styles.buttons}>
//         <button style={styles.btn} onClick={() => navigate("/auth")}>
//           🔑 Login / Register
//         </button>
//         <button style={styles.btn} onClick={() => navigate("/profile")}>
//           👤 Profile Page
//         </button>
//         <button style={styles.btn} onClick={() => navigate("/payment")}>
//           💳 Payment Page
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", textAlign: "center" },
//   title: { fontSize: "2.5rem", marginBottom: "1rem", color: "#333" },
//   subtitle: { fontSize: "1.2rem", marginBottom: "2rem", color: "#666" },
//   buttons: { display: "flex", flexDirection: "column", gap: "1rem" },
//   btn: { padding: "12px 20px", fontSize: "1rem", borderRadius: "8px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" },
// };



// import React from "react";
// import { useNavigate } from "react-router-dom";


// const HomePage = () => {
//   const navigate = useNavigate();

//   // Yaha apni images ka link lagana
//   const products = [
//     {
//       id: 1,
//       name: "AI Robot 1",
//       amount: 100,
//       img: "/images/image1.jpg", // yaha tum upload wali image ka link use karo
//     },
//     {
//       id: 2,
//       name: "AI Robot 2",
//       amount: 500,
//       img: "/images/image2.jpg",
//     },
//     {
//       id: 3,
//       name: "AI Robot 3",
//       amount: 12000,
//       img: "/images/image3.jpg",
//     },
//     {
//       id: 4,
//       name: "AI Robot 4",
//       amount: 2400,
//       img: "/images/image4.jpg",
//     },
//     {
//       id: 5,
//       name: "AI Robot 5",
//       amount: 4980,
//       img: "/images/image5.jpg",
//     },
//     {
//       id: 6,
//       name: "AI Robot 6",
//       amount: 9850,
//       img: "/images/image6.jpg",
//     },
//     {
//       id: 7,
//       name: "AI Robot 7",
//       amount: 15600,
//       img: "/images/image7.jpg",
//     },
//     {
//       id: 8,
//       name: "AI Robot 8",
//       amount: 22450,
//       img: "/images/image8.jpg",
//     },
//     {
//       id: 9,
//       name: "AI Robot 9",
//       amount: 35000,
//       img: "/images/image9.jpg",
//     },
//     {
//       id: 10,
//       name: "AI Robot 10",
//       amount: 55800,
//       img: "/images/image10.jpg",
//     },

//   ];

//   const handleBuy = (amount) => {
//     // payment page par le jao aur amount pass karo
//     navigate("/payment", { state: { amount } });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">AI Robots Store</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="border rounded-lg shadow-md p-4 flex flex-col items-center"
//           >
//             <img
//               src={item.img}
//               alt={item.name}
//               className="w-64 h-64 object-cover rounded-lg"
//             />
//             <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
//             <p className="mt-2 text-gray-700">
//               Purchase Amount: <span className="font-bold">₹{item.amount}</span>
//             </p>
//             <p className="text-sm text-gray-500">Validity: 2 days</p>
//             <p className="text-sm text-green-600">
//               Daily Profit: ₹10 per day
//             </p>
//             <button
//               onClick={() => handleBuy(item.amount)}
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// 



// import React from "react";
// import { Link } from "react-router-dom";

// const products = [
//   { id:1, name:"AI Robot 1", price:100, img:"/images/image1.jpg", validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", price:500, img:"/images/image2.jpg", validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", price:1200, img:"/images/image3.jpg", validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", price:2400, img:"/images/image4.jpg", validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", price:4980, img:"/images/image5.jpg", validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", price:9850, img:"/images/image6.jpg", validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", price:15600, img:"/images/image7.jpg", validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", price:22450, img:"/images/image8.jpg", validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", price:35000, img:"/images/image9.jpg", validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", price:55800, img:"/images/image10.jpg", validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// export default function HomePage(){
//   return (
//     <div style={{padding:24}}>
//       <h1 style={{textAlign:"center", marginBottom:18}}>🤖 AI Robots Marketplace</h1>

//       {/* horizontal scroll row */}
//       <div style={{display:"flex", gap:16, overflowX:"auto", paddingBottom:12}}>
//         {products.map(p => (
//           <div key={p.id} style={{
//             minWidth:320, background:"var(--card)", borderRadius:12,
//             boxShadow:"0 10px 30px rgba(15,23,42,0.06)", padding:12, flexShrink:0
//           }}>
//             <div style={{height:200, overflow:"hidden", borderRadius:8}}>
//               <img src={p.img} alt={p.name} style={{width:"100%", height:"100%", objectFit:"cover"}} onError={e=>e.target.src="/images/placeholder.jpg"} />
//             </div>

//             <h3 style={{marginTop:12, marginBottom:6}}>{p.name}</h3>
//             <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
//               <div>
//                 <div style={{fontWeight:700, color:"var(--primary)"}}>₹{p.price}</div>
//                 <div style={{fontSize:13, color:"var(--muted)"}}>Validity: {p.validityDays} days</div>
//                 <div style={{fontSize:13, color:"#059669"}}>Daily: ₹{Number(p.dailyProfit).toFixed(2)}</div>
//               </div>

//               <div style={{display:"flex", flexDirection:"column", gap:8}}>
//                 <Link to={`/payment/${p.id}`} style={{background:"var(--primary)", color:"#fff", padding:"8px 12px", borderRadius:8, textDecoration:"none"}}>Buy Now</Link>
//                 <Link to="/profile" style={{background:"#eef2ff", color:"var(--primary)", padding:"8px 12px", borderRadius:8, textDecoration:"none"}}>Profile</Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










//edit
import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id:1, name:"AI Robot 1", price:100, img:"/images/image1.jpg", validityDays:2, totalProfit:30, dailyProfit:15 },
  { id:2, name:"AI Robot 2", price:500, img:"/images/image2.jpg", validityDays:5, totalProfit:125, dailyProfit:25 },
  { id:3, name:"AI Robot 3", price:1200, img:"/images/image3.jpg", validityDays:15, totalProfit:450, dailyProfit:30 },
  { id:4, name:"AI Robot 4", price:2400, img:"/images/image4.jpg", validityDays:30, totalProfit:1350, dailyProfit:45 },
  { id:5, name:"AI Robot 5", price:4980, img:"/images/image5.jpg", validityDays:45, totalProfit:2220, dailyProfit:49.33 },
  { id:6, name:"AI Robot 6", price:9850, img:"/images/image6.jpg", validityDays:60, totalProfit:8150, dailyProfit:135.83 },
  { id:7, name:"AI Robot 7", price:15600, img:"/images/image7.jpg", validityDays:90, totalProfit:24900, dailyProfit:276.66 },
  { id:8, name:"AI Robot 8", price:22450, img:"/images/image8.jpg", validityDays:120, totalProfit:60960, dailyProfit:508 },
  { id:9, name:"AI Robot 9", price:35000, img:"/images/image9.jpg", validityDays:150, totalProfit:97500, dailyProfit:650 },
  { id:10, name:"AI Robot 10", price:55800, img:"/images/image10.jpg", validityDays:180, totalProfit:134200, dailyProfit:745.55 }
];

export default function HomePage(){
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px"
    }}>
      {/* Header Section */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto 40px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 800,
          color: "#fff",
          marginBottom: 12,
          textShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>
          🤖 AI Robots Marketplace
        </h1>
        <p style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.9)",
          maxWidth: 600,
          margin: "0 auto"
        }}>
          Invest in AI Robots and earn daily profits automatically
        </p>
      </div>

      {/* Products Grid */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
        padding: "0 12px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.15)";
          }}>
            
            {/* Product Image */}
            <div style={{
              height: 220,
              overflow: "hidden",
              position: "relative",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }}>
              <img 
                src={p.img} 
                alt={p.name} 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease"
                }} 
                onError={e => e.target.src = "/images/placeholder.jpg"}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              />
              
              {/* Badge */}
              <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(255,255,255,0.95)",
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                color: "#667eea",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}>
                {p.validityDays} Days
              </div>
            </div>

            {/* Product Details */}
            <div style={{ padding: 20 }}>
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 12,
                color: "#1e293b"
              }}>
                {p.name}
              </h3>

              {/* Stats Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
                padding: "12px 0",
                borderTop: "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0"
              }}>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
                    Daily Profit
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#059669" }}>
                    ₹{Number(p.dailyProfit).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
                    Total Profit
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0891b2" }}>
                    ₹{p.totalProfit}
                  </div>
                </div>
              </div>

              {/* Price & Button */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12
              }}>
                <div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 2 }}>
                    Investment
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#667eea" }}>
                    ₹{p.price}
                  </div>
                </div>

                <Link 
                  to={`/payment/${p.id}`} 
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: 10,
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s ease",
                    display: "inline-block"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
                  }}
                >
                  Buy Now →
                </Link>
              </div>

              {/* ROI Badge */}
              <div style={{
                marginTop: 12,
                padding: "8px 12px",
                background: "#f0fdf4",
                borderRadius: 8,
                textAlign: "center",
                fontSize: 13,
                color: "#166534",
                fontWeight: 600
              }}>
                🎯 ROI: {Math.round((p.totalProfit / p.price) * 100)}% in {p.validityDays} days
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{
        maxWidth: 1200,
        margin: "60px auto 0",
        textAlign: "center",
        padding: "40px 20px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: 16,
        backdropFilter: "blur(10px)"
      }}>
        <h2 style={{ color: "#fff", marginBottom: 12, fontSize: 28 }}>
          Start Earning Today! 🚀
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>
          Choose your AI Robot and watch your investment grow daily
        </p>
      </div>
    </div>
  );
}