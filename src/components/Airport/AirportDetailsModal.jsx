import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
export default function AirportDetailsModal({ isOpen, onClose, airportData, onSubmit }) {    
    const [formData, setFormData] = useState({
        id: airportData?.id || '',
        name: airportData?.name || '',
        location: airportData?.location || '',
        code: airportData?.code || '',
        runways: airportData?.runways || 0,
        terminals: airportData?.terminals || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header>{airportData ? 'Editar Aeropuerto' : 'Añadir Aeropuerto'}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm
                            focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="runways" className="block text-sm font-medium text-gray-700">Número de Pistas</label>
                        <input
                            type="number"
                            name="runways"
                            id="runways"
                            value={formData.runways}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="terminals" className="block text-sm font-medium text-gray-700">Número de Terminales</label>
                        <input
                            type="number"
                            name="terminals"
                            id="terminals"
                            value={formData.terminals}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            {airportData ? 'Actualizar' : 'Añadir'}
                        </Button>
                        <Button type="button" onClick={onClose} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <p className="text-sm text-gray-500">Sistema de Gestión Aeroportuaria</p>
            </Modal.Footer>
        </Modal>
    );
}