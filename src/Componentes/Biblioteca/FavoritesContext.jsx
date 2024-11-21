import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const FavoritesContext = createContext();

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [playlists, setPlaylists] = useState({});

    // Añade una canción a los favoritos si no está ya en la lista.
    const addFavorite = (song) => {
        if (!favorites.some(fav => fav.url === song.url)) {
            setFavorites([...favorites, song]);
        }
    };

    // Elimina una canción de los favoritos
    const removeFavorite = (song) => {
        setFavorites((prev) => prev.filter((fav) => fav.url !== song.url));
    };

    // Crea una nueva lista de reproducción si no existe.
    const createPlaylist = (playlistName) => {
        if (!playlists[playlistName]) {
            setPlaylists(prevPlaylists => ({
                ...prevPlaylists,
                [playlistName]: []
            }));
        }
    };

    // Añade una canción a una lista de reproducción existente.
    const addSongToPlaylist = (song, playlistName) => {
        if (!playlists[playlistName]) {
            createPlaylist(playlistName);
        }
        setPlaylists(prevPlaylists => {
            const updatedPlaylist = prevPlaylists[playlistName]
                ? [...prevPlaylists[playlistName], song]
                : [song];
            return {
                ...prevPlaylists,
                [playlistName]: updatedPlaylist
            };
        });
    };

    // Elimina una canción de una lista de reproducción específica
    const removeSongFromPlaylist = (playlistName, song) => {
        setPlaylists((prev) => ({
            ...prev,
            [playlistName]: prev[playlistName].filter((item) => item.url !== song.url),
        }));
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                playlists,
                createPlaylist,
                addSongToPlaylist,
                removeSongFromPlaylist
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useFavorites = () => useContext(FavoritesContext);
