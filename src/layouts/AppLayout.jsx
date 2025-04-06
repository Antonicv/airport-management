import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

/**
 * Layout principal de la aplicación
 * @returns {JSX.Element} Estructura base de la aplicación
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}