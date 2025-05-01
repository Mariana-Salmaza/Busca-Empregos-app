import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import "./Home.css";
import axios from "axios";

interface Vacancy {
  id: string;
  title: string;
  location: string;
  salary: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllVacancies, setShowAllVacancies] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchVacancies = async () => {
      try {
        const response = await axios.get<Vacancy[]>(
          "http://localhost:3000/vacancies"
        );
        setVacancies(response.data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [navigate]);

  const handleApiError = (error: unknown) => {
    let errorMessage = "Erro ao carregar vagas.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setError(errorMessage);
    console.error("Erro na requisição:", error);
  };

  const handleShowAllVacancies = () => {
    setShowAllVacancies(true);
  };

  return (
    <>
      <div className="home-container">
        <Header />

        <h2>Vagas Recentes</h2>

        <section className="job-listing">
          {loading && <p>Carregando vagas...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && vacancies.length === 0 ? (
            <p>Nenhuma vaga encontrada.</p>
          ) : (
            <>
              {(showAllVacancies ? vacancies : vacancies.slice(0, 6)).map(
                (vacancy) => (
                  <JobCard
                    key={vacancy.id}
                    id={vacancy.id}
                    title={vacancy.title}
                    location={vacancy.location}
                    salary={vacancy.salary}
                    description={vacancy.description}
                  />
                )
              )}

              {!showAllVacancies && vacancies.length > 6 && (
                <div className="show-more-container">
                  <button
                    className="show-more-btn"
                    onClick={handleShowAllVacancies}
                  >
                    Ver mais vagas
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
