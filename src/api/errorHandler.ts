
import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        return message || "Los datos ingresados no son válidos.";

      case 401:
        return message || "Correo o contraseña incorrectos.";

      case 404:
        return message || "El recurso solicitado no existe.";

      case 409:
        return message || "El correo ya está registrado o existe un conflicto.";

      default:
        return message || "Error al comunicarse con el servidor.";
    }
  }

  return "Ocurrió un error inesperado.";
}
