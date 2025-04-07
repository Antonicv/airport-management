import React, { useState, useEffect } from 'react';

export default function AircraftFormModal({ isOpen, onClose, onSubmit, aircraft }) {
    const [formData, setFormData] = useState({
        CRUISING_SPEED: '',
        MANUFACTURER: '',
        MAX_RANGE: '',
        MODEL: '',
        PASSENGER_CAPACITY: '',
        REGISTRATION_NUMBER: ''
    });

    // Inicializar formulario cuando cambia el aircraft o se abre el modal
    useEffect(() => {
        if (aircraft) {
            setFormData({
                CRUISING_SPEED: aircraft.CRUISING_SPEED || aircraft.cruising_speed || '',
                MANUFACTURER: aircraft.MANUFACTURER || aircraft.manufacturer || '',
                MAX_RANGE: aircraft.MAX_RANGE || aircraft.max_range || '',
                MODEL: aircraft.MODEL || aircraft.model || '',
                PASSENGER_CAPACITY: aircraft.PASSENGER_CAPACITY || aircraft.passenger_capacity || '',
                REGISTRATION_NUMBER: aircraft.REGISTRATION_NUMBER || aircraft.registration_number || ''
            });
        } else {
            setFormData({
                CRUISING_SPEED: '',
                MANUFACTURER: '',
                MAX_RANGE: '',
                MODEL: '',
                PASSENGER_CAPACITY: '',
                REGISTRATION_NUMBER: ''
            });
        }
    }, [aircraft, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                        {aircraft ? 'Editar Aeronave' : 'Añadir Nueva Aeronave'}
                    </h2>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(formData);
                    }}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número de Registro</label>
                                <input
                                    name="REGISTRATION_NUMBER"
                                    value={formData.REGISTRATION_NUMBER}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fabricante</label>
                                    <input
                                        name="MANUFACTURER"
                                        value={formData.MANUFACTURER}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Modelo</label>
                                    <input
                                        name="MODEL"
                                        value={formData.MODEL}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Velocidad Crucero (km/h)</label>
                                    <input
                                        type="number"
                                        name="CRUISING_SPEED"
                                        value={formData.CRUISING_SPEED}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Alcance Máximo (km)</label>
                                    <input
                                        type="number"
                                        name="MAX_RANGE"
                                        value={formData.MAX_RANGE}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Capacidad de Pasajeros</label>
                                    <input
                                        type="number"
                                        name="PASSENGER_CAPACITY"
                                        value={formData.PASSENGER_CAPACITY}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {aircraft ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}