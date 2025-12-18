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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'email' && value && !validateEmail(value)) {
      error = 'Please enter a valid email address';
    } else if (name === 'password' && value && !validatePassword(value)) {
      error = 'Password must be at least 8 characters';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    // Actual API call for all roles
    try {
      const response = await axios.post(
        `https://backenderp-production-6374.up.railway.app/api/${formData.role.toLowerCase()}/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      showAlert('Login successful! Redirecting...', 'success');

      
        localStorage.setItem("user", JSON.stringify({
          role: formData.role.toLowerCase(),
          email: formData.email,
          name:
            response.data?.name ||
            response.data?.user?.name ||
            response.data?.admin?.name ||
            ""
        }));

        if (formData.role === 'admin') {
          navigate('/dashboard/admin');
            // window.location.reload();
        } else if (formData.role === 'Institute') {
          navigate('/dashboard/institute');
            // window.location.reload();
        } else if (formData.role === 'User') {
          navigate('/dashboard/user');
            // window.location.reload();
        } else {
          navigate('/');
            // window.location.reload();
        }
      
        setFormData({
          role: '',
          email: '',
          password: '',
          rememberMe: false,
        });
     

    } catch (error) {
      showAlert('Invalid credentials. Please check your role, email and password.', 'error');
    }

    setIsLoading(false);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (formData.email && validateEmail(formData.email)) {
      showAlert(`Password reset link sent to ${formData.email}`, 'success');
    } else {
      showAlert('Please enter a valid email address first', 'error');
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    window.alert('Please contact your system administrator at [admin@company.com](mailto:admin@company.com) to create a new account.');
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo"></div>
            <h1>WELCOME TO SAHFON</h1>
            <p className="subtitle">Sign in to your account to continue</p>
          </div>

          {alert.show && (
            <div className={`alert alert-${alert.type} show`}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="role">Login As <span className="required">*</span></label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'error' : ''}
                required
              >
                <option value="">Select Role</option>
                <option value="Institute">Institute</option>
                <option value="admin">Admin</option>
                <option value="User">User</option>
              </select>
              {errors.role && <div className="error-message show">{errors.role}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your.email@company.com"
                className={errors.email ? 'error' : ''}
                autoComplete="email"
                required
              />
              {errors.email && <div className="error-message show">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password <span className="required">*</span></label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '😶‍🌫️' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="error-message show">{errors.password}</div>}
            </div>

            <div className="form-options">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="forgot-password" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="divider">
            <span>New to the system?</span>
          </div>

          <div className="signup-link">
            Don't have an account?{' '}
            <a href="#" onClick={handleSignupClick}>
              Contact Administrator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;