import React from 'react';
import './Links.css';
import { Link } from 'react-router-dom';
function AcercaDe() {
    return (
        <div className='container-link'>
            <h1>Acerca de nosotros</h1>
            <h2>SOUNGOOD es un servicio de música digital y podcasts que te brinda acceso a millones de canciones de artistas de todo el mundo.</h2>
            <p>
                Puedes utilizar las funciones básicas, como reproducir música gratis, pero también puedes suscribirte a Soundgood Premium.
            </p>
            <p>
                Tengas Premium o no, puedes:
            </p>
            <ul>
                <li>Obtener recomendaciones según tus gustos.</li>
                <li>Crear colecciones de música y podcasts.</li>
                <li>Y mucho más!</li>
            </ul>
            <p>
                ¿Puedo conservar música de Soundgood? Nuestras licencias impiden que exportes el contenido fuera de la aplicación.
            </p>
            <p>
                Entonces, ya sea que estés manejando, haciendo ejercicio, de fiesta o en un momento relajante, la música o el podcast perfectos siempre están a tu alcance. Elige lo que quieres escuchar o deja que Soundgood te sorprenda.
            </p>
            <p>
                Ponle música a tu vida con Soundgood.
            </p>
            <p>
                Comunícate con nosotros. Comunícate con nuestro equipo de atención al cliente si no encuentras una solución en nuestro sitio de ayuda.
            </p>
            <p>
                Soundgood ARG. Brinda el servicio a los usuarios en todos los mercados.
            </p>
            <Link to="/home">
                <button className="green-button">Volver a Inicio</button>
            </Link>
        </div>
    );
}

export default AcercaDe;
