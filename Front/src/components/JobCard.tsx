import "./JobCard.css";
import { useNavigate } from "react-router-dom";

type JobCardProps = {
  id: string;
  title: string;
  location: string;
  salary: string;
  description: string;
};

const JobCard = ({
  id,
  title,
  location,
  salary,
  description,
}: JobCardProps) => {
  const navigate = useNavigate();

  const handleApply = () => {
    //navigate(`/apply/${id}`);
    alert("Aplicado com sucesso!");
    //funcionalidde real de envar uma notificação para o contratante (quem postou a vaga)
  };

  const handleViewDetails = () => {
    navigate(`/job-details/${id}`);
  };

  return (
    <div className="job-card">
      <h2 className="job-title">{title}</h2>
      <p className="job-location">{location}</p>
      <p className="job-salary">{salary}</p>
      <p className="job-description">{description}</p>
      <div className="job-buttons">
        <button className="details-button" onClick={handleViewDetails}>
          Ver detalhes
        </button>
        <button className="apply-button" onClick={handleApply}>
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default JobCard;
