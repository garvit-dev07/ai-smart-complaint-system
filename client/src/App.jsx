import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import ComplaintRegistrationPage from "./pages/ComplaintRegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StatusUpdatesPage from "./pages/StatusUpdatesPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-frame">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register-complaint"
                element={
                  <ProtectedRoute>
                    <ComplaintRegistrationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/status-updates"
                element={
                  <ProtectedRoute>
                    <StatusUpdatesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
