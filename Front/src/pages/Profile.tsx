import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
} 

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
        setLoading(false);
      });
  }, [navigate]);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (loading) {
    return <p>Carregando dados do perfil...</p>;
  }

  return (
    <div>
      <h2>Perfil</h2>
      {user ? (
        <>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEditProfile}>Editar Perfil</button>
        </>
      ) : (
        <p>Erro ao carregar os dados do perfil.</p>
      )}
    </div>
  );
};

export default Profile;
