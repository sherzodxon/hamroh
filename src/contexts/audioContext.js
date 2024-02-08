import { createContext } from "react";

const playListConfig = {
   playlist: [],
   setCurrentPlaylistContext: (playListInput) => {
      playListConfig.playlist = playListInput;
   },
};

export const PlaylistsContext = createContext(playListConfig);
