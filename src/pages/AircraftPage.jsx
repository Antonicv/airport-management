import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import AircraftFormModal from '../components/Aircraft/AircraftFormModal'; // Asegúrate de crear este componente

export default function AircraftPage() {
    const [aircraftData, setAircraftData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAircraft, setCurrentAircraft] = useState(null);

    // Función para cargar datos
    const fetchAircrafts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/planes');
            setAircraftData(response.data);
        } catch (err) {
            console.error('Error al conectar con el backend:', err);
            setError('Error al cargar los datos de aviones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAircrafts();
    }, []);

    // Funciones CRUD
    const handleAdd = () => {
        setCurrentAircraft(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id) => {
        const aircraft = aircraftData.find(a => a.id === id);
        setCurrentAircraft(aircraft);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta aeronave?')) {
            try {
                await axios.delete(`/planes/${id}`);
                fetchAircrafts(); // Recargar datos
            } catch (err) {
                console.error('Error al eliminar:', err);
                setError('Error al eliminar la aeronave');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (currentAircraft) {
                // Actualizar
                await axios.put(`/planes/${currentAircraft.id}`, formData);
            } else {
                // Crear nuevo
                await axios.post('/planes', formData);
            }
            fetchAircrafts(); // Recargar datos
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error al guardar:', err);
            setError('Error al guardar los cambios');
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Gestión de Aviones</h1>
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
                <h1 className="text-2xl font-bold">Gestión de Aviones</h1>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button onClick={() => window.location.reload()} className="absolute top-0 bottom-0 right-0 px-4 py-3">
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
            <h1 className="text-2xl font-bold">Gestión de Aviones</h1>
            
            {/* Mensaje de error dinámico */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"/>
                        </svg>
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full mt-4 border-collapse border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Modelo</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Fabricante</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Capacidad</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Rango Máximo (km)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Velocidad (km/h)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Registro</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aircraftData.map((aircraft) => (
                            <tr key={aircraft.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{aircraft.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{aircraft.model}</td>
                                <td className="border border-gray-300 px-4 py-2">{aircraft.manufacturer}</td>
                                <td className="border border-gray-300 px-4 py-2">{aircraft.passengerCapacity}</td>
                                <td className="border border-gray-300 px-4 py-2">{aircraft.maxRange?.toLocaleString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{aircraft.cruisingSpeed}</td>
                                <td className="border border-gray-300 px-4 py-2 font-mono">{aircraft.registrationNumber}</td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <button 
                                        onClick={() => handleEdit(aircraft.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(aircraft.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4">
                <button 
                    onClick={handleAdd}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Añadir Aeronave
                </button>
            </div>

            {/* Modal del formulario */}
            <AircraftFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                aircraft={currentAircraft}
            />
        </div>
    );
}