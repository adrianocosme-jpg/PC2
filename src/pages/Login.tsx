
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { getErrorMessage } from "../api/errorHandler";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const success = location.state?.success;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);

      navigate("/activities", { replace: true });

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Iniciar sesión</h1>
        <p>Bienvenido a Campus Cultura</p>

        {success && (
          <p className="success-message">{success}</p>
        )}

        <label>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />

        {error && (
          <p className="error-message">{error}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando" : "Ingresar"}
        </button>

        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/register">Regstrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
