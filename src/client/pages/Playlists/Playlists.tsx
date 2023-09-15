import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import {
  deletePlaylist,
  fetchUserPlaylists,
  updatePlaylist
} from "@client/api/playlist";
import PlaylistsList from "./components/PlaylistsList";
import SearchBar from "@pages/Playlists/components/SearchBar";
import { Video } from "@interfaces/video";
import { useStore } from "@store/store";
import PlaylistEditor from "@pages/Playlists/components/PlaylistEditor";
import { Playlist } from "@interfaces/playlist";
import { fetchPlaylistItems } from "@client/api/video";

const Playlists = (): ReactElement => {
  const { state, dispatch } = useStore();
  const [playlists, setPlaylists] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const { success, payload } = await fetchUserPlaylists();

      if (success) {
        setPlaylists(payload);
      } else {
        setPlaylists([]);
      }
    };

    fetch();
  }, []);

  const handleCreate = () => {
    setCurrentPlaylist({
      id: null,
      user_id: state.user.id,
      title: "Untitled playlist",
      duration: 0,
      videos: []
    });
  };

  const handleSelect = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
  };

  const handleAddVideo = async (video: Video, resultType: string) => {
    let videos = null;

    if (resultType === "playlist") {
      videos = await fetchPlaylistItems(video.id);

      videos = videos.payload;
    } else {
      videos = [video, ...currentPlaylist.videos];
    }
    const duration = getDuration(videos);

    setCurrentPlaylist({
      ...currentPlaylist,
      videos,
      duration
    });
  };

  const handleRemoveVideo = (index: number) => {
    const videos = [...currentPlaylist.videos];

    videos.splice(index, 1);

    const duration = getDuration(videos);

    setCurrentPlaylist({ ...currentPlaylist, videos, duration });
  };

  const handleDelete = async () => {
    let p = [...playlists];

    await deletePlaylist(currentPlaylist.id);

    p = p.filter((playlist) => playlist.id !== currentPlaylist.id);

    setCurrentPlaylist(null);
    setPlaylists(p);
  };

  const handleSave = async (): Promise<void> => {
    const res = await updatePlaylist(currentPlaylist);

    const list = playlists.findIndex(
      (playlist) => playlist.id === res.payload.id
    );

    if (list === -1) {
      setPlaylists([...playlists, res.payload]);
      setCurrentPlaylist({ ...currentPlaylist, id: res.payload.id });
    } else {
      const lists = [...playlists];
      lists[list] = res.payload;

      setPlaylists(lists);
    }
  };

  const getDuration = (arr: any[]): void =>
    arr.reduce((a, b) => a + b.duration, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrentPlaylist({
      ...currentPlaylist,
      [e.target.name]: e.target.value
    });
  };

  if (!playlists) return <Spinner size="lg" color="text.100" />;

  return (
    <Grid
      w="full"
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={6}
    >
      <Box>
        <PlaylistsList
          items={playlists}
          onCreate={handleCreate}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </Box>

      <Box>
        <SearchBar onAdd={handleAddVideo} show={currentPlaylist !== null} />

        <PlaylistEditor
          playlist={currentPlaylist}
          setPlaylist={setCurrentPlaylist}
          onSave={handleSave}
          onChange={handleChange}
          onRemove={handleRemoveVideo}
        />
      </Box>
    </Grid>
  );
};

export default Playlists;
