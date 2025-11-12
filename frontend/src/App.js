// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login/Login';
// <<<<<<< HEAD
// import Admin from './components/Dashboard/admin/admin';
// =======

// // Dashboards
// import AdminDashboard from './components/Dashboard/admin/admin';
// >>>>>>> 89dd2958624107b2253790ea3754b51a3682613e
// import UserDashboard from './components/Dashboard/User/User';
// import InstituteDashboard from './components/Dashboard/institute/institute';

// // User Subpages
// import Admissions from './components/Dashboard/User/Admissions';
// import Awards from './components/Dashboard/User/Awards';
// import Research from './components/Dashboard/User/Research';
// import Immersion from './components/Dashboard/User/Immersion';
// import Placement from './components/Dashboard/User/Placement';
// import Profile from './components/Dashboard/User/profile';
// import Donation from './components/Dashboard/User/Donation';
// import MOU from './components/Dashboard/User/MOU';
// import Membership from './components/Dashboard/User/Membership';

// import './App.css';

// function App() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   const ProtectedRoute = ({ element }) =>
//     user?.role === 'user' ? element : <Navigate to="/" />;

//   const AdminRoute = ({ element }) =>
//     user?.role === 'admin' ? element : <Navigate to="/" />;

//   const InstituteRoute = ({ element }) =>
//     user?.role === 'institute' ? element : <Navigate to="/" />;

//   return (
// <<<<<<< HEAD
//  <Router>
//   <Routes>
//     <Route path="/" element={user ? <Navigate to={`/dashboard/${user.role}`} /> : <Login />} />
//     <Route
//       path="/dashboard/admin/*"
//       element={user?.role === 'admin' ? <Admin /> : <Navigate to="/" />}
//     />
//     <Route
//       path="/dashboard/user/*"
//       element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/" />}
//     />
//     <Route
//       path="/dashboard/institute/*"
//       element={user?.role === 'institute' ? <InstituteDashboard /> : <Navigate to="/" />}
//     />
//   </Routes>
// </Router>

// =======
//     <Router>
//       <Routes>
//         {/* ---------- LOGIN ---------- */}
//         <Route path="/" element={<Login />} />

//         {/* ---------- ADMIN DASHBOARD ---------- */}
//         <Route path="/dashboard/admin" element={<AdminRoute element={<AdminDashboard />} />} />

//         {/* ---------- INSTITUTE DASHBOARD ---------- */}
//         <Route
//           path="/dashboard/institute"
//           element={<InstituteRoute element={<InstituteDashboard />} />}
//         />

//         {/* ---------- USER DASHBOARD ---------- */}
//         <Route path="/dashboard/user" element={<ProtectedRoute element={<UserDashboard />} />} />

//         {/* ---------- USER SUBPAGES ---------- */}
//         <Route path="/dashboard/user/admissions" element={<ProtectedRoute element={<Admissions />} />} />
//         <Route path="/dashboard/user/awards" element={<ProtectedRoute element={<Awards />} />} />
//         <Route path="/dashboard/user/research" element={<ProtectedRoute element={<Research />} />} />
//         <Route path="/dashboard/user/immersion" element={<ProtectedRoute element={<Immersion />} />} />
//         <Route path="/dashboard/user/placement" element={<ProtectedRoute element={<Placement />} />} />
//         <Route path="/dashboard/user/profile" element={<ProtectedRoute element={<Profile />} />} />
//         <Route path="/dashboard/user/donation" element={<ProtectedRoute element={<Donation />} />} />
//         <Route path="/dashboard/user/mou" element={<ProtectedRoute element={<MOU />} />} />
//         <Route path="/dashboard/user/membership" element={<ProtectedRoute element={<Membership />} />} />

//         {/* ---------- DEFAULT FALLBACK ---------- */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
// >>>>>>> 89dd2958624107b2253790ea3754b51a3682613e
//   );
// }

// export default App;








import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";

// Dashboards
import AdminDashboard from "./components/Dashboard/admin/admin";
import UserDashboard from "./components/Dashboard/User/User";
import InstituteDashboard from "./components/Dashboard/institute/institute";

// User Subpages
import Admissions from "./components/Dashboard/User/Admissions";
import Awards from "./components/Dashboard/User/Awards";
import Research from "./components/Dashboard/User/Research";
import Immersion from "./components/Dashboard/User/Immersion";
import Placement from "./components/Dashboard/User/Placement";
import Profile from "./components/Dashboard/User/Profile";
import Donation from "./components/Dashboard/User/Donation";
import MOU from "./components/Dashboard/User/MOU";
import Membership from "./components/Dashboard/User/Membership";

import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const ProtectedRoute = ({ element }) =>
    user?.role === "user" ? element : <Navigate to="/" />;

  const AdminRoute = ({ element }) =>
    user?.role === "admin" ? element : <Navigate to="/" />;

  const InstituteRoute = ({ element }) =>
    user?.role === "institute" ? element : <Navigate to="/" />;

  return (
    <Router>
      <Routes>
        {/* ---------- LOGIN ---------- */}
        <Route
          path="/"
          element={
            user ? <Navigate to={`/dashboard/${user.role}`} /> : <Login />
          }
        />

        {/* ---------- ADMIN DASHBOARD ---------- */}
        <Route
          path="/dashboard/admin"
          element={<AdminRoute element={<AdminDashboard />} />}
        />

        {/* ---------- INSTITUTE DASHBOARD ---------- */}
        <Route
          path="/dashboard/institute"
          element={<InstituteRoute element={<InstituteDashboard />} />}
        />

        {/* ---------- USER DASHBOARD ---------- */}
        <Route
          path="/dashboard/user"
          element={<ProtectedRoute element={<UserDashboard />} />}
        />

        {/* ---------- USER SUBPAGES ---------- */}
        <Route
          path="/dashboard/user/admissions"
          element={<ProtectedRoute element={<Admissions />} />}
        />
        <Route
          path="/dashboard/user/awards"
          element={<ProtectedRoute element={<Awards />} />}
        />
        <Route
          path="/dashboard/user/research"
          element={<ProtectedRoute element={<Research />} />}
        />
        <Route
          path="/dashboard/user/immersion"
          element={<ProtectedRoute element={<Immersion />} />}
        />
        <Route
          path="/dashboard/user/placement"
          element={<ProtectedRoute element={<Placement />} />}
        />
        <Route
          path="/dashboard/user/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/dashboard/user/donation"
          element={<ProtectedRoute element={<Donation />} />}
        />
        <Route
          path="/dashboard/user/mou"
          element={<ProtectedRoute element={<MOU />} />}
        />
        <Route
          path="/dashboard/user/membership"
          element={<ProtectedRoute element={<Membership />} />}
        />

        {/* ---------- DEFAULT FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

