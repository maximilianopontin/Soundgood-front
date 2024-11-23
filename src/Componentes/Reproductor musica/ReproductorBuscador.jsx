import { useState, useEffect } from "react";
import Canciones from "@madzadev/audio-player";
import "./Reproductor.css";
import { usePlayer } from "./PlayerContext"; // Contexto global para manejar la canción actual

// Colores personalizados para estilizar el componente de audio
const colors = {
  tagsBackground: "#5fa25b",
  tagsText: "#ffffff",
  tagsBackgroundHoverActive: "#5fa25b",
  tagsTextHoverActive: "#ffffff",
  searchBackground: "#18191f",
  searchText: "#ffffff",
  searchPlaceHolder: "#575a77",
  playerBackground: "#292b30",
  titleColor: "#ffffff",
  timeColor: "#5fa25b",
  progressSlider: "#5fa25b",
  progressUsed: "#ffffff",
  progressLeft: "#151616",
  bufferLoaded: "#1f212b",
  volumeSlider: "#5fa25b",
  volumeUsed: "#ffffff",
  volumeLeft: "#151616",
  playlistBackground: "#292b30",
  playlistText: "#575a77",
  playlistBackgroundHoverActive: "#18191f",
  playlistTextHoverActive: "#ffffff",
};

function Reproductor({ songUrl, title, tags, songs, isDemo }) {
  const { currentSong } = usePlayer(); // Obtén la canción actual desde el contexto
  const [tracks, setTracks] = useState([]);

  // Cargar canciones según props o desde un archivo local
  useEffect(() => {
    if (songs && songs.length > 0) {
      setTracks(songs);
    } else if (isDemo) {
      fetch("/Canciones.json")
        .then((response) => response.json())
        .then((data) => setTracks(data))
        .catch((error) =>
          console.error("Error loading the tracks from file:", error)
        );
    } else if (songUrl) {
      setTracks([
        {
          url: songUrl,
          title: title || "Título desconocido",
          tags: tags || [],
        },
      ]);
    }
  }, [songUrl, title, tags, songs, isDemo]);

  // Actualizar la lista para marcar la canción que está siendo reproducida
  useEffect(() => {
    if (currentSong && tracks.length > 0) {
      setTracks((prevTracks) =>
        prevTracks.map((track) => ({
          ...track,
          isPlaying: track.url === currentSong,
        }))
      );
    }
  }, [currentSong]);

  return (
    <div className="reproductor">
      {tracks.length > 0 && (
        <Canciones
          trackList={tracks}
          includeTags={false}
          includeSearch={false}
          showPlaylist={false}
          sortTracks={true}
          autoPlayNextTrack={true}
          customColorScheme={colors}
        />
      )}
    </div>
  );
}

export default Reproductor;
