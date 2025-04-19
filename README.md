# Frontend de Gestión de Casos de Soporte

## Visión General
Aplicación React con TypeScript para la gestión de casos de soporte. Proporciona interfaces para crear, visualizar y rastrear casos de manera eficiente.

## Configuración Inicial
Clonar el repositorio

```bash
git clone [https://github.com/libardo2s/finkargo-support-backend.git]
cd support-case-frontend
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno
Crear un archivo .env basado en .env.example y definir las variables 
```bash
REACT_APP_API_BASE_URL=http://localhost:8000/api
```


## Iniciar la aplicación

```bash
npm start

La aplicación estará disponible en: http://localhost:3000.
```

### Estructura del Proyecto
```plaintext
src/
├── components/          # Componentes reutilizables
│   ├── forms/           # Formularios (crear/editar casos)
│   ├── models/          # Modales/Diálogos
│   ├── tables/          # Tablas de datos
│   └── Navbar.tsx       # Barra de navegación
│
├── pages/               # Vistas principales
│   ├── CreateCasePage.tsx       # Crear nuevo caso
│   ├── SupportCaseDetailPage.tsx  # Detalles de un caso
│   └── TrackingPage.tsx          # Rastreo de casos
│
├── services/            # Llamadas a la API
│   └── apiClient.ts     # Cliente HTTP (Axios/Fetch)
│
├── types/               # Tipos TypeScript
│   └── supportCase.ts   # Interfaces para casos de soporte
│
├── utils/               # Utilidades
│   └── helpers.ts       # Funciones auxiliares
│
├── App.tsx              # Componente principal
└── index.tsx            # Punto de entrada
```
### Scripts Disponibles
#### Comando	Descripción
```
npm start  ---- Inicia la app en modo desarrollo.
```

### Integración con el Backend
La aplicación consume los siguientes endpoints (ajustar en .env):

#### Estructura de Endpoints
```
POST	/support-cases	Crear nuevo caso
GET	/support-cases?[filters]	Obtener casos paginados (con filtros)
GET	/support-cases/case/{id}	Obtener caso por ID
```
#### Ejemplo de Uso en Componentes
```
import { getSupportCases, createSupportCase } from '../services/supportService';

// Obtener casos
const loadCases = async () => {
  const { cases } = await getSupportCases({ 
    page: 1, 
    status: 'open' 
  });
  setCases(cases);
};

// Crear caso
const handleSubmit = async (formData) => {
  try {
    await createSupportCase(formData);
    alert('Caso creado exitosamente');
  } catch (error) {
    console.error('Error al crear caso:', error);
  }
};
``` 

### Tecnologías Principales
```
React 18 (con Hooks)
TypeScript (Tipado estático)
React Router v6 (Navegación)
Axios (Peticiones HTTP)
Material-UI / Bootstrap (Estilos)
```


### Notas Adicionales
✅ Variables de Entorno:

REACT_APP_API_URL: URL base del backend (ej: http://localhost:5000/api).
