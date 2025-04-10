import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AirportFormModal({ isOpen, onClose, onSubmit, airport }) {
    const [formData, setFormData] = useState({
        iata_code: '',
        icao_code: '',
        name: '',
        city: '',
        country: '',
        region: '',
        number_of_terminals: '',
        number_of_gates: '',
        has_international_flights: false,
        dst: '',
        altitude: '',
        latitude: '',
        longitude: '',
        contact_email: '',
        contact_phone: '',
        timezone: '',
        tz_database_time_zone: '',
        website: ''
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(airport ? {
                iata_code: airport.iata_code || '',
                icao_code: airport.icao_code || '',
                name: airport.name || '',
                city: airport.city || '',
                country: airport.country || '',
                region: airport.region || '',
                number_of_terminals: airport.number_of_terminals || '',
                number_of_gates: airport.number_of_gates || '',
                has_international_flights: airport.has_international_flights || false,
                dst: airport.dst || '',
                altitude: airport.altitude || '',
                latitude: airport.latitude || '',
                longitude: airport.longitude || '',
                contact_email: airport.contact_email || '',
                contact_phone: airport.contact_phone || '',
                timezone: airport.timezone || '',
                tz_database_time_zone: airport.tz_database_time_zone || '',
                website: airport.website || ''
            } : {
                iata_code: '',
                icao_code: '',
                name: '',
                city: '',
                country: '',
                region: '',
                number_of_terminals: '',
                number_of_gates: '',
                has_international_flights: false,
                dst: '',
                altitude: '',
                latitude: '',
                longitude: '',
                contact_email: '',
                contact_phone: '',
                timezone: '',
                tz_database_time_zone: '',
                website: ''
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
                            {/* Campos básicos */}
                            <div>
                                <label htmlFor="iata_code" className="block text-sm font-medium text-gray-700">
                                    Código IATA
                                </label>
                                <input
                                    name="iata_code"
                                    value={formData.iata_code}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    maxLength="3"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="icao_code" className="block text-sm font-medium text-gray-700">
                                    Código ICAO
                                </label>
                                <input
                                    name="icao_code"
                                    value={formData.icao_code}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    maxLength="4"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre del Aeropuerto
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Ciudad
                                    </label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        País
                                    </label>
                                    <input
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    Región
                                </label>
                                <input
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Campos adicionales */}
                            <div>
                                <label htmlFor="altitude" className="block text-sm font-medium text-gray-700">
                                    Altitud (m)
                                </label>
                                <input
                                    name="altitude"
                                    type="number"
                                    value={formData.altitude}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                                        Latitud
                                    </label>
                                    <input
                                        name="latitude"
                                        type="number"
                                        step="any"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                                        Longitud
                                    </label>
                                    <input
                                        name="longitude"
                                        type="number"
                                        step="any"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                                    Email de Contacto
                                </label>
                                <input
                                    name="contact_email"
                                    type="email"
                                    value={formData.contact_email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                                    Teléfono de Contacto
                                </label>
                                <input
                                    name="contact_phone"
                                    type="tel"
                                    value={formData.contact_phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                                    Zona Horaria
                                </label>
                                <input
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="tz_database_time_zone" className="block text-sm font-medium text-gray-700">
                                    Base de Datos de Zona Horaria
                                </label>
                                <input
                                    name="tz_database_time_zone"
                                    value={formData.tz_database_time_zone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                    Sitio Web
                                </label>
                                <input
                                    name="website"
                                    type="url"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
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
        iata_code: PropTypes.string,
        icao_code: PropTypes.string,
        name: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string,
        region: PropTypes.string,
        number_of_terminals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        number_of_gates: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        has_international_flights: PropTypes.bool,
        dst: PropTypes.string,
        altitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        contact_email: PropTypes.string,
        contact_phone: PropTypes.string,
        timezone: PropTypes.string,
        tz_database_time_zone: PropTypes.string,
        website: PropTypes.string
    })
};