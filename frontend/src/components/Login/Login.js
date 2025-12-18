import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE ="https://backenderp-production-6374.up.railway.app/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ----------------- Helpers ----------------- */

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showAlert = (message, type = "error") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 4000);
  };

  /* ----------------- Handlers ----------------- */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Minimum 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ----------------- Submit ----------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const role = formData.role.toLowerCase();
    const loginUrl = `${API_BASE}/${role}/login`;

    try {
      const res = await axios.post(
        loginUrl,
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
        },
        { timeout: 10000 }
      );

      /* ---- Normalize response for ALL roles ---- */
      const userData =
        res.data?.admin ||
        res.data?.institute ||
        res.data?.user ||
        res.data;

      if (!userData) {
        throw new Error("Invalid login response");
      }

      /* ---- Standard user object ---- */
      const user = {
        role,
        id: userData.id || null,
        email: userData.email || formData.email,
      };

      localStorage.setItem("user", JSON.stringify(user));

      showAlert("Login successful", "success");

      /* ---- Role based redirect ---- */
      if (role === "admin") {
        navigate("/dashboard/admin", { replace: true });
      } else if (role === "institute") {
        navigate("/dashboard/institute", { replace: true });
      } else {
        navigate("/dashboard/user", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.status === 401) {
        showAlert("Invalid email or password");
      } else if (err.code === "ECONNABORTED") {
        showAlert("Server timeout. Try again.");
      } else {
        showAlert("Server error. Please try later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* ----------------- UI ----------------- */

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
                className={errors.role ? "error" : ""}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="institute">Institute</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <span className="error-message">{errors.role}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password *</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">
                  {errors.password}
                </span>
              )}
            </div>

            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
