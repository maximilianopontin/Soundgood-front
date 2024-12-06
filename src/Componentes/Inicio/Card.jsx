import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './card.css';


export function SongCard({ song, onClick, onFavorite, onAddToPlaylist, valueFavorito }) {
    const [isFavorite, setIsFavorite] = useState(valueFavorito);  // Estado para controlar si la canción es favorita


    const handleFavoriteClick = (e) => {

        e.stopPropagation();
        onFavorite(song, isFavorite);
        setIsFavorite(!isFavorite);

    };

    return (
        <div className="song-card" onClick={onClick}>
            <div className="image-container">
                <img src={`${import.meta.env.VITE_API_URL}/files/image/${song.imageFilename}`} alt={song.artistas} className="artist-image" />
            </div>
            <h3 className="song-title">{song.titulo}</h3>
            <p className="flex flex-col text-white">
                {song.artistas.map((tag, index) => (
                    <span key={index}>{tag.nombre}</span>
                ))}
            </p>
            <p className="song-tags">
    {(typeof song.genero?.genero === "string"
        ? song.genero.genero.split(",") // Convierte la cadena en un array
        : song.genero?.genero || []
    ).map((tag, index) => (
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
