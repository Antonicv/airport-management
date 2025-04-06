import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api', // URL base del backend
    timeout: 10000, // Tiempo de espera opcional
});

export default axiosInstance;
