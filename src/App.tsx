import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Subscriptions from "./pages/Subscriptions";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import "./App.css"; // Ensure custom styles are applied

const App: React.FC = () => {
  return (
    <Router>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - Fixed Left */}
          <div className="col-md-2">
            <SideBar />
          </div>

          {/* Content Area - Right Side */}
          <div className="col-md-10">
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/preferences" element={<Preferences />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
