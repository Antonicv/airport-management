import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import AircraftPage from './pages/AircraftPage';
import PassengersPage from './pages/PassengersPage';
import AirportPage from './pages/AirportPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'flights', element: <FlightsPage /> },
      { path: 'aircraft', element: <AircraftPage /> },
      { path: 'passengers', element: <PassengersPage /> },
      { path:`/airports`, element:<AirportPage />},
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}