// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import "@madzadev/audio-player/dist/index.css";
import { FavoritesProvider } from './Componentes/Biblioteca/FavoritesContext';
//Este proveedor se encargará de manejar el contexto de favoritos en la aplicación.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <FavoritesProvider> 
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
);
//favoritesprovider proporciona el contexto de favoritos a todos los componentes hijos de App.