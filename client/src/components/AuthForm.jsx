import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../hooks/useAuth";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const getErrorMessage = (requestError, fallbackMessage) => {
    const validationErrors = requestError.response?.data?.errors;

    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      return validationErrors.map((item) => item.message).join(", ");
    }

    return requestError.response?.data?.message || fallbackMessage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const payload = isSignup
        ? formData
        : { email: formData.email, password: formData.password };

      const { data } = await api.post(endpoint, payload);
      saveAuth(data);
      navigate("/");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Authentication failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card">
      <div>
        <span className="eyebrow">{isSignup ? "Create account" : "Welcome back"}</span>
        <h1>{isSignup ? "Sign up for complaint management" : "Login to continue"}</h1>
        <p>Secure JWT authentication with protected complaint modules.</p>
      </div>

      <form className="grid-form" onSubmit={handleSubmit}>
        {isSignup && (
          <label>
            Full Name
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
        )}

        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {error ? <p className="error-text">{error}</p> : null}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      <p className="helper-text">
        {isSignup ? "Already registered?" : "Need an account?"}{" "}
        <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Signup"}</Link>
      </p>
    </section>
  );
}
