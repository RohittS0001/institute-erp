import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    role: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'email' && value && !validateEmail(value)) {
      error = 'Please enter a valid email address';
    }
    if (name === 'password' && value && !validatePassword(value)) {
      error = 'Password must be at least 8 characters';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });
    setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Min 8 characters';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setIsLoading(true);

    const role = formData.role.toLowerCase(); // 🔥 FIX: normalize role

    try {
      const response = await axios.post(
        `https://backenderp-production-6374.up.railway.app/api/${role}/login`,
        {
          email: formData.email,
          password: formData.password
        },
        { timeout: 10000 }
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          role,
          email: formData.email,
          name:
            response.data?.name ||
            response.data?.user?.name ||
            response.data?.admin?.name ||
            ''
        })
      );

      showAlert('Login successful!', 'success');
      setIsLoading(false); // 🔥 FIX: stop loading before navigation

      if (role === 'admin') navigate('/dashboard/admin', { replace: true });
      else if (role === 'institute') navigate('/dashboard/institute', { replace: true });
      else navigate('/dashboard/user', { replace: true });

      setFormData({
        role: '',
        email: '',
        password: '',
        rememberMe: false
      });

    } catch (error) {
      setIsLoading(false);
      showAlert('Invalid credentials. Please try again.', 'error');
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">

          <div className="login-header">
            <h1>WELCOME TO SAHFON</h1>
            <p className="subtitle">Sign in to your account</p>
          </div>

          {alert.show && (
            <div className={`alert alert-${alert.type}`}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label>Login As *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'error' : ''}
              >
                <option value="">Select Role</option>
                <option value="institute">Institute</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password *</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
