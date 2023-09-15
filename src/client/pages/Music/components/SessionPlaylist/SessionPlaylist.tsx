import React, { ReactElement, useEffect } from "react";
import { Box, Tooltip, IconButton, useDisclosure } from "@chakra-ui/react";
import { Panel, PanelRow } from "@components/Panel";
import { useStore } from "@store/store";
import DraggableList from "@components/DraggableList";
import { updateSession } from "@client/sockets/services/session";
import { useSocket } from "@client/sockets/sockets";
import PlaylistCard from "@pages/Music/components/SessionPlaylist/PlaylistCard";
import actions from "@store/store-actions";
import {
  FolderIcon,
  MoveUpIcon,
  SaveIcon,
  ShuffleIcon,
  TopOfListIcon,
  TrashIcon
} from "@assets/icons";
import { Video } from "@interfaces/video";
import PlaylistModal from "@components/PlaylistModal";
import SaveQueueModal from "@components/SaveQueueModal";
import { Playlist } from "@interfaces/playlist";
import { shuffleArray } from "@utils/youtube";

const SessionPlaylist = (): ReactElement => {
  const { state, dispatch } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: saveIsOpen,
    onOpen: saveOnOpen,
    onClose: saveOnClose
  } = useDisclosure();

  const handleDrop = (dragResult: any): void => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (!state.session.playlist) return;
    if (removedIndex === null && addedIndex === null) return;

    const result = [...state.session.playlist];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      const [item] = result.splice(removedIndex, 1);
      itemToAdd = item;
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: { ...state.session, playlist: result }
    });
  };

  const handleMoveUp = (video: Video, index: number) => {
    const playlist = [...state.session.playlist];
    playlist.splice(index, 1);
    playlist.splice(1, 0, video);

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: { ...state.session, playlist }
    });
  };

  const handleDelete = (index: number) => {
    const playlist = [...state.session.playlist];
    playlist.splice(index, 1);

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: { ...state.session, playlist }
    });
  };

  const getChildPayload = (index) => {
    return state.session.playlist[index];
  };

  const handleShuffle = (): void => {
    if (state.session.playlist.length === 0) return;

    let playlist = [...state.session.playlist];

    const curVideo = playlist[0];
    playlist.shift();
    playlist = shuffleArray(playlist);
    playlist = [curVideo, ...playlist];

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: { ...state.session, playlist }
    });
  };

  const onSelect = (playlist: Playlist) => {
    let newPlaylist = [...state.session.playlist];

    if (state.session.playlist.length > 0) {
      const nowPlaying = newPlaylist.shift();
      newPlaylist = [nowPlaying, ...playlist.videos, ...newPlaylist];
    } else {
      newPlaylist = [...playlist.videos, ...newPlaylist];
    }

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: {
        ...state.session,
        playlist: newPlaylist
      }
    });

    onClose();
  };

  return (
    <Box>
      <PlaylistModal isOpen={isOpen} onClose={onClose} onSelect={onSelect} />
      <SaveQueueModal
        videos={state.session.playlist}
        isOpen={saveIsOpen}
        onClose={saveOnClose}
      />

      <Panel
        heading="Queue"
        action={
          <Box>
            <Tooltip label="Shuffle" hasArrow>
              <IconButton
                aria-label="Shuffle playlist"
                variant="ghost"
                colorScheme="buttonGhost"
                color="text.100"
                onClick={handleShuffle}
                icon={<ShuffleIcon />}
              />
            </Tooltip>

            <Tooltip label="Load playlist" hasArrow>
              <IconButton
                aria-label="Load playlist"
                color="text.100"
                icon={<FolderIcon />}
                colorScheme="buttonGhost"
                variant="ghost"
                onClick={onOpen}
              />
            </Tooltip>

            <Tooltip label="Save queue as playlist" hasArrow>
              <IconButton
                aria-label="Save queue as playlist"
                color="text.100"
                icon={<SaveIcon />}
                colorScheme="buttonGhost"
                variant="ghost"
                onClick={saveOnOpen}
                disabled={state.session.playlist.length < 2}
              />
            </Tooltip>
          </Box>
        }
      >
        <PanelRow>
          <Box maxH="500px" overflowY="scroll">
            <DraggableList
              items={state.session.playlist.map((video, index) => (
                <PlaylistCard
                  key={`pc${index}`}
                  position={index}
                  title={video.title}
                  thumbnail={video.thumbnails.medium}
                  hidden={index === 0}
                >
                  <Tooltip label="To top of playlist" hasArrow>
                    <IconButton
                      colorScheme="gray"
                      variant="ghost"
                      size="lg"
                      aria-label="To top of playlist"
                      color="text.200"
                      _hover={{
                        color: "text.100",
                        bg: "ui.blue"
                      }}
                      _focus={{
                        color: "text.100",
                        bg: "ui.darkBlue"
                      }}
                      _active={{
                        color: "text.100",
                        bg: "ui.darkBlue"
                      }}
                      icon={<MoveUpIcon />}
                      onClick={() => handleMoveUp(video, index)}
                      d="none"
                      _groupHover={{
                        display: index === 1 ? "none" : "inline-block"
                      }}
                    />
                  </Tooltip>

                  <Tooltip label="Remove" hasArrow>
                    <IconButton
                      colorScheme="gray"
                      variant="ghost"
                      size="lg"
                      aria-label="Remove from playlist"
                      color="text.200"
                      _hover={{
                        color: "text.100",
                        bg: "ui.blue"
                      }}
                      _focus={{
                        color: "text.100",
                        bg: "ui.darkBlue"
                      }}
                      _active={{
                        color: "text.100",
                        bg: "ui.darkBlue"
                      }}
                      icon={<TrashIcon />}
                      onClick={() => handleDelete(index)}
                      d="none"
                      _groupHover={{
                        display: "inline-block"
                      }}
                    />
                  </Tooltip>
                </PlaylistCard>
              ))}
              minimum={2}
              onDrop={handleDrop}
              getChildPayload={getChildPayload}
            />
          </Box>
        </PanelRow>
      </Panel>
    </Box>
  );
};

export default SessionPlaylist;
