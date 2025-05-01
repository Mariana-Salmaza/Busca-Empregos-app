import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VacancyForm.css";

const EditVacancyForm = () => {
  const { state } = useLocation();
  const { id, title, location, salary, description } = state || {};

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [newTitle, setNewTitle] = useState(title);
  const [newLocation, setNewLocation] = useState(location);
  const [newSalary, setNewSalary] = useState(salary);
  const [newDescription, setNewDescription] = useState(description);

  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newTitle || !newLocation || !newSalary || !newDescription) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/vacancies/${id}`,
        {
          title: newTitle,
          location: newLocation,
          salary: newSalary,
          description: newDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/myPubs");
      } else {
        alert(
          "Não foi possível editar a vaga:" +
            response.data.message +
            "\nPor favor, tente novamente."
        );
        navigate("/myPubs");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Erro ao editar vaga.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Editar Vaga</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Título</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título"
            />
          </div>
          <div className="input-group">
            <label>Localização</label>
            <input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Localização"
            />
          </div>
          <div className="input-group">
            <label>Salário</label>
            <input
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              placeholder="Salário"
            />
          </div>
          <div className="input-group">
            <label>Descrição</label>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="job-card-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/myPubs")}
            >
              Cancelar
            </button>
            <button type="submit" className="action-button">
              Finalizar Edição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVacancyForm;
