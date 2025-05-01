import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-description">
          JobInfo é uma plataforma de busca de empregos que conecta talentos a
          oportunidades em todo o Brasil.
        </p>

        <ul className="footer-links">
          <li>Termos de Uso</li>
          <li>Política de Privacidade</li>
        </ul>

        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/mariana-salmaza-7a3a0b345/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Mariana-Salmaza"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://wa.me/5544988021644"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={24} />
          </a>
          <a href="mailto:marianasalmaza.jobs@gmail.com">
            <FaEnvelope size={24} />
          </a>
        </div>

        <p className="footer-info">&copy; 2025 Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
