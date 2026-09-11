import { useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5173";

function SignUp() {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

      const requestData = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

      await axios.post(`${API_URL}${endpoint}`, requestData, {
        withCredentials: true,
      });

      window.location.assign(DASHBOARD_URL);
    } catch (error) {
      console.error("Authentication failed:", error);

      setError(
        error.response?.data?.message ||
          "Unable to complete the request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = () => {
    setIsLogin((currentValue) => !currentValue);
    setError("");

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <div className="border rounded p-4 shadow-sm">
            <h1 className="fs-3 text-center mb-3">
              {isLogin ? "Login to EquityView" : "Create your EquityView account"}
            </h1>

            <p className="text-muted text-center mb-4">
              {isLogin
                ? "Access your trading dashboard."
                : "Start your investing journey today."}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength="2"
                    autoComplete="name"
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />

                {!isLogin && (
                  <div className="form-text">
                    Password must contain at least 8 characters.
                  </div>
                )}
              </div>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Please wait..."
                  : isLogin
                    ? "Login"
                    : "Create account"}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>

              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={toggleForm}
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;