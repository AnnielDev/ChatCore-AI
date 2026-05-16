# ChatCore AI

**ChatCore AI** es una aplicación web de chat construida con React + Vite. El proyecto prioriza una experiencia fluida, con persistencia local de mensajes y configuración, integración con Groq para respuestas inteligentes y diseño adaptable a escritorio y móvil.

## Características principales

- Interfaz moderna con transiciones suaves y enfoque en usabilidad.
- Persistencia local con `localStorage` para conservar historial y ajustes.
- Integración con la API de Groq mediante `fetch`.
- Soporte multilingüe: español, inglés y portugués.
- Diseño responsive para distintos tamaños de pantalla.
- Tema oscuro automático según la preferencia del sistema.

## Tecnologías

- React 19
- Vite 8
- TypeScript 6
- Tailwind CSS 4
- React Router 7
- React Icons

## Requisitos

- Node.js `>=20.17.0`
- `pnpm >=10.14.0`

## Instalación y configuración

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd ChatCore-AI
```

2. Instala dependencias:

```bash
pnpm install
```

3. Crea un archivo `.env` en la raíz y agrega tu API key del proveedor de IA.

## Scripts disponibles

- Desarrollo:

```bash
pnpm dev
```

Abre `http://localhost:5173` en tu navegador.

- Build de producción:

```bash
pnpm build
```

- Previsualización local del build:

```bash
pnpm preview
```

- Lint:

```bash
pnpm lint
```

## Estructura del proyecto

- `src/pages/`: vistas principales (por ejemplo, `Chat.tsx`).
- `src/layout/`: estructura general de interfaz (por ejemplo, `SideBar.tsx`).
- `src/components/`: componentes reutilizables.
- `src/context/`: estado global y contexto de aplicación.
- `src/utils/`: utilidades e integración de API (por ejemplo, `groq.ts`).
