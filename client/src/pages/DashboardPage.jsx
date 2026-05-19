import { Link } from "react-router-dom";
import ComplaintList from "../components/ComplaintList";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">AI-Based Smart Complaint Management System</span>
          <h1>Route public complaints faster with MERN + AI automation</h1>
          <p>
            Welcome {user?.name}. Use the dashboard to register complaints, classify urgency,
            recommend the right department, and track resolution progress securely.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/register-complaint">
              Register Complaint
            </Link>
            <Link className="ghost-button" to="/status-updates">
              View Status Updates
            </Link>
          </div>
        </div>
        <div className="hero-metrics">
          <div className="metric-card">
            <strong>AI Analysis</strong>
            <span>Priority, summary, response, department suggestion</span>
          </div>
          <div className="metric-card">
            <strong>Tracking</strong>
            <span>Filter, search, and update complaint statuses</span>
          </div>
        </div>
      </section>

      <ComplaintList />
    </>
  );
}
