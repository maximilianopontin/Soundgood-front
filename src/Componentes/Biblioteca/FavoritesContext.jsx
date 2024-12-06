import React, { createContext, useState, useContext, useEffect } from 'react';
import Swal from "sweetalert2";
// Crear el contexto
const FavoritesContext = createContext();

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);
    const [playlists, setPlaylists] = useState({});
    const [selectedSongUrl, setSelectedSongUrl] = useState({});

   
    // Añade una canción a los favoritos si no está ya en la lista.
    const verificarFavorito = (data, cancionId) => {
        const existe = data.some(objeto => objeto.cancionId === cancionId);
        return existe;
    }

    const addFavorites = async (song, favoritoExistente, setFavorites) => {

        //agregar o remover la cancion ue esta en los favoritos del usuarios
        const metodo = favoritoExistente ? "DELETE" : "POST";

        try {
            const token = localStorage.getItem('access_token'); //aca obtenemos el token que contiene el id del usuario

            // Mostrar la alerta de carga
            Swal.fire({
                title: metodo == "POST" ? 'Guardando tu favorito...' : "Eliminando tu favorito",
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });


            const res = await fetch(`${import.meta.env.VITE_API_URL}/canciones/favoritos/${song.cancionId}`, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

         
            // Validar la respuesta
            if (res.ok) {
                if (metodo === "POST") {
                    setFavorites((prevFavorites) => {
                        const updatedFavorites = [...prevFavorites, song];
                        return updatedFavorites;
                    });
                    
                    Swal.fire({
                        icon: 'success',
                        title: '¡Favorito guardado!',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } else {
                    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.cancionId !== song.cancionId));
                    Swal.fire({
                        icon: 'success',
                        title: '¡Favorito eliminado!',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            } else {
                const errorText = await res.text();
                throw new Error(`Error: ${res.status} - ${errorText}`);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar favorito',
                text: error.message,
                confirmButtonText: 'Aceptar',
            });
        }
    }

    const removeFavorite = async (song) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/canciones/favoritos/${song.cancionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.ok) {
                // Si la eliminación fue exitosa, actualiza el estado de favoritos
                setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.cancionId !== song.cancionId));
                Swal.fire({
                    icon: 'success',
                    title: '¡Favorito eliminado!',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                const errorText = await res.text();
                throw new Error(`Error: ${res.status} - ${errorText}`);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar favorito',
                text: error.message,
                confirmButtonText: 'Aceptar',
            });
        }
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
                setFavorites,
                addFavorites,
                verificarFavorito,
                removeFavorite,
                playlists,
                createPlaylist,
                addSongToPlaylist,
                removeSongFromPlaylist,
                selectedSongUrl,
                setSelectedSongUrl,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useFavorites = () => useContext(FavoritesContext);
