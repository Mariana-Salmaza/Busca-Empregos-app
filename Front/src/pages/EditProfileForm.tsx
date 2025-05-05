import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfileForm.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const EditProfileForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    axios
      .get<User>(`http://localhost:3000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
        setLoading(false);
      });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      newPassword,
    };

    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Perfil atualizado:", response.data);

      alert("Perfil atualizado com sucesso!");

      // Redireciona para a página home após sucesso
      navigate("/home");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  if (loading) {
    return <p>Carregando dados do perfil...</p>;
  }

  return (
    <div>
      <h2>Editar Perfil</h2>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha Atual:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit">Atualizar Perfil</button>
        </form>
      ) : (
        <p>Erro ao carregar os dados do perfil.</p>
      )}
    </div>
  );
};

export default EditProfileForm;
