import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { SongCard } from "./Card";
// import './Inicio.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReproductorBuscador from '../Reproductor musica/ReproductorBuscador';
import { useFavorites } from '../Biblioteca/FavoritesContext';
import Modal from 'react-modal';
import { usePlayer } from '../Reproductor musica/PlayerContext';
import Swal from "sweetalert2";

Modal.setAppElement('#root'); // Establece el elemento raíz para accesibilidad

const Song = {
    url: '',
    title: '',
    tags: []
};

export default function Inicio() {
    const [songsTop10, setSongsTop10] = useState([]);
    const [songsTendencias, setSongsTendencias] = useState([]);
    const [favorites, setfavorites] = useState([]);
    const [selectedSongUrl, setSelectedSongUrl] = useState(Song);
    const { addFavorite, addSongToPlaylist, playlists } = useFavorites();
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
        fetch(`${import.meta.env.VITE_API_URL}/canciones/favoritosByUser`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setfavorites(data);
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

    function verificarFavorito(data, cancionId) {
        const existe = data.some(objeto => objeto.cancionId === cancionId);
        return existe;
    }

    const addFavorites = async (song, favoritoExistente) => {
    let metodo = favoritoExistente ? "DELETE" : "POST";
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/canciones/favoritos/${song.cancionId}`, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log (res.status);
            if (res.status === 201 || 200 ) {
                //settimeout
                Swal.close();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Error aca!!!!',
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

    const openModal = (song) => {
        setCurrentSong(song.url); // Establece la canción en el contexto
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPlaylistName('');
        setSelectedPlaylist('');
        setErrorMessage('');
    };
    const handleAddToPlaylist = () => {
        if (selectedPlaylist) {
            const playlistSongs = playlists[selectedPlaylist];
            const isSongInPlaylist = playlistSongs.some(song => song.url === currentSong);

            if (isSongInPlaylist) {
                setErrorMessage('Esta canción ya está en esa playlist.');
            } else {
                const currentSongData = songsTop10.find(song => song.url === currentSong) || songsTendencias.find(song => song.url === currentSong);
                if (currentSongData) {
                    addSongToPlaylist(currentSongData, selectedPlaylist); // Agrega el objeto completo de la canción
                    console.log(`Canción añadida: ${currentSong}`);
                    closeModal();
                }
            }
        } else {
            setErrorMessage('Por favor selecciona una playlist.');
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
                        song= {song}
                            key={index}
                            onClick={() => {
                                setSelectedSongUrl({ url: `${import.meta.env.VITE_API_URL}/files/song/${song.songFilename}`, title: song.titulo, tags: song.genero?.generos });
                                setCurrentSong(song.url); // Establece la canción en el contexto del reproductor
                            }}
                            onFavorite={() => addFavorites(song, verificarFavorito(favorites, song.cancionId))}
                            valueFavorito={verificarFavorito(favorites, song.cancionId)}
                            onAddToPlaylist={() => openModal(song)}
                        />
                    ))}
                </Slider>
            </div>
            <p className="section-title">Tendencias</p>
            <div className="my-4">
                <Slider {...settings}>
                    {songsTendencias.map((song, index) => (
                        <SongCard
                        song= {song}
                            key={index}
                            onClick={() => {
                                setSelectedSongUrl({ url: `${import.meta.env.VITE_API_URL}/files/song/${song.songFilename}`, title: song.titulo, tags: [song.genero?.genero], artist: [song.artistas] });
                                setCurrentSong(song.url);
                            }}
                            onFavorite={() => addFavorites(song, verificarFavorito(favorites, song.cancionId))}
                            valueFavorito={verificarFavorito(favorites, song.cancionId)}
                            onAddToPlaylist={() => openModal(song)} // Asegúrate de que el modal se abre con la canción correcta
                        />
                    ))}
                </Slider>
            </div>
            {selectedSongUrl.url && <ReproductorBuscador songUrl={selectedSongUrl.url} title={selectedSongUrl.title} tags={selectedSongUrl.tags} />}

            {/* Modal para agregar a playlist */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal-overlay"
            >
                <div className="Modal-playlist">
                    <h2>Añadir a Playlist</h2>
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
            </Modal>
        </div>
    );
}
