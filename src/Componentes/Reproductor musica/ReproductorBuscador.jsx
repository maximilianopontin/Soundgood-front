import { useState, useEffect } from "react";
import Canciones from "@madzadev/audio-player";
import "./Reproductor.css";

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

function ReproductorBuscador({ songUrl, title, tags }) {
  const [tracks, setTracks] = useState([]); // Lista de pistas

  // Actualiza las pistas cada vez que songUrl, title o tags cambien
  useEffect(() => {
    if (songUrl) {
      setTracks([
        {
          url: songUrl,
          title: title || "Título desconocido", // Título por defecto si no se pasa
          tags: tags || [], // Tags vacíos si no se pasan
        },
      ]);
    }
  }, [songUrl, title, tags]); // Dependencias

  console.log(tracks);

  return (
    <div className="reproductor">
      {tracks.length > 0 && (
        <Canciones
          key={tracks[0].url}
          trackList={tracks} // Lista de pistas
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

export default ReproductorBuscador;
