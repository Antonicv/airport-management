import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function FlightFormModal({ isOpen, onClose, onSubmit, flight, airports, planes }) {
    const [formData, setFormData] = useState({
        flight_number: '',
        departure_time: '',
        arrival_time: '',
        available_seats: '',
        ticket_price: '',
        departure_airport_id: '',
        arrival_airport_id: '',
        plane_id: ''
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(flight ? {
                flight_number: flight.flight_number || '',
                departure_time: flight.departure_time || '',
                arrival_time: flight.arrival_time || '',
                available_seats: flight.available_seats || '',
                ticket_price: flight.ticket_price || '',
                departure_airport_id: flight.departure_airport_id || '',
                arrival_airport_id: flight.arrival_airport_id || '',
                plane_id: flight.plane_id || ''
            } : {
                flight_number: '',
                departure_time: '',
                arrival_time: '',
                available_seats: '',
                ticket_price: '',
                departure_airport_id: '',
                arrival_airport_id: '',
                plane_id: ''
            });
        }
    }, [flight, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateTimeChange = (e) => {
        const { name, value } = e.target;
        // Convert local datetime to ISO format for backend
        const isoDateTime = new Date(value).toISOString();
        setFormData(prev => ({
            ...prev,
            [name]: isoDateTime
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    // Convert ISO datetime strings to local datetime format for input fields
    const localDepartureTime = formData.departure_time 
        ? new Date(formData.departure_time).toISOString().slice(0, 16)
        : '';
    const localArrivalTime = formData.arrival_time 
        ? new Date(formData.arrival_time).toISOString().slice(0, 16)
        : '';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            {flight ? 'Edit Flight' : 'Add New Flight'}
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
                                <label htmlFor="flight_number" className="block text-sm font-medium text-gray-700">
                                    Flight Number
                                </label>
                                <input
                                    id="flight_number"
                                    name="flight_number"
                                    value={formData.flight_number}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="departure_airport_id" className="block text-sm font-medium text-gray-700">
                                        Departure Airport
                                    </label>
                                    <select
                                        id="departure_airport_id"
                                        name="departure_airport_id"
                                        value={formData.departure_airport_id}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Airport</option>
                                        {airports.map(airport => (
                                            <option key={airport.id} value={airport.id}>
                                                {airport.name} ({airport.iata_code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="arrival_airport_id" className="block text-sm font-medium text-gray-700">
                                        Arrival Airport
                                    </label>
                                    <select
                                        id="arrival_airport_id"
                                        name="arrival_airport_id"
                                        value={formData.arrival_airport_id}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Airport</option>
                                        {airports.map(airport => (
                                            <option key={airport.id} value={airport.id}>
                                                {airport.name} ({airport.iata_code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="departure_time" className="block text-sm font-medium text-gray-700">
                                        Departure Time
                                    </label>
                                    <input
                                        id="departure_time"
                                        name="departure_time"
                                        type="datetime-local"
                                        value={localDepartureTime}
                                        onChange={handleDateTimeChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="arrival_time" className="block text-sm font-medium text-gray-700">
                                        Arrival Time
                                    </label>
                                    <input
                                        id="arrival_time"
                                        name="arrival_time"
                                        type="datetime-local"
                                        value={localArrivalTime}
                                        onChange={handleDateTimeChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="available_seats" className="block text-sm font-medium text-gray-700">
                                        Available Seats
                                    </label>
                                    <input
                                        id="available_seats"
                                        name="available_seats"
                                        type="number"
                                        min="0"
                                        value={formData.available_seats}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ticket_price" className="block text-sm font-medium text-gray-700">
                                        Ticket Price ($)
                                    </label>
                                    <input
                                        id="ticket_price"
                                        name="ticket_price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.ticket_price}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="plane_id" className="block text-sm font-medium text-gray-700">
                                    Plane
                                </label>
                                <select
                                    id="plane_id"
                                    name="plane_id"
                                    value={formData.plane_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Plane</option>
                                    {planes.map(plane => (
                                        <option key={plane.id} value={plane.id}>
                                            {plane.model} ({plane.registration_number})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {flight ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

FlightFormModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    flight: PropTypes.shape({
        id: PropTypes.number,
        flight_number: PropTypes.string,
        departure_time: PropTypes.string,
        arrival_time: PropTypes.string,
        available_seats: PropTypes.number,
        ticket_price: PropTypes.number,
        departure_airport_id: PropTypes.number,
        arrival_airport_id: PropTypes.number,
        plane_id: PropTypes.number
    }),
    airports: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        iata_code: PropTypes.string
    })),
    planes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        model: PropTypes.string,
        registration_number: PropTypes.string
    }))
};

FlightFormModal.defaultProps = {
    airports: [],
    planes: []
};