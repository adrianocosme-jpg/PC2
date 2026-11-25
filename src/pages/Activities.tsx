
import { useEffect, useState } from "react";
import api from "../api/api";
import axios from "axios";
import Pagination from "../components/Pagination";

interface Activity {
  id: number;
  name: string;
  discipline: string;
  date: string;
  vacancies: number;
  description: string;
  location: string;
}

interface ActivityResponse {
  items: Activity[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadActivities = async (currentPage: number) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get<ActivityResponse>("/activities", {
        params: {
          page: currentPage,
          size: 5
        }
      });

      setActivities(response.data.items);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "No se pudieron cargar las actividades"
        );
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities(page);
  }, [page]);

  return (
    <div className="container">
      <h1>Actividades culturales</h1>
      <p>Descubre las actividades disponibles en CampusCultura.</p>

      {loading && <p>Cargando actividades</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && activities.length === 0 && (
        <p>No hay actividades disponibles.</p>
      )}

    </div>
  );
}

export default Activities;
