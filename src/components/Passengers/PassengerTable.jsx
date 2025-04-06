export default function PassengerTable({ passengers, onEdit, onDelete }) {
    return (
      <table className="min-w-full border">
        <thead>
          <tr>
            {/* Encabezados de columnas */}
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map(passenger => (
            <tr key={passenger.id}>
              <td>{passenger.firstName} {passenger.lastName}</td>
              <td>{passenger.email}</td>
              <td>
                <button 
                  onClick={() => onEdit(passenger.id)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(passenger.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }