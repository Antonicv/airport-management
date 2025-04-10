import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AirportFormModal({ isOpen, onClose, onSubmit, airport }) {
    const [formData, setFormData] = useState({
        IATA_CODE: '',
        NAME: '',
        CITY: '',
        COUNTRY: '',
        NUMBER_OF_TERMINALS: '',
        NUMBER_OF_GATES: '',
        HAS_INTERNATIONAL_FLIGHTS: false
    });

    // Reset form when opening/closing or when airport prop changes
    useEffect(() => {
        if (isOpen) {
            setFormData(airport ? {
                IATA_CODE: airport.IATA_CODE || '',
                NAME: airport.NAME || '',
                CITY: airport.CITY || '',
                COUNTRY: airport.COUNTRY || '',
                NUMBER_OF_TERMINALS: airport.NUMBER_OF_TERMINALS || '',
                NUMBER_OF_GATES: airport.NUMBER_OF_GATES || '',
                HAS_INTERNATIONAL_FLIGHTS: airport.HAS_INTERNATIONAL_FLIGHTS || false
            } : {
                IATA_CODE: '',
                NAME: '',
                CITY: '',
                COUNTRY: '',
                NUMBER_OF_TERMINALS: '',
                NUMBER_OF_GATES: '',
                HAS_INTERNATIONAL_FLIGHTS: false
            });
        }
    }, [airport, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            {airport ? 'Editar Aeropuerto' : 'Añadir Nuevo Aeropuerto'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="IATA_CODE" className="block text-sm font-medium text-gray-700">
                                    Código IATA
                                </label>
                                <input
                                    id="IATA_CODE"
                                    name="IATA_CODE"
                                    value={formData.IATA_CODE}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    maxLength="3"
                                    pattern="[A-Za-z]{3}"
                                    title="El código IATA debe tener exactamente 3 letras"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="NAME" className="block text-sm font-medium text-gray-700">
                                    Nombre del Aeropuerto
                                </label>
                                <input
                                    id="NAME"
                                    name="NAME"
                                    value={formData.NAME}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="CITY" className="block text-sm font-medium text-gray-700">
                                        Ciudad
                                    </label>
                                    <input
                                        id="CITY"
                                        name="CITY"
                                        value={formData.CITY}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="COUNTRY" className="block text-sm font-medium text-gray-700">
                                        País
                                    </label>
                                    <input
                                        id="COUNTRY"
                                        name="COUNTRY"
                                        value={formData.COUNTRY}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="NUMBER_OF_TERMINALS" className="block text-sm font-medium text-gray-700">
                                        Número de Terminales
                                    </label>
                                    <input
                                        id="NUMBER_OF_TERMINALS"
                                        name="NUMBER_OF_TERMINALS"
                                        type="number"
                                        min="1"
                                        value={formData.NUMBER_OF_TERMINALS}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="NUMBER_OF_GATES" className="block text-sm font-medium text-gray-700">
                                        Número de Puertas
                                    </label>
                                    <input
                                        id="NUMBER_OF_GATES"
                                        name="NUMBER_OF_GATES"
                                        type="number"
                                        min="1"
                                        value={formData.NUMBER_OF_GATES}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="HAS_INTERNATIONAL_FLIGHTS"
                                    name="HAS_INTERNATIONAL_FLIGHTS"
                                    type="checkbox"
                                    checked={formData.HAS_INTERNATIONAL_FLIGHTS}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="HAS_INTERNATIONAL_FLIGHTS" className="ml-2 block text-sm text-gray-700">
                                    ¿Tiene vuelos internacionales?
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {airport ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

AirportFormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    airport: PropTypes.shape({
        IATA_CODE: PropTypes.string,
        NAME: PropTypes.string,
        CITY: PropTypes.string,
        COUNTRY: PropTypes.string,
        NUMBER_OF_TERMINALS: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        NUMBER_OF_GATES: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        HAS_INTERNATIONAL_FLIGHTS: PropTypes.bool
    })
};