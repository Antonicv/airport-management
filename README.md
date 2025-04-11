# Airport Management System

Este proyecto es un sistema de gestión aeroportuaria que permite administrar vuelos, pasajeros, aeronaves, aeropuertos y tripulación. Está construido con React, TailwindCSS y utiliza Axios para la comunicación con el backend.

## Funcionalidades Principales

1. **Gestión de Vuelos**:
   - Crear, editar y eliminar vuelos.
   - Ver detalles de vuelos, incluyendo aeropuertos de salida y llegada, horarios, capacidad y precios.

2. **Gestión de Pasajeros**:
   - Crear, editar y eliminar pasajeros.
   - Mostrar información detallada de cada pasajero.

3. **Gestión de Aeronaves**:
   - Crear, editar y eliminar aeronaves.
   - Mostrar información como modelo, fabricante, capacidad y velocidad.

4. **Gestión de Aeropuertos**:
   - Crear, editar y eliminar aeropuertos.
   - Mostrar detalles como códigos IATA/ICAO, ubicación, terminales y contacto.

5. **Gestión de Tripulación**:
   - Listar miembros de la tripulación.
   - Funcionalidades de agregar, editar y eliminar (en desarrollo).

---

## Hooks Utilizados

### 1. **useState**
   - **Descripción**: Permite manejar el estado local en un componente funcional.
   - **Uso**:
     ```javascript
     const [state, setState] = useState(initialValue);
     ```
   - **Ejemplo**:
     ```javascript
     const [loading, setLoading] = useState(true);
     ```
   - **Paso a Paso**:
     1. `useState` devuelve un array con dos elementos: el estado actual y una función para actualizarlo.
     2. Se inicializa con un valor (`initialValue`).
     3. Para actualizar el estado, se llama a la función `setState`.

---

### 2. **useEffect**
   - **Descripción**: Permite realizar efectos secundarios en componentes funcionales, como llamadas a APIs o suscripciones.
   - **Uso**:
     ```javascript
     useEffect(() => {
       // Código a ejecutar
       return () => {
         // Cleanup (opcional)
       };
     }, [dependencies]);
     ```
   - **Ejemplo**:
     ```javascript
     useEffect(() => {
       fetchPassengers();
     }, []);
     ```
   - **Paso a Paso**:
     1. Se ejecuta después de que el componente se renderiza.
     2. Si se pasa un array vacío (`[]`), se ejecuta solo una vez.
     3. Si se pasan dependencias, se ejecuta cada vez que cambian.

---

### 3. **useQuery** (de React Query)
   - **Descripción**: Maneja el estado de datos remotos (fetching, caching, etc.).
   - **Uso**:
     ```javascript
     const { data, isLoading, error } = useQuery({
       queryKey: ['key'],
       queryFn: fetchFunction,
     });
     ```
   - **Ejemplo**:
     ```javascript
     const { data: crewMembers, isLoading, error } = useQuery({
       queryKey: ['crewMembers'],
       queryFn: fetchCrewMembers,
     });
     ```
   - **Paso a Paso**:
     1. `queryKey` identifica la consulta.
     2. `queryFn` es la función que realiza la llamada a la API.
     3. Devuelve el estado de la consulta (`data`, `isLoading`, `error`).

---

## Props de Componentes

### 1. **PassengerFormModal**
   - **Props**:
     - `isOpen` (boolean): Indica si el modal está abierto.
     - `onClose` (function): Función para cerrar el modal.
     - `onSubmit` (function): Función para manejar el envío del formulario.
     - `passenger` (object): Datos del pasajero actual (para edición).

### 2. **FlightFormModal**
   - **Props**:
     - `isOpen` (boolean): Indica si el modal está abierto.
     - `onClose` (function): Función para cerrar el modal.
     - `onSubmit` (function): Función para manejar el envío del formulario.
     - `flight` (object): Datos del vuelo actual (para edición).
     - `airports` (array): Lista de aeropuertos disponibles.
     - `planes` (array): Lista de aeronaves disponibles.

### 3. **AirportFormModal**
   - **Props**:
     - `isOpen` (boolean): Indica si el modal está abierto.
     - `onClose` (function): Función para cerrar el modal.
     - `onSubmit` (function): Función para manejar el envío del formulario.
     - `airport` (object): Datos del aeropuerto actual (para edición).

### 4. **AircraftFormModal**
   - **Props**:
     - `isOpen` (boolean): Indica si el modal está abierto.
     - `onClose` (function): Función para cerrar el modal.
     - `onSubmit` (function): Función para manejar el envío del formulario.
     - `aircraft` (object): Datos de la aeronave actual (para edición).

---

## Cómo Funciona el Proyecto

1. **Inicio**:
   - La aplicación comienza en `HomePage`, donde se muestran botones para navegar a las diferentes secciones.

2. **Navegación**:
   - Se utiliza `react-router-dom` para manejar las rutas.

3. **Gestión de Datos**:
   - Los datos se obtienen del backend usando Axios.
   - Los formularios modales permiten crear y editar registros.

4. **Estilos**:
   - TailwindCSS se utiliza para los estilos.
   - `tailwind-merge` y `clsx` se usan para combinar clases dinámicamente.

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <repo-url>
   cd airport-management
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## Contribución

1. Crear un fork del repositorio.
2. Crear una rama para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Hacer un pull request.

---

## Licencia

Este proyecto está bajo la licencia MIT.
