import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import AircraftPage from './pages/AircraftPage';
import PassengersPage from './pages/PassengersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'flights', element: <FlightsPage /> },
      { path: 'aircraft', element: <AircraftPage /> },
      { path: 'passengers', element: <PassengersPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}