import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VacancyForm.css";

function VacancyForm() {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const user_id = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !location || !salary || !description) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/vacancies",
        {
          user_id,
          title,
          location,
          salary,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Nova vaga criada com sucesso!");
      navigate("/myPubs");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Erro ao criar vaga.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Criação de Nova Vaga</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
            />
          </div>
          <div className="input-group">
            <label>Localização</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localização"
            />
          </div>
          <div className="input-group">
            <label>Salário</label>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Salário"
            />
          </div>
          <div className="input-group">
            <label>Descrição</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <div className="job-card-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/home")}
            >
              Cancelar
            </button>
            <button type="submit" className="action-button">
              Publicar Nova Vaga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VacancyForm;
