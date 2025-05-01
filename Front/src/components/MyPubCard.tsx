import axios from "axios";
import "./MyPubCard.css";
import { useNavigate } from "react-router-dom";

type MyPubCardProps = {
  id: number;
  title: string;
  location: string;
  salary: string;
  description: string;
};

const MyPubCard = ({
  id,
  title,
  location,
  salary,
  description,
}: MyPubCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/job-details/${id}`);
  };

  const handleEdit = () => {
    // Os dados da da vaga a ser editada são enviados pela URL
    // usando state do navigate por que são objetos grandes
    navigate("/EditVacancyForm", {
      state: {
        id: id,
        title: title,
        location: location,
        salary: salary,
        description: description,
      },
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/vacancies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        alert("Vaga excluída com sucesso!");
        // recarregando a página atual para remover a vaga excluída da tela
        navigate(0);
      } else {
        alert(
          "Não foi possível excluir a vaga." +
            response.data.message +
            "\nPor favor, tente novamente."
        );
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido.";
      alert(
        "Não foi possível excluir a vaga." +
          errorMessage +
          "\nPor favor, tente novamente."
      );
    }
  };

  return (
    <div className="job-card my-pub-card">
      <h2 className="job-title">{title}</h2>
      <p className="job-location">{location}</p>
      <p className="job-salary">{salary}</p>
      <p className="job-description">{description}</p>
      <div className="job-buttons">
        <button
          className="details-button mypub-card-details-button"
          onClick={handleViewDetails}
        >
          Ver detalhes
        </button>
        <button
          className="edit-button mypub-card-edit-button"
          onClick={handleEdit}
        >
          Editar
        </button>
        <button
          className="delete-button mypub-card-del-button"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default MyPubCard;
