
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length > 100) {
      setError("El nombre es obligatorio y debe tener máximo 100 caracteres");
      return;
    }

    if (password.length < 8 || password.length > 72) {
      setError("La contraseña debe tener entre 8 y 72 caracteres");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: name.trim(),
        email,
        password
      });

      navigate("/login", {
        state: {
          success: "Registro exitoso. Ahora puedes iniciar sesión."
        }
      });

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "No se pudo completar el registro"
        );
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1>Crear cuenta</h1>
        <p>Únete a CampusCultura</p>

        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
          placeholder="Tu nombre"
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="correo@ejemplo.com"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          maxLength={72}
          required
          placeholder="Mínimo 8 caracteres"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando" : "Registrarse"}
        </button>

        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
