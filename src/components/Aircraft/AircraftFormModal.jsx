import React, { useState, useEffect } from 'react';

export default function AircraftFormModal({ isOpen, onClose, onSubmit, aircraft }) {
    const [formData, setFormData] = useState({
        model: '',
        manufacturer: '',
        passengerCapacity: '',
        maxRange: '',
        cruisingSpeed: '',
        registrationNumber: ''
    });

    // Initialize form when aircraft changes or modal opens
    useEffect(() => {
        if (aircraft) {
            setFormData({
                model: aircraft.model || '',
                manufacturer: aircraft.manufacturer || '',
                passengerCapacity: aircraft.passengerCapacity || '',
                maxRange: aircraft.maxRange || '',
                cruisingSpeed: aircraft.cruisingSpeed || '',
                registrationNumber: aircraft.registrationNumber || ''
            });
        } else {
            setFormData({
                model: '',
                manufacturer: '',
                passengerCapacity: '',
                maxRange: '',
                cruisingSpeed: '',
                registrationNumber: ''
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Modelo</label>
                                    <input
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fabricante</label>
                                    <input
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                                    <input
                                        type="number"
                                        name="passengerCapacity"
                                        value={formData.passengerCapacity}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Alcance Máximo (km)</label>
                                    <input
                                        type="number"
                                        name="maxRange"
                                        value={formData.maxRange}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Velocidad (km/h)</label>
                                    <input
                                        type="number"
                                        name="cruisingSpeed"
                                        value={formData.cruisingSpeed}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Número de Registro</label>
                                <input
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
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