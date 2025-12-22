import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: ''
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9+\-\s]{7,15}$/.test(phone);
  const validatePasswordLength = (password) => password.length >= 8;

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (!password) return '';
    if (score <= 2) return 'Weak';
    if (score === 3) return 'Medium';
    return 'Strong';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setMsg('');
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'password') {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.role) {
      errors.role = 'Please select a role.';
    }

    if (!form.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!validateEmail(form.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!validatePhone(form.phone)) {
      errors.phone = 'Enter a valid phone number.';
    }

    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (!validatePasswordLength(form.password)) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(
        'https://backenderp-production-6374.up.railway.app/api/user/register',
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim(),
          role: form.role.toLowerCase()
        }
      );

      setMsg('Registration successful! Redirecting to login...');
      setError('');
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: ''
      });
      setPasswordStrength('');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const backendError =
        err.response?.data?.error || 'Unable to register. Please try again.';
      setError(backendError);
      setMsg('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h2 className="register-title">SAHFON ACCOUNT</h2>
        <p className="register-subtitle">
          Register with your details below to access the portal.
        </p>

        <label className="register-label">
          Role <span className="required">*</span>
        </label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className={fieldErrors.role ? 'input-error' : ''}
          style={{
            marginBottom: 6,
            padding: '13px 12px',
            borderRadius: 8,
            border: '1.5px solid #dde6fa'
          }}
        >
          <option value="">Select Role</option>
          {/* <option value="admin">Admin</option>... */}
          <option value="user">User</option>
          <option value="institute">Institute</option>
        </select>
        {fieldErrors.role && (
          <div className="error-message">{fieldErrors.role}</div>
        )}

        <label className="register-label">
          Name <span className="required">*</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          required
          className={fieldErrors.name ? 'input-error' : ''}
        />
        {fieldErrors.name && (
          <div className="error-message">{fieldErrors.name}</div>
        )}

        <label className="register-label">
          Email <span className="required">*</span>
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
          type="email"
          required
          className={fieldErrors.email ? 'input-error' : ''}
        />
        {fieldErrors.email && (
          <div className="error-message">{fieldErrors.email}</div>
        )}

        <label className="register-label">
          Phone Number <span className="required">*</span>
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className={fieldErrors.phone ? 'input-error' : ''}
        />
        {fieldErrors.phone && (
          <div className="error-message">{fieldErrors.phone}</div>
        )}

        <label className="register-label">
          Password <span className="required">*</span>
        </label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password (min 8 characters)"
          type="password"
          required
          className={fieldErrors.password ? 'input-error' : ''}
        />
        {fieldErrors.password && (
          <div className="error-message">{fieldErrors.password}</div>
        )}
        {passwordStrength && (
          <div className={`password-strength strength-${passwordStrength.toLowerCase()}`}>
            Password strength: <strong>{passwordStrength}</strong>
          </div>
        )}

        <label className="register-label">
          Confirm Password <span className="required">*</span>
        </label>
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
          type="password"
          required
          className={fieldErrors.confirmPassword ? 'input-error' : ''}
        />
        {fieldErrors.confirmPassword && (
          <div className="error-message">{fieldErrors.confirmPassword}</div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {error && <div className="error-message global">{error}</div>}
        {!error && msg && (
          <div className="success-message global">{msg}</div>
        )}

        <div className="register-login-link">
          Already have an account?{' '}
          <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
