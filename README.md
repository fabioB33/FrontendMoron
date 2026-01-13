# 🌐 Argentina Habilitaciones - Frontend

Aplicación web React para el sistema de gestión de habilitaciones y certificados AFAP del Municipio de Morón.

## 🛠️ Stack Tecnológico

- **Framework**: React 19
- **Routing**: React Router DOM 7
- **Styling**: TailwindCSS 3 + Radix UI
- **State Management**: React Query (TanStack)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Build Tool**: Create React App (CRACO)

## 📋 Requisitos

- Node.js 18+
- Yarn o npm

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/fabioB33/FrontendMoron.git
cd FrontendMoron
```

### 2. Instalar dependencias

```bash
yarn install
# o
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con la URL del backend
```

**Variables requeridas:**
```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 4. Ejecutar en desarrollo

```bash
yarn start
# o
npm start
```

La aplicación estará disponible en http://localhost:3000

## 🏗️ Build de Producción

```bash
yarn build
# o
npm run build
```

Los archivos de producción estarán en la carpeta `build/`.

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/            # Componentes UI (Radix/shadcn)
│   │   ├── AIAssistant.js # Asistente IA
│   │   ├── DashboardLayout.js
│   │   ├── ProtectedRoute.js
│   │   └── PublicLayout.js
│   ├── contexts/          # Contextos React
│   │   ├── AuthContext.js
│   │   └── AIContext.js
│   ├── hooks/             # Custom hooks
│   │   └── use-toast.js
│   ├── pages/             # Páginas/Rutas
│   │   ├── DashboardPage.js
│   │   ├── EstadisticasPage.js
│   │   ├── InspeccionesPage.js
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── MisSolicitudesPage.js
│   │   ├── NuevaSolicitudPage.js
│   │   ├── RegisterPage.js
│   │   ├── SolicitudesPage.js
│   │   └── VerificarCertificadoPage.js
│   ├── utils/
│   │   └── api.js         # Cliente HTTP configurado
│   ├── lib/
│   │   └── utils.js       # Utilidades (cn, etc.)
│   ├── App.js             # Componente principal
│   ├── App.css
│   ├── index.js           # Entry point
│   └── index.css          # Estilos globales (Tailwind)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── craco.config.js
└── README.md
```

## 🎨 Componentes UI

Este proyecto utiliza componentes de [shadcn/ui](https://ui.shadcn.com/) basados en Radix UI:

- Accordion, Alert, Avatar, Badge
- Button, Card, Checkbox, Dialog
- Dropdown Menu, Form, Input, Label
- Navigation Menu, Popover, Progress
- Select, Separator, Sheet, Skeleton
- Table, Tabs, Toast, Tooltip
- Y más...

## 🔐 Autenticación

El sistema usa JWT para autenticación:

- Login con CUIT/CUIL y contraseña
- Tokens almacenados en localStorage
- Rutas protegidas con `ProtectedRoute`
- Refresh automático del token

## 📱 Páginas Principales

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Landing | Página principal pública |
| `/login` | Login | Inicio de sesión |
| `/register` | Register | Registro de usuarios |
| `/verificar/:codigo` | Verificar | Verificar certificado |
| `/dashboard` | Dashboard | Panel principal (protegido) |
| `/solicitudes` | Solicitudes | Gestión de solicitudes |
| `/mis-solicitudes` | Mis Solicitudes | Solicitudes del usuario |
| `/nueva-solicitud` | Nueva Solicitud | Crear solicitud |
| `/inspecciones` | Inspecciones | Gestión de inspecciones |
| `/estadisticas` | Estadísticas | Reportes y métricas |

## 🐳 Docker

### Build de imagen

```bash
docker build -t habilitaciones-frontend .
```

### Ejecutar con Docker

```bash
docker run -d -p 80:80 habilitaciones-frontend
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variable de entorno:
   - `REACT_APP_API_URL` = URL del backend
3. Deploy automático en cada push

### Netlify

1. Conectar repositorio
2. Build command: `yarn build`
3. Publish directory: `build`
4. Configurar variable `REACT_APP_API_URL`

### Variables de Entorno en Producción

```env
REACT_APP_API_URL=https://tu-backend.railway.app/api
```

## 🧪 Testing

```bash
yarn test
# o
npm test
```

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `yarn start` | Servidor de desarrollo |
| `yarn build` | Build de producción |
| `yarn test` | Ejecutar tests |

## 🔧 Configuración

### Tailwind CSS

Configurado en `tailwind.config.js` con:
- Tema personalizado
- Animaciones
- Colores custom

### CRACO

Configurado en `craco.config.js` para:
- Alias de paths
- Plugins adicionales

## 🤝 Contribuir

1. Fork el repositorio
2. Crear branch (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -am 'Agregar nueva feature'`)
4. Push al branch (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## 📝 Licencia

[Tu licencia aquí]

## 🔗 Links

- **Backend**: https://github.com/fabioB33/BackendMoron
- **API Docs**: [URL del backend]/docs
