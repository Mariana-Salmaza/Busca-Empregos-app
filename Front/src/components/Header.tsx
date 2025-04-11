import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          JobInfo
        </Link>
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobsList" className="nav-link">
              Vagas
            </Link>
          </li>
          <li>
            <Link to="/vacancyForm" className="nav-link">
              Nova
              <br />
              Vaga
            </Link>
          </li>
          <li>
            <Link to="/myPubs" className="nav-link">
              Minhas
              <br />
              Publicações
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
