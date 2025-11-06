import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import AdminDashboard from './components/Dashboard/admin/admin';
import UserDashboard from './components/Dashboard/User/User';
import InstituteDashboard from './components/Dashboard/institute/institute';
import './App.css';

function App() {
  // Get user info from localStorage (you can enhance this later)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/user"
          element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/institute"
          element={user?.role === 'institute' ? <InstituteDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
