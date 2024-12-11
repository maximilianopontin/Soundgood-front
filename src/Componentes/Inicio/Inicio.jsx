import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { SongCard } from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReproductorBuscador from '../Reproductor musica/ReproductorBuscador';
import { useFavorites } from '../Biblioteca/FavoritesContext';
import Modal from 'react-modal';
import { usePlayer } from '../Reproductor musica/PlayerContext';

Modal.setAppElement('#root'); // Establece el elemento raíz para accesibilidad

const Song = {
    url: '',
    title: '',
    tags: []
};

export default function Inicio() {
    const [songsTop10, setSongsTop10] = useState([]);
    const [songsTendencias, setSongsTendencias] = useState([]);
    const { addFavorites, verificarFavorito, addSongToPlaylist, playlists, setSelectedSongUrl, selectedSongUrl, favorites, setFavorites } = useFavorites();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState(''); // Playlist seleccionada
    const [errorMessage, setErrorMessage] = useState('');
    const { currentSong, setCurrentSong } = usePlayer();

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/canciones/top10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setSongsTop10(data);
            })
            .catch(error => {
                console.error('Error cargando las canciones:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/canciones/favoritosByUser`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setFavorites(data);
            })
            .catch(error => {
                console.error('Error cargando los favoritos:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/canciones/tendencias`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setSongsTendencias(data);
            })
            .catch(error => {
                console.error('Error cargando las canciones:', error);
            });
    }, []);

    useEffect(() => {
        console.log('currentSong ha cambiado:', currentSong);
    }, [currentSong]);
    
    const openModal = (song) => {
        console.log('Abriendo modal para canción:', song);
        console.log('URL de la canción:', song.songFilename);  // Verifica que esté accediendo a la propiedad correcta
        setCurrentSong(song.songFilename);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setPlaylistName('');
        setSelectedPlaylist('');
        setErrorMessage('');
    };

    // Usa setSelectedSongUrl directamente desde el contexto
    const handleSongClickSong = (song) => {
        if (!song || !song.songFilename || !song.titulo) {
            console.error('Datos de la canción incompletos:', song);
            return;
        }
        setSelectedSongUrl({
            url: `${import.meta.env.VITE_API_URL}/files/song/${song.songFilename}`,
            title: song.titulo,
            tags: song.genero?.generos || [],
        });
    };

    const handleAddToPlaylist = () => {
        if (!currentSong) {
            console.error('No hay canción seleccionada');
            return; // Salir de la función si no hay canción seleccionada
        }
    
        console.log('currentSong en handleAddToPlaylist:', currentSong); // Verifica el valor de currentSong
    
        if (!selectedPlaylist) {
            setErrorMessage('Por favor selecciona una playlist.');
            return;
        }
        const playlistSongs = playlists[selectedPlaylist] || [];
        console.log('Contenido de playlistSongs:', playlistSongs);

        const currentSongNormalized = currentSong?.trim().toLowerCase();
        console.log('Canción actual:', currentSong);
        console.log('Canción normalizada:', currentSongNormalized);

        const isSongInPlaylist = playlistSongs.some(song => song.songFilename?.trim().toLowerCase() === currentSongNormalized);
        console.log('¿La canción ya está en la playlist?', isSongInPlaylist);

        if (isSongInPlaylist) {
            setErrorMessage('Esta canción ya está en esa playlist.');
        } else {
            const currentSongData = songsTop10.find(song => song.songFilename?.trim().toLowerCase() === currentSongNormalized)
                || songsTendencias.find(song => song.songFilename?.trim().toLowerCase() === currentSongNormalized);

            if (!currentSongData) {
                console.error('Error: No se encontró la canción actual en la lista de canciones.');
                return;
            }

            addSongToPlaylist(currentSongData, selectedPlaylist);
            console.log(`Canción añadida: ${currentSongData.titulo}`);
            closeModal();
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Muestra 4 tarjetas
        slidesToScroll: 1, // Cambia de una tarjeta a la vez
        centerMode: true, // Activa el modo de centrado
        centerPadding: '5%', // Espacio adicional a los lados
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerPadding: '20px',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                }
            }
        ]
    };

    return (
        <div className="bg-black pb-8">
            <p className="section-title">Top 10</p>
            <div className="my-4">
                <Slider {...settings}>
                    {songsTop10.map((song, index) => (
                        <SongCard
                            song={song}
                            key={index}
                            onClick={() => {
                                handleSongClickSong(song);
                                setCurrentSong(song.songFilename); // Establece la canción en el reproductor
                            }}
                            onFavorite={() =>
                                addFavorites(song, verificarFavorito(favorites, song.cancionId), setFavorites)
                            }
                            valueFavorito={verificarFavorito(favorites, song.cancionId)}
                            onAddToPlaylist={() => openModal(song)} // Asegúrate de que el modal se abre con la canción correcta
                        />
                    ))}
                </Slider>
            </div>
            <p className="section-title">Tendencias</p>
            <div className="my-4">
                <Slider {...settings}>
                    {songsTendencias.map((song, index) => (
                        <SongCard
                            song={song}
                            key={index}
                            onClick={() => {
                                handleSongClickSong(song);
                                setCurrentSong(song.songFilename); // Establece la canción en el reproductor
                            }}
                            onFavorite={() =>
                                addFavorites(song, verificarFavorito(favorites, song.cancionId), setFavorites)
                            }
                            valueFavorito={verificarFavorito(favorites, song.cancionId)}
                            onAddToPlaylist={() => openModal(song)} // Asegúrate de que el modal se abre con la canción correcta
                        />
                    ))}
                </Slider>
            </div>
            {selectedSongUrl.url &&
                <ReproductorBuscador
                    songUrl={selectedSongUrl.url}
                    title={selectedSongUrl.title}
                    tags={selectedSongUrl.tags} />}

            {/* Modal para agregar a playlist */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal-overlay"
            >
                <div className="modal-playlist">
                    <div className="modal-content-playlist">
                        <h3>Añadir a Playlist</h3>
                        <select
                            className="modal-select-playlist"
                            value={selectedPlaylist}
                            onChange={(e) => setSelectedPlaylist(e.target.value)}
                        >
                            <option value="">Selecciona una playlist</option>
                            {Object.keys(playlists).map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="modal-buttons">
                            <button onClick={handleAddToPlaylist}>Añadir</button>
                            <button onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
