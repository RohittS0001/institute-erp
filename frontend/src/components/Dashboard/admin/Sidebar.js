import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const menuItems = [
  { path: 'admin', icon: '🏠', label: 'Dashboard' },
  { path: 'institutes', icon: '🏫', label: 'Institutes' },
  { path: 'users', icon: '👥', label: 'Users' },
  { path: 'courses', icon: '📚', label: 'Courses' },
  { path: 'financials', icon: '💰', label: 'Financials' },
  { path: 'reports', icon: '📊', label: 'Reports' },
  { path: 'notifications', icon: '🔔', label: 'Notifications' },
  { path: 'settings', icon: '⚙️', label: 'Settings' },
];


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{collapsed ? 'ERP' : 'ERP Admin'}</h2>
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          {collapsed ? '➡' : '⬅'}
        </button>
      </div>
      <nav className="sidebar-menu">
       {menuItems.map(item => (
            <NavLink
                to={`/dashboard/admin/${item.path}`}
                key={item.label}
                className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
                }
                end
            >
                <span className="sidebar-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar-text">{item.label}</span>}
            </NavLink>
            ))}

      </nav>
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="user-info">
            <img src="/avatar.png" alt="User Avatar" className="avatar" />
            <div>
              <p className="user-name">Admin User</p>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
