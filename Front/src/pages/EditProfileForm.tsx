import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./VacancyForm.css";

const EditProfileForm = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false); 

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    axios
      .get<any>(`http://localhost:3000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { name, email } = response.data;
        setUser(response.data);
        setName(name);
        setEmail(email);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
        setLoading(false);
      });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    if (newPassword && !password) {
      alert("Informe sua senha atual para alterar a senha.");
      return;
    }

    const userData: any = { name, email };
    if (newPassword) {
      userData.password = password;
      userData.newPassword = newPassword;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );


      localStorage.setItem("userName", response.data.user.name);

      await Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Perfil atualizado com sucesso.",
        confirmButtonText: "OK",
      });

      navigate("/home");
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      const msg =
        error?.response?.data?.error || "Erro ao atualizar perfil. Tente novamente.";
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Carregando dados do perfil...</p>;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Editar Perfil</h2>
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Senha Atual (necessária para trocar a senha):</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isChangingPassword}
                required={isChangingPassword} 
              />
            </div>

            <div className="input-group">
              <label>Nova Senha:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setIsChangingPassword(e.target.value.length > 0);
                }}
              />
            </div>

            <div className="job-card-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/profile")}
              >
                Cancelar
              </button>
              <button type="submit" className="action-button" disabled={isSubmitting}>
                {isSubmitting ? "Atualizando..." : "Atualizar Perfil"}
              </button>
            </div>
          </form>
        ) : (
          <p>Erro ao carregar os dados do perfil.</p>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
