import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import SearchForm from "../components/SearchForm";
import JobCard from "../components/JobCard";
import Header from "../components/Header";
import "./Home.css";
import "./JobsList.css";

type JobListing = {
  id: string;
  title: string;
  location: string;
  description: string;
  salary: string;
};

const JobsList = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !location.pathname.includes("/job-details")) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/vacancies",
          {
            params: { search, location: locationFilter },
          }
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        let message = "Erro ao carregar vagas.";
        if (axios.isAxiosError(error)) {
          message = error.response?.data?.message || error.message;
        }
        setError(message);
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [search, locationFilter]);

  useEffect(() => {
    let filtered = jobs;

    if (search) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [search, locationFilter, jobs]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (locationFilter) params.set("location", locationFilter);

    navigate(`/jobsList?${params.toString()}`, { replace: true });
  }, [search, locationFilter, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="home-container">
      <Header />
      <SearchForm
        search={search}
        setSearch={setSearch}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        onSubmit={handleSubmit}
      />
      <h2 className="second-title">Lista de Vagas</h2>

      <section className="job-listing">
        {loading && <p>Carregando vagas...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && filteredJobs.length === 0 ? (
          <p>Nenhuma vaga encontrada.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              location={job.location}
              salary={job.salary}
              description={job.description}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default JobsList;
