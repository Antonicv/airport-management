import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import FlightFormModal from '../components/Flights/FlightFormModal';

export default function FlightPage() {
    const [flightsData, setFlightsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFlight, setCurrentFlight] = useState(null);
    const [detailsFlight, setDetailsFlight] = useState(null);
    const [airports, setAirports] = useState([]);
    const [planes, setPlanes] = useState([]);

    const fetchFlights = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/flights');
            const flights = Array.isArray(response.data) ? response.data : response.data.data || [];
            setFlightsData(flights);
        } catch (err) {
            console.error('Error loading flights:', err);
            setError('Error loading flight data');
        } finally {
            setLoading(false);
        }
    };

    const fetchAirportsAndPlanes = async () => {
        try {
            const [airportsRes, planesRes] = await Promise.all([
                axios.get('/airports'),
                axios.get('/planes')
            ]);
            setAirports(Array.isArray(airportsRes.data) ? airportsRes.data : airportsRes.data.data || []);
            setPlanes(Array.isArray(planesRes.data) ? planesRes.data : planesRes.data.data || []);
        } catch (err) {
            console.error('Error loading reference data:', err);
        }
    };

    useEffect(() => {
        fetchFlights();
        fetchAirportsAndPlanes();
    }, []);

    const handleAdd = () => {
        setCurrentFlight(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id) => {
        const flight = flightsData.find(f => f.id === id);
        setCurrentFlight(flight);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            try {
                await axios.delete(`/flights/${id}`);
                fetchFlights();
            } catch (err) {
                console.error('Error deleting flight:', err);
                setError('Error deleting flight');
            }
        }
    };

    const handleShowDetails = (flight) => {
        setDetailsFlight(flight);
    };

    const handleCloseDetails = () => {
        setDetailsFlight(null);
    };

    const handleSubmit = async (formData) => {
        try {
            if (currentFlight) {
                await axios.put(`/flights/${currentFlight.id}`, formData);
            } else {
                await axios.post('/flights', formData);
            }
            fetchFlights();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error saving flight:', err);
            setError('Error saving flight changes');
        }
    };

    const getAirportName = (id) => {
        const airport = airports.find(a => a.id === id);
        return airport ? `${airport.name} (${airport.iata_code})` : 'Unknown';
    };

    const getPlaneInfo = (id) => {
        const plane = planes.find(p => p.id === id);
        return plane ? `${plane.model} (${plane.registration_number})` : 'Unknown';
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Flight Management</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button onClick={() => setError(null)} className="float-right font-bold">×</button>
                </div>
            )}

            <button 
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                + Add Flight
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Flight Number</th>
                            <th className="py-2 px-4 border">Departure</th>
                            <th className="py-2 px-4 border">Arrival</th>
                            <th className="py-2 px-4 border">Departure Time</th>
                            <th className="py-2 px-4 border">Arrival Time</th>
                            <th className="py-2 px-4 border">Available Seats</th>
                            <th className="py-2 px-4 border">Ticket Price</th>
                            <th className="py-2 px-4 border">Plane</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flightsData?.map((flight) => (
                            <tr key={flight.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{flight.flight_number}</td>
                                <td className="py-2 px-4 border">{getAirportName(flight.departure_airport_id)}</td>
                                <td className="py-2 px-4 border">{getAirportName(flight.arrival_airport_id)}</td>
                                <td className="py-2 px-4 border">{new Date(flight.departure_time).toLocaleString()}</td>
                                <td className="py-2 px-4 border">{new Date(flight.arrival_time).toLocaleString()}</td>
                                <td className="py-2 px-4 border text-center">{flight.available_seats}</td>
                                <td className="py-2 px-4 border">${flight.ticket_price}</td>
                                <td className="py-2 px-4 border">{getPlaneInfo(flight.plane_id)}</td>
                                <td className="py-2 px-4 border space-x-1 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(flight.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(flight.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleShowDetails(flight)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <FlightFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                flight={currentFlight}
                airports={airports}
                planes={planes}
            />

            {detailsFlight && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Flight Details</h2>
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
                                    <h3 className="font-semibold text-gray-700">Basic Information</h3>
                                    <p><span className="font-medium">Flight Number:</span> {detailsFlight.flight_number}</p>
                                    <p><span className="font-medium">Departure:</span> {getAirportName(detailsFlight.departure_airport_id)}</p>
                                    <p><span className="font-medium">Arrival:</span> {getAirportName(detailsFlight.arrival_airport_id)}</p>
                                    <p><span className="font-medium">Plane:</span> {getPlaneInfo(detailsFlight.plane_id)}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Schedule</h3>
                                    <p><span className="font-medium">Departure Time:</span> {new Date(detailsFlight.departure_time).toLocaleString()}</p>
                                    <p><span className="font-medium">Arrival Time:</span> {new Date(detailsFlight.arrival_time).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Pricing & Capacity</h3>
                                    <p><span className="font-medium">Available Seats:</span> {detailsFlight.available_seats}</p>
                                    <p><span className="font-medium">Ticket Price:</span> ${detailsFlight.ticket_price}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleCloseDetails}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}