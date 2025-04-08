import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/**
 * Página principal de la aplicación de aeropuerto
 * @returns {JSX.Element} Componente de la página de inicio
 */
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Sistema de Gestión Aeroportuaria
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Bienvenido al sistema integral de gestión de vuelos, pasajeros, tripulación y reservas del aeropuerto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Button 
            onClick={() => navigate('/flights')}
            className="h-24 text-lg flex flex-col items-center justify-center gap-2"
            variant="outline"
          >
            <FlightIcon />
            Gestión de Vuelos
          </Button>
          
          <Button 
            onClick={() => navigate('/aircraft')}
            className="h-24 text-lg flex flex-col items-center justify-center gap-2"
            variant="outline"
          >
            <PlaneIcon />
            Gestión de Aviones
          </Button>
          
          <Button 
            onClick={() => navigate('/passengers')}
            className="h-24 text-lg flex flex-col items-center justify-center gap-2"
            variant="outline"
          >
            <UsersIcon />
            Gestión de Pasajeros
          </Button>
          
          <Button 
            onClick={() => navigate('/bookings')}
            className="h-24 text-lg flex flex-col items-center justify-center gap-2"
            variant="outline"
          >
            <TicketIcon />
            Sistema de Reservas
          </Button>

          {/* Nuevo botón para gestión de aeropuertos */}
          <Button 
            onClick={() => navigate('/airports')}
            className="h-24 text-lg flex flex-col items-center justify-center gap-2"
            variant="outline"
          >
            <AirportIcon />
            Gestión de Aeropuertos
          </Button>
        </div>
      </main>
    </div>
  );
}

// Componentes de iconos simples en svg para cada botón no sabia que se pidiera hacer esto...cool
function FlightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      <path d="M13 5v2"/>
      <path d="M13 17v2"/>
      <path d="M13 11v2"/>
    </svg>
  );
}

function AirportIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3H3v7h7V3z"/>
      <path d="M21 3h-7v7h7V3z"/>
      <path d="M21 14h-7v7h7v-7z"/>
      <path d="M10 14H3v7h7v-7z"/>
    </svg>
  );
}