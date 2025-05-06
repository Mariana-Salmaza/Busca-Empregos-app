import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const { token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (isAuthenticated && token && userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.name);
          localStorage.setItem("userName", response.data.name);
        })
        .catch((err) => {
          console.error("Erro ao carregar os dados do usuário.", err);
        });
    }
  }, [isAuthenticated, token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

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
            <li className="user-dropdown" ref={dropdownRef}>
              <FaUserCircle
                size={40}
                className="user-icon"
                onClick={toggleMenu}
                style={{ cursor: "pointer" }}
              />
              {menuAberto && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">Bem-vindo, {userName}!</li>
                  <li>
                    <Link to="/profile/edit" className="dropdown-item">
                      Editar Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout-button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
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
