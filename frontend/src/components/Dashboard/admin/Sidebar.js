import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const menuItems = [
  { path: '/dashboard/admin', icon: '🏠', label: 'Dashboard' },
  { path: '/dashboard/admin/institutes', icon: '🏫', label: 'Institutes' },
  { path: '/dashboard/admin/users', icon: '👥', label: 'Users' },
  { path: '/dashboard/admin/courses', icon: '📚', label: 'Courses' },
  { path: '/dashboard/admin/financials', icon: '💰', label: 'Financials' },
  { path: '/dashboard/admin/reports', icon: '📊', label: 'Reports' },
  { path: '/dashboard/admin/notifications', icon: '🔔', label: 'Notifications' },
  { path: '/dashboard/admin/settings', icon: '⚙️', label: 'Settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{collapsed ? 'ERP' : 'ERP Admin'}</h2>
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          {collapsed ? '➡' : '⬅'}
        </button>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className="sidebar-link"
            activeClassName="active"
            exact
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
              <button className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
