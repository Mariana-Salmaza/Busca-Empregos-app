import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./MyPubs.css";
import MyPubCard from "../components/MyPubCard";

type Vacancy = {
  id: number;
  title: string;
  location: string;
  salary: string;
  description: string;
};

const MyPubs = () => {
  const navigate = useNavigate();
  const [userVacancies, setUserVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPublication, setIsPublication] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserVacancies = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("ID de usuário não encontrado no localStorage.");
        setLoading(false);
        return;
      }

      const id: number = parseInt(userId);

      try {
        const response = await axios.get(
          `http://localhost:3000/vacancies/my/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.status == 400 ||
          response.status == 404 ||
          response.status == 500
        ) {
          setError(response.data.message);
        }
        if (response.status == 204) {
          setIsPublication(false);
        } else {
          setUserVacancies(response.data);
          setIsPublication(true);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido.";
        setError("Erro ao carregar vagas: " + errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVacancies();
  }, [navigate]);

  return (
    <div className="home-container">
      <Header />

      <h2>Minhas Publicações</h2>
      <section className="job-listing mypubs">
        {loading && <p>Carregando vagas...</p>}
        {error && <p className="error page-error">{error}</p>}

        {!isPublication && !error ? (
          <div>
            <h4 className="page-error">
              Parece que você não publicou nenhuma vaga ainda.
            </h4>
            <p>Quando você criar alguma, ela aparecerá aqui.</p>
          </div>
        ) : (
          <>
            {userVacancies.map((vacancy) => (
              <MyPubCard
                key={vacancy.id}
                id={vacancy.id}
                title={vacancy.title}
                location={vacancy.location}
                salary={vacancy.salary}
                description={vacancy.description}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default MyPubs;
