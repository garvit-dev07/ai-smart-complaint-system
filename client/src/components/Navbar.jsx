import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        Smart Complaint AI
      </Link>

      {user ? (
        <nav className="nav-links">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/register-complaint">Register Complaint</NavLink>
          <NavLink to="/status-updates">Status Updates</NavLink>
          <button className="ghost-button" type="button" onClick={logout}>
            Logout
          </button>
        </nav>
      ) : (
        <nav className="nav-links">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </nav>
      )}
    </header>
  );
}
