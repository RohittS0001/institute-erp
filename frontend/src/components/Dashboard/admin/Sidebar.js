import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const menuItems = [
  { path: 'admin', icon: 'ri-home-line', color: '#3b82f6', label: 'Dashboard' },
  { path: 'institutes', icon: 'ri-school-line', color: '#10b981', label: 'Institutes' },
  { path: 'users', icon: 'ri-team-line', color: '#f59e0b', label: 'Users' },
  { path: 'AdminImmersion', icon: 'ri-book-line', color: '#8b5cf6', label: 'Academic Immersion' },
  { path: 'Placements', icon: 'ri-briefcase-line', color: '#ef4444', label: 'Placements' },
  { path: 'financials', icon: 'ri-money-dollar-circle-line', color: '#84cc16', label: 'Financials' },
  { path: 'reports', icon: 'ri-bar-chart-line', color: '#06b6d4', label: 'Reports' },
  { path: 'notifications', icon: 'ri-notification-line', color: '#f97316', label: 'Notifications' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const getIcon = (iconName, color) => {
    return (
      <i 
        className={`ri ${iconName}`} 
        style={{ 
          fontSize: '1.25rem',
          color: color,
          transition: 'color 0.2s ease'
        }} 
      />
    );
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{collapsed ? 'ERP' : 'ERP Admin'}</h2>
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map(item => (
          <NavLink
            to={`/dashboard/admin/${item.path}`}
            key={item.label}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            end
          >
            <span className="sidebar-icon">
              {getIcon(item.icon, item.color)}
            </span>
            {!collapsed && <span className="sidebar-text">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="user-info">
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
