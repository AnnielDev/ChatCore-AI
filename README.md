# ChatCore AI

**ChatCore AI** es una aplicacion web moderna de chat desarrollada con React y Vite, optimizada para ofrecer una experiencia de usuario fluida y reactiva. Esta version incorpora un sistema de persistencia de mensajes y configuraciones, integracion con API externa para respuestas inteligentes, y un diseño responsive que funciona perfectamente en dispositivos moviles.

## 🚀 Características Principales

- **Interfaz de Usuario Moderna**: Diseño minimalista y elegante con animaciones fluidas y efectos de desenfoque (blur).
- **Persistencia de Datos**: Guarda automaticamente el historial de chat en el almacenamiento local (`localStorage`) y lo restaura al iniciar.
- **Integracion con Groq API**: Utiliza `groq-sdk` para obtener respuestas inteligentes del modelo **llama-3.3-70b-versatile**.
- **Soporte Multilingüe**: Cambia entre Español, Inglés y Portugués.
- **Responsive Design**: Se adapta perfectamente a diferentes tamaños de pantalla.
- **Modo Oscuro**: Tema automatizado basado en la configuración del sistema.

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: Hooks de React (useState, useEffect, useMemo, useRef)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Routing**: [React Router](https://reactrouter.com/)

## ⚙️ Configuración e Instalación

1.  **Clona el repositorio**:

    ```bash
    git clone <url-del-repositorio>
    cd ChatCore-AI
    ```

2.  **Instala las dependencias**:

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno**:
    Crea un archivo `.env` en la raiz del proyecto e incluye tu API Key de Groq:
    ```env
    VITE_GROQ_API_KEY=tu_api_key_aqui
    ```

## 🚀 Comandos

- **Iniciar servidor de desarrollo**:

  ```bash
  npm run dev
  ```

  (Abre `http://localhost:5173` en tu navegador)

- **Construir para producción**:

  ```bash
  npm run build
  ```

- **Previsualizar producción**:

  ```bash
  npm run preview
  ```

- **Linter**:
  ```bash
  npm run lint
  ```

## 📁 Estructura del Proyecto

- `src/pages/`: Contiene las interfaces principales (`Chat.tsx`).
- `src/layout/`: Define la estructura visual (`SideBar.tsx`).
- `src/components/`: Componentes reutilizables (`LoadingPoints.tsx`, `SettingsModal.tsx`).
- `src/context/`: Manejo de estado global (`I18nContext.tsx`, `SettingsModalContext.tsx`).
- `src/utils/`: Lógica de negocio e integraciones (`groq.ts`).
