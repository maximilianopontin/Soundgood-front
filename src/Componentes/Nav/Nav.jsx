import { Logo } from "../../logo/logo";
import './Nav.css';
import './modal.css';
import { useState, useEffect } from "react";
import ReproductorBuscador from "../Reproductor musica/ReproductorBuscador";
import { Link } from "react-router-dom";
import { SongCard } from '../Inicio/Card';
import { useFavorites } from '../Biblioteca/FavoritesContext';
import { usePlayer } from '../Reproductor musica/PlayerContext';
import { IoCloseCircleOutline } from "react-icons/io5";

const Song = {
    url: '',
    title: '',
    tags: []
};

export default function Nav() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);  // Modal de búsqueda
    const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false); // Modal de agregar a playlist
    const [songUrlReproductor, setSongUrlReproductor] = useState(Song);
    const [cancionesTracks, setCancionesTracks] = useState([]);
    const { addFavorite, addSongToPlaylist, playlists } = useFavorites();
    const [playlistName, setPlaylistName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    //const [currentSong, setCurrentSong] = useState(null);
    const { setCurrentSong } = usePlayer();
    const [selectedPlaylist, setSelectedPlaylist] = useState
        (''); // Playlist seleccionada

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/canciones`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setCancionesTracks(data);
            })
            .catch(error => {
                console.error('Error cargando las canciones:', error);
            });
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return;
        }
        const filteredResults = [
            ...cancionesTracks.filter(song =>
                song.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            )
        ];
        setSearchResults(filteredResults);
        setSearchModalOpen(true); // Abrir el modal de búsqueda
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSongSelec = (song) => {
        setSongUrlReproductor({ ...song });
        setCurrentSong(song.url); // Establece la canción en el contexto
        setSearchModalOpen(false); // Cierra el modal de búsqueda
        setPlaylistModalOpen(false); // Cierra el modal de playlist, si está abierto
    };

    const handleAddToPlaylist = () => {
        if (selectedPlaylist) {
            // Verifica si la playlist seleccionada ya tiene la canción actual
            //Usamos el método some para verificar si alguna de las canciones en la playlist seleccionada 
            //tiene el mismo url que la canción actual (currentSong).
            const playlistSongs = playlists[selectedPlaylist];
            const isSongInPlaylist = playlistSongs.some(song => song.url === currentSong);

            if (isSongInPlaylist) {
                setErrorMessage('Esta canción ya está en esa playlist.');
            } else {
                // Si no está en la playlist, la añade
                addSongToPlaylist(currentSong, selectedPlaylist);
                console.log(`Canción añadida: ${currentSong}`);
                console.log('Canciones en la playlist:', playlists[selectedPlaylist]);
                closeModal();
            }
        } else {
            setErrorMessage('Por favor selecciona una playlist.');
        }
    };

    const handleFavorite = (song) => {
        addFavorite(song); // Añade la canción a favoritos
    };

    const openPlaylistModal = (song) => {
        setCurrentSong(song); // Establece la canción seleccionada
        setPlaylistModalOpen(true); // Abrir el modal de agregar a playlist
    };

    return (
        <nav>
            <div className="navbar">
                <div className="nav-logo">
                    <Link to="/home">
                        <Logo />
                    </Link>
                </div>
                <div className="nav-buscador">
                    <input type="text"
                        placeholder="Qué querés escuchar hoy?..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button type="button" onClick={handleSearch}>Buscar</button>
                </div>
                <div className="nav-links">
                    <Link to="/biblioteca">Biblioteca</Link>
                    <Link to="/cuenta">Cuenta</Link>
                </div>
            </div>
            {isSearchModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 w-full h-screen">
                    <div className="relative w-full lg:w-5/6 p-4 bg-white shadow-xl rounded-[25px] max-h-[80vh] overflow-hidden overflow-y-auto">
                        <span
                            onClick={() => setSearchModalOpen(false)}
                            className="absolute top-4 right-4 lg:top-8 lg:right-8 cursor-pointer"
                        >
                            <IoCloseCircleOutline className="w-4 h-4 md:w-10 md:h-10 text-red rounded-full" />
                        </span>
                        <h2 className=" mt-0 mb-3 text-2xl font-bold text-gray-800 text-center">Canciones encontradas</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-4 gap-5 content-between">
                            {searchResults.map((song, index) => (
                                <SongCard
                                    key={index}
                                    title={song.titulo}
                                    tags={[song.genero?.genero]}
                                    artist={song.artistas}
                                    image={`${import.meta.env.VITE_API_URL}/files/image/${song.imageFilename}`}
                                    url={`${import.meta.env.VITE_API_URL}/files/song/${song.songFilename}`}
                                    onClick={() => handleSongSelec(song)}
                                    onFavorite={() => handleFavorite(song)}
                                    onAddToPlaylist={() => openPlaylistModal(song)}  // Abre el modal de playlist
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {isPlaylistModalOpen && (
                <div className="modal-playlist" onClick={() => setPlaylistModalOpen(false)}>
                    <div className="modal-content-playlist" onClick={(e) => e.stopPropagation()}>
                        <h3>Añadir a Playlist</h3>
                        {/* Dropdown para seleccionar la playlist- el value es la playlist seleccionada 
                            por el usuario (selectedPlaylist), y se actualiza con el método onChange. */}
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
                        {/*Si el usuario intenta añadir una canción sin seleccionar una playlist, aparecerá un mensaje de error.*/}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button onClick={handleAddToPlaylist}>Añadir</button>
                        <button onClick={() => setPlaylistModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}
            <ReproductorBuscador songUrl={songUrlReproductor.url} title={songUrlReproductor.title} tags={songUrlReproductor.tags} />
        </nav>
    );
};
