import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li>
          <a href="/contact">Contato</a>
        </li>
        <li>
          <a href="/terms">Termos de Uso</a>
        </li>
        <li>
          <a href="/privacy">Política de Privacidade</a>
        </li>
      </ul>
      <p className="footer-info">&copy; 2025 Todos os direitos reservados</p>
    </footer>
  );
};

export default Footer;
