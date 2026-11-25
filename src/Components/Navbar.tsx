
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/activities" className="logo">
        CampusCultura
      </Link>

      <div className="nav-links">
        <Link to="/activities">Actividades</Link>
        <Link to="/my-enrollments">Mis inscripciones</Link>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;
