import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegStar,
  FaBriefcase,
  FaClock,
  FaGift,
} from "react-icons/fa";
import "./JobDetails.css";

type Job = {
  id: number;
  title: string;
  location: string;
  description: string;
  salary: string;
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/vacancies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJob(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da vaga:", err);
        setError(
          "Não foi possível carregar os detalhes da vaga. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!job) return <p>Vaga não encontrada.</p>;

  return (
    <div className="job-details-container">
      <div className="job-summary">
        <h1>{job.title}</h1>
        <p>
          <FaMapMarkerAlt /> {job.location}
        </p>
        <p>
          <FaDollarSign /> {job.salary}
        </p>
      </div>

      <div className="job-description">
        <h2>Descrição da Vaga</h2>
        <p>{job.description}</p>
      </div>

      <div className="job-extra-info">
        <p>
          <FaBriefcase /> <strong>Tipo de Contrato:</strong> CLT
        </p>
        <p>
          <FaClock /> <strong>Horário:</strong> Segunda a Sexta, 09h às 18h
        </p>
        <p>
          <FaBriefcase /> <strong>Experiência Requerida:</strong> 2+ anos
        </p>
        <p>
          <FaGift /> <strong>Benefícios:</strong> Vale Refeição, Vale
          Transporte, Plano de Saúde
        </p>
      </div>

      <div className="job-rating">
        <h3>Avaliação da Empresa</h3>
        <div className="stars">
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => navigate(-1)} className="cancel-button">
          Voltar
        </button>
        <button onClick={() => alert("Vaga salva!")}>Salvar Vaga</button>
        <button onClick={() => alert("Compartilhar vaga!")}>
          Compartilhar
        </button>
        <button
          onClick={() => navigate(`/apply/${job.id}`)}
          className="action-button"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
