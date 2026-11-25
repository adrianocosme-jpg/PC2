
interface Props {
  page: number;
  totalPages: number;
  onChange: (page: string) => void;
}

function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
