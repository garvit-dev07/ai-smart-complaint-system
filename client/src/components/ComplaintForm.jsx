import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../hooks/useAuth";

const initialComplaint = {
  name: "",
  email: "",
  title: "",
  description: "",
  category: "Water Supply",
  location: "",
  status: "Pending",
};

const categories = [
  "Water Supply",
  "Electricity",
  "Sanitation",
  "Road Damage",
  "Healthcare",
  "Other",
];

export default function ComplaintForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...initialComplaint,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const { data } = await api.post("/complaints", formData);
      setResult(data.complaint);
      setFormData({
        ...initialComplaint,
        name: user?.name || "",
        email: user?.email || "",
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to submit complaint"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <span className="eyebrow">Complaint Registration Form</span>
          <h1>Register a new complaint</h1>
          <p>Submit complaint details and let AI classify urgency and department.</p>
        </div>
        <button className="ghost-button" type="button" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
      </div>

      <div className="panel split-panel">
        <form className="grid-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

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
            Complaint Title
            <input name="title" value={formData.title} onChange={handleChange} required />
          </label>

          <label>
            Complaint Category
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="full-span">
            Complaint Description
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Location
            <input name="location" value={formData.location} onChange={handleChange} required />
          </label>

          <label>
            Complaint Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          {error ? <p className="error-text full-span">{error}</p> : null}

          <button className="primary-button full-span" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>

        <aside className="side-note">
          <h3>Expected AI Output</h3>
          <ul className="plain-list">
            <li>Complaint priority detection</li>
            <li>Department recommendation</li>
            <li>Complaint summary</li>
            <li>Auto-generated response message</li>
          </ul>

          {result ? (
            <div className="success-box">
              <h4>Complaint stored successfully</h4>
              <p>Status: {result.status}</p>
              <p>Priority: {result.priority}</p>
              <p>Department: {result.department}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
