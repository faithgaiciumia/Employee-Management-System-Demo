import { BrowserRouter as Router, Link } from "react-router-dom";
import Contents from "./Contents.js";
import '../App.css';
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning d-flex justify-content-around">
      <h2>Employee Management System</h2>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/employees">
            Employee List
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function Page() {
  return (
    <Router>
      <div>
        <NavBar />
        <Contents />
      </div>
    </Router>
  );
}
