import React, { ReactElement, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useStore } from "@store/store";
import { Panel, PanelRow } from "@components/Panel";
import VideoSearch from "@components/VideoSearch";
import { Video } from "@interfaces/video";
import SearchResults from "../SearchResults";
import actions from "@store/store-actions";
import { fetchPlaylistItems } from "@client/api/video";

const SearchBar = (): ReactElement => {
  const { state, dispatch } = useStore();
  const [results, setResults] = useState<Video[]>([]);
  const [resultType, setResultType] = useState<string | null>(null);

  const handleResult = (videos: Video[], type: string): void => {
    setResults(videos);
    setResultType(type);
  };

  const handleReset = (): void => setResults([]);

  const handleAddToTop = async (video: Video) => {
    let videos = null;

    if (resultType === "playlist") {
      videos = await fetchPlaylistItems(video.id);

      videos = videos.payload.map((video) => ({
        ...video,
        priority: "streamer"
      }));
    }

    let playlist = [...state.session.playlist];

    if (playlist.length > 0) {
      const nowPlaying = state.session.playlist[0];
      playlist.shift();

      if (resultType === "playlist") {
        playlist = [nowPlaying, ...videos, ...playlist];
      } else {
        playlist = [
          nowPlaying,
          { ...video, priority: "streamer" },
          ...playlist
        ];
      }
    } else {
      if (resultType === "playlist") {
        playlist = [...videos, ...playlist];
      } else {
        playlist = [video, ...playlist];
      }

      dispatch({
        type: actions.PLAYER_PROGRESS_CHANGE,
        payload: { ...state.session, timestamp: 0 }
      });
    }

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: {
        ...state.session,
        playlist
      }
    });

    handleReset();
  };

  const handleAddToList = async (video: Video) => {
    let videos = null;

    if (resultType === "playlist") {
      videos = await fetchPlaylistItems(video.id);

      videos = videos.payload.map((video) => ({
        ...video,
        priority: "streamer"
      }));
    }

    const playlist = [...state.session.playlist];

    if (playlist.length === 0) {
      dispatch({
        type: actions.PLAYER_PROGRESS_CHANGE,
        payload: { ...state.session, timestamp: 0 }
      });
    }

    if (resultType === "playlist") {
      dispatch({
        type: actions.PLAYLIST_UPDATED,
        payload: {
          ...state.session,
          playlist: [...playlist, ...videos]
        }
      });
    } else {
      dispatch({
        type: actions.PLAYLIST_UPDATED,
        payload: {
          ...state.session,
          playlist: [...playlist, { ...video, priority: "streamer" }]
        }
      });
    }

    handleReset();
  };

  return (
    <Box>
      <Panel heading="Add songs">
        <PanelRow>
          <VideoSearch onResult={handleResult} onReset={handleReset} />

          {results.length > 0 && (
            <SearchResults
              videos={results}
              onAddToList={handleAddToList}
              onAddToTop={handleAddToTop}
            />
          )}
        </PanelRow>
      </Panel>
    </Box>
  );
};

export default SearchBar;
