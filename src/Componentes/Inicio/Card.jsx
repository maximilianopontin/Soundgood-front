import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import './card.css';

export function SongCard({ url, title, tags= [], onClick, image, artist, onFavorite, onAddToPlaylist }) {
    const [isFavorite, setIsFavorite] = useState(false);  // Estado para controlar si la canción es favorita

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onFavorite();
    };

    return (
        <div className="song-card" onClick={onClick}>
            <div className="image-container">
                <img src={image} alt={artist} className="artist-image" />
            </div>
            <h3>{title}</h3>
            {/* Verifica si `tags` es un array y lo usa en `.join()` */}
            <p>{Array.isArray(tags) ? tags.join(', ') : ''}</p>
            <div className="button-container">
                <button
                    className="favorite-button"
                    onClick={handleFavoriteClick}
                    style={{ border: 'none', cursor: 'pointer' }}
                >
                    <FontAwesomeIcon icon={faHeart} style={{ color: isFavorite ? 'red' : 'white' }} />
                </button>
                <button
                    className="add-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToPlaylist();
                    }}
                    style={{ border: 'none', cursor: 'pointer' }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
}
