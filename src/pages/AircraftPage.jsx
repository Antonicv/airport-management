import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import AircraftFormModal from '../components/Aircraft/AircraftFormModal';

export default function AircraftPage() {
    const [aircraftData, setAircraftData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAircraft, setCurrentAircraft] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchAircrafts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/planes');
            setAircraftData(response.data);
        } catch (err) {
            console.error('Error fetching aircrafts:', err);
            setError(err.response?.data?.message || 'Error al cargar los datos de aviones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAircrafts();
    }, []);

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
                await fetchAircrafts();
            } catch (err) {
                console.error('Error deleting aircraft:', err);
                setError(err.response?.data?.message || 'Error al eliminar la aeronave');
            }
        }
    };

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (currentAircraft) {
                await axios.put(`/planes/${currentAircraft.id}`, formData);
            } else {
                await axios.post('/planes', formData);
            }
            await fetchAircrafts();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error saving aircraft:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error al guardar los cambios');
        } finally {
            setIsSubmitting(false);
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Gestión de Aviones</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button 
                        onClick={() => setError(null)} 
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    >
                        <svg className="fill-current h-6 w-6 text-red-500" viewBox="0 0 20 20">
                            <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"/>
                        </svg>
                    </button>
                </div>
            )}

            <div className="mb-4">
                <button 
                    onClick={handleAdd}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Procesando...' : '+ Añadir Aeronave'}
                </button>
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-3 text-left">Modelo</th>
                            <th className="border border-gray-200 px-4 py-3 text-left">Fabricante</th>
                            <th className="border border-gray-200 px-4 py-3 text-left">Capacidad</th>
                            <th className="border border-gray-200 px-4 py-3 text-left">Rango Máximo</th>
                            <th className="border border-gray-200 px-4 py-3 text-left">Velocidad</th>
                            <th className="border border-gray-200 px-4 py-3 text-left">Registro</th>
                            <th className="border border-gray-200 px-4 py-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aircraftData.map((aircraft) => (
                            <tr key={aircraft.id} className="hover:bg-gray-50 even:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2">{aircraft.model}</td>
                                <td className="border border-gray-200 px-4 py-2">{aircraft.manufacturer}</td>
                                <td className="border border-gray-200 px-4 py-2 text-center">{aircraft.passengerCapacity}</td>
                                <td className="border border-gray-200 px-4 py-2 text-right">{aircraft.maxRange?.toLocaleString()} km</td>
                                <td className="border border-gray-200 px-4 py-2 text-right">{aircraft.cruisingSpeed} km/h</td>
                                <td className="border border-gray-200 px-4 py-2 font-mono">{aircraft.registrationNumber}</td>
                                <td className="border border-gray-200 px-4 py-2 space-x-2">
                                    <button 
                                        onClick={() => handleEdit(aircraft.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                        disabled={isSubmitting}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(aircraft.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        disabled={isSubmitting}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AircraftFormModal
                isOpen={isModalOpen}
                onClose={() => !isSubmitting && setIsModalOpen(false)}
                onSubmit={handleSubmit}
                aircraft={currentAircraft}
            />
        </div>
    );
}