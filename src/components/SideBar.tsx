import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileInvoice,
  FaMoneyBill,
  FaChartLine,
  FaUserCog,
  FaCogs,
} from "react-icons/fa";

function Sidebar() {
  return (
    <>
      <div className="d-flex flex-column p-3 bg-light vh-100">
        <h4 className="fw-bold">Client Management</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link text-dark">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/clients" className="nav-link text-dark">
              <FaUsers className="me-2" /> Manage Clients
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/subscriptions" className="nav-link text-dark">
              <FaFileInvoice className="me-2" /> Subscriptions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/payments" className="nav-link text-dark">
              <FaMoneyBill className="me-2" /> Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link text-dark">
              <FaChartLine className="me-2" /> Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user-management" className="nav-link text-dark">
              <FaUserCog className="me-2" /> User Management
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link text-dark">
              <FaCogs className="me-2" /> Settings
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <p>@CIMS: 2025 Version:0.1</p>
        {/* <p>By BoostifyTech</p> */}
      </div>
    </>
  );
}

export default Sidebar;
