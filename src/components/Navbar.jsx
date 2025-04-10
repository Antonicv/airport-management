import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Barra de navegación principal
 * @returns {JSX.Element} Componente de navegación
 */
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Airport Management
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="ghost">
            <Link to="/flights">Vuelos</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/aircraft">Aviones</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/passengers">Pasajeros</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/airports">Aeropuertos</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}