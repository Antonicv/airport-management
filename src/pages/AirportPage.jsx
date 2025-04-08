import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import AirportDetailsModal from "../components/Airport/AirportDetailsModal";

export default function AirportPage() {
    const [airportsData, setAirportsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAirport, setCurrentAirport] = useState(null);

    // Función para cargar datos
    const fetchAirports = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/airports');
            console.log('Datos recibidos:', response.data);
            setAirportsData(response.data);
        } catch (err) {
            console.error('Error al conectar con el backend:', err);
            setError('Error al cargar los datos. Por favor, inténtelo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAirports();
    }, []);

    const handleViewDetails = (id) => {
        const airport = airportsData.find(a => a.id === id);
        setCurrentAirport(airport);
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Gestión de Aeropuertos</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-4">Cargando datos...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Gestión de Aeropuertos</h1>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"/>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Gestión de Aeropuertos</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full mt-4 border-collapse border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Ciudad</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">País</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Código IATA</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Código ICAO</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airportsData.map((airport) => (
                            <tr key={airport.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{airport.NAME}</td>
                                <td className="border border-gray-300 px-4 py-2">{airport.CITY}</td>
                                <td className="border border-gray-300 px-4 py-2">{airport.COUNTRY}</td>
                                <td className="border border-gray-300 px-4 py-2">{airport.IATA_CODE}</td>
                                <td className="border border-gray-300 px-4 py-2">{airport.ICAO_CODE}</td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <button 
                                        onClick={() => handleViewDetails(airport.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de detalles */}
            {currentAirport && (
                <AirportDetailsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    airport={currentAirport}
                />
            )}
        </div>
    );
}