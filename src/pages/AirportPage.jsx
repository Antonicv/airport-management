import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import AirportFormModal from '../components/Airports/AirportFormModal';

export default function AirportsPage() {
    const [airportsData, setAirportsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAirport, setCurrentAirport] = useState(null);
    const [detailsAirport, setDetailsAirport] = useState(null);

    const fetchAirports = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/airports');
            console.log('Respuesta de la API:', response.data);
            const apiData = response.data?.data || response.data || [];
            console.log('Datos de aeropuertos:', apiData);

            const normalizedData = apiData.map(airport => ({
                id: airport.id || airport.ID,
                iataCode: airport.iata_code || airport.iataCode,
                icaoCode: airport.icao_code || airport.icaoCode,
                name: airport.name,
                city: airport.city,
                country: airport.country,
                region: airport.region,
                numberOfTerminals: airport.number_of_terminals || airport.numberOfTerminals,
                numberOfGates: airport.number_of_gates || airport.numberOfGates,
                hasInternationalFlights: airport.has_international_flights || airport.hasInternationalFlights,
                contactEmail: airport.contact_email || airport.contactEmail,
                contactPhone: airport.contact_phone || airport.contactPhone,
                website: airport.website,
                altitude: airport.altitude,
                latitude: airport.latitude,
                longitude: airport.longitude,
                timezone: airport.timezone,
                dst: airport.dst,
            }));

            setAirportsData(normalizedData);
        } catch (err) {
            console.error('Error al cargar aeropuertos:', err);
            setError('Error al cargar los datos de aeropuertos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAirports();
    }, []);

    const handleAdd = () => {
        setCurrentAirport(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id) => {
        const airport = airportsData.find(a => a.id === id);
        setCurrentAirport(airport);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este aeropuerto?')) {
            try {
                await axios.delete(`/airports/${id}`);
                fetchAirports();
            } catch (err) {
                console.error('Error al eliminar:', err);
                setError('Error al eliminar el aeropuerto');
            }
        }
    };

    const handleShowDetails = (airport) => {
        setDetailsAirport(airport);
    };

    const handleCloseDetails = () => {
        setDetailsAirport(null);
    };

    const handleSubmit = async (formData) => {
        try {
            if (currentAirport) {
                await axios.put(`/airports/${currentAirport.id}`, formData);
            } else {
                await axios.post('/airports', formData);
            }
            fetchAirports();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error al guardar:', err);
            setError('Error al guardar los cambios del aeropuerto');
        }
    };

    if (loading) {
        return <div className="p-4">Cargando...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Aeropuertos</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button onClick={() => setError(null)} className="float-right font-bold">×</button>
                </div>
            )}

            <button
                onClick={handleAdd}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
                + Añadir Aeropuerto
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Código IATA</th>
                            <th className="py-2 px-4 border">Nombre</th>
                            <th className="py-2 px-4 border">Ciudad</th>
                            <th className="py-2 px-4 border">País</th>
                            <th className="py-2 px-4 border">Terminales</th>
                            <th className="py-2 px-4 border">Puertas</th>
                            <th className="py-2 px-4 border">Vuelos Intl.</th>
                            <th className="py-2 px-4 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airportsData.map((airport) => (
                            <tr key={airport.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{airport.iataCode}</td>
                                <td className="py-2 px-4 border">{airport.name}</td>
                                <td className="py-2 px-4 border">{airport.city}</td>
                                <td className="py-2 px-4 border">{airport.country}</td>
                                <td className="py-2 px-4 border text-center">{airport.numberOfTerminals}</td>
                                <td className="py-2 px-4 border text-center">{airport.numberOfGates}</td>
                                <td className="py-2 px-4 border text-center">
                                    {airport.hasInternationalFlights ? '✓' : '✗'}
                                </td>
                                <td className="py-2 px-4 border space-x-1">
                                    <button
                                        onClick={() => handleEdit(airport.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(airport.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Borrar
                                    </button>
                                    <button
                                        onClick={() => handleShowDetails(airport)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AirportFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                airport={currentAirport}
            />

{detailsAirport && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalles del Aeropuerto</h2>
          <button
            onClick={handleCloseDetails}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">Información Básica</h3>
            <p><span className="font-medium">Nombre:</span> {detailsAirport.name}</p>
            <p><span className="font-medium">Código IATA:</span> {detailsAirport.iataCode}</p>
            <p><span className="font-medium">Código ICAO:</span> {detailsAirport.icaoCode}</p>
            <p><span className="font-medium">Ciudad:</span> {detailsAirport.city}</p>
            <p><span className="font-medium">País:</span> {detailsAirport.country}</p>
            <p><span className="font-medium">Región:</span> {detailsAirport.region}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Contacto</h3>
            <p><span className="font-medium">Email:</span> {detailsAirport.contactEmail}</p>
            <p><span className="font-medium">Teléfono:</span> {detailsAirport.contactPhone}</p>
            <p><span className="font-medium">Sitio Web:</span> 
              <a href={detailsAirport.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                {detailsAirport.website}
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Infraestructura</h3>
            <p><span className="font-medium">Terminales:</span> {detailsAirport.numberOfTerminals}</p>
            <p><span className="font-medium">Puertas:</span> {detailsAirport.numberOfGates}</p>
            <p><span className="font-medium">Vuelos Internacionales:</span> {detailsAirport.hasInternationalFlights ? 'Sí' : 'No'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Ubicación</h3>
            <p><span className="font-medium">Altitud:</span> {detailsAirport.altitude} m</p>
            <p><span className="font-medium">Latitud:</span> {detailsAirport.latitude}</p>
            <p><span className="font-medium">Longitud:</span> {detailsAirport.longitude}</p>
            <p><span className="font-medium">Zona Horaria:</span> {detailsAirport.timezone}</p>
            <p><span className="font-medium">DST:</span> {detailsAirport.dst}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCloseDetails}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
    );
}