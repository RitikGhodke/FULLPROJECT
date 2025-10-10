// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthRegisterPage from "./pages/AuthRegisterPage";
// import ProfilePage from "./pages/ProfilePage";
// import PaymentPage from "./pages/PaymentPage";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthRegisterPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//       </Routes>
//     </Router>
//   );
// }






// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import ProfilePage from "./pages/ProfilePage";
// import PaymentPage from "./pages/PaymentPage";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import ProfilePage from "./pages/ProfilePage";
// import PaymentPage from "./pages/PaymentPage";
// import SuccessPage from "./pages/SuccessPage";
// import CancelPage from "./pages/CancelPage";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div style={{ minHeight: "calc(100vh - 64px)" }}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/payment/:id" element={<PaymentPage />} />
//           <Route path="/success" element={<SuccessPage />} />
//           <Route path="/cancel" element={<CancelPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }





//edit


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import PaymentPage from "./pages/PaymentPage";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import AdminPanel from "./pages/AdminPanel";
// import AuthPage from "./pages/AuthPage"; // Your login/register page

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/payment/:id" element={<PaymentPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/admin" element={<AdminPanel />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 64px)" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </div>
    </Router>
  );
}