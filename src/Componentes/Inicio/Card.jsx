import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './card.css';
import Swal from 'sweetalert2';

export function SongCard({ url, title, tags, onClick, image, artist, onFavorite, onAddToPlaylist }) {
    const [isFavorite, setIsFavorite] = useState(false);  // Estado para controlar si la canción es favorita
    
    async function fetchData({ metodo, cancionId}) {
        try { 
            const token = localStorage.getItem('access_token');//aca obtenemos el token que contiene el id del usuario
          // Mostrar la alerta de carga
          Swal.fire({
            title: metodo == "POST" ? 'Guardando tu favorito...' : "Eliminando tu favorito",
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const res = await fetch(`${import.meta.env.VITE_API_URL}/favoritos/${cancionId}`, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
          if (res.status === 200) {
            Swal.close();
      
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops... Error !!!!',
              // text: `Error ${res.statusText}`,
              confirmButtonText: 'Aceptar'
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops... Error !!!!',
            text: `Error ${error}`,
            confirmButtonText: 'Aceptar'
          });
        }

    }
    const handleFavoriteClick = (e) => {
      
        e.stopPropagation();
        if (!isFavorite) {
            //ejecuto post 
            fetchData("POST", song.cancionId)
        } else { 
            //ejecuto delete
            fetchData("DELETE",song.cancionId)
        }
        setIsFavorite(!isFavorite);
        onFavorite();
    };

    return (
        <div className="song-card" onClick={onClick}>
            <div className="image-container">
                <img src={image} alt={artist} className="artist-image" />
            </div>
            <h3 className="song-title">{title}</h3>
            <p className="flex flex-col">
                {artist.map((tag, index) => (
                    <span key={index}>{tag.nombre}</span>
                ))}
            </p>
            <p className="song-tags">
                {tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </p>
            <div className="button-container">
                <button
                    className="button-accion"
                    onClick={handleFavoriteClick}
                >
                    <FontAwesomeIcon icon={faHeart} className={isFavorite ? 'text-red-500' : 'text-white'} />
                </button>
                <button
                    className="button-accion"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToPlaylist();
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
}
