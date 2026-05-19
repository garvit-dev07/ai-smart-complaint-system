import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../hooks/useAuth";
import AIAnalysisCard from "./AIAnalysisCard";

const statusOptions = ["Pending", "In Progress", "Resolved", "Rejected"];

export default function ComplaintList({ statusOnly = false }) {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {};
      if (category) params.category = category;
      if (location) params.location = location;
      if (search) params.search = search;

      const { data } = await api.get("/complaints", { params });
      setComplaints(data.complaints);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to fetch complaints");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/complaints/${id}`, { status });
      await loadComplaints();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/complaints/${id}`);
      await loadComplaints();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Delete failed");
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            {statusOnly ? "Complaint Status Update Page" : "Complaint List Page"}
          </span>
          <h1>{statusOnly ? "Track and update statuses" : "Complaints overview and tracking"}</h1>
          <p>Filter by category, search by location, and monitor AI-generated routing.</p>
        </div>
      </div>

      <div className="panel filter-row">
        <input
          placeholder="Search by text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <input
          placeholder="Search by location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <input
          placeholder="Filter by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button className="primary-button" type="button" onClick={loadComplaints}>
          Apply Filters
        </button>
      </div>

      {error ? <p className="error-text">{error}</p> : null}
      {loading ? <p>Loading complaints...</p> : null}

      <div className="complaint-grid">
        {complaints.map((complaint) => (
          <article className="complaint-card" key={complaint._id}>
            <div className="card-topline">
              <span className="status-pill">{complaint.status}</span>
              <span className="muted-text">{complaint.category}</span>
            </div>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <p>
              <strong>Citizen:</strong> {complaint.name} ({complaint.email})
            </p>
            <p>
              <strong>Location:</strong> {complaint.location}
            </p>
            <p>
              <strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}
            </p>

            <div className="status-row">
              {isAdmin ? (
                <select
                  value={complaint.status}
                  onChange={(event) => handleStatusUpdate(complaint._id, event.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="readonly-status">Status: {complaint.status}</span>
              )}

              {isAdmin && (
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => handleDelete(complaint._id)}
                >
                  Delete
                </button>
              )}
            </div>

            <AIAnalysisCard complaint={complaint} />
          </article>
        ))}
      </div>
    </section>
  );
}
