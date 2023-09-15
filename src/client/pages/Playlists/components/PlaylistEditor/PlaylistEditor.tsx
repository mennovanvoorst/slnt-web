import React, { ChangeEvent, Dispatch, ReactElement, useState } from "react";
import { Panel, PanelRow } from "@components/Panel";
import { Box, Button, IconButton, Input, HStack } from "@chakra-ui/react";
import { Playlist } from "@interfaces/playlist";
import DraggableList from "@components/DraggableList";
import PlaylistCard from "@pages/Music/components/SessionPlaylist/PlaylistCard";
import { CheckIcon, PencilIcon, PlusIcon, TrashIcon } from "@assets/icons";

const PlaylistEditor = ({
  playlist,
  setPlaylist,
  onSave,
  onChange,
  onRemove
}: {
  playlist: Playlist;
  setPlaylist: Dispatch<any>;
  onSave: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}): ReactElement => {
  const [editTitle, setEditTile] = useState(false);

  const handleDrop = (dragResult: any): void => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return;

    const result = [...playlist.videos];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      const [item] = result.splice(removedIndex, 1);
      itemToAdd = item;
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    setPlaylist({ ...playlist, videos: result });
  };

  const getChildPayload = (index) => {
    return playlist.videos[index];
  };

  const toggleEdit = () => {
    setEditTile(!editTitle);
  };

  const renderTitle = () => {
    if (!editTitle) return <>{playlist.title}</>;

    return (
      <Input
        placeholder="Playlist title"
        name="title"
        value={playlist.title}
        onChange={onChange}
      />
    );
  };

  if (!playlist) return <></>;

  return (
    <Box>
      <Panel
        heading={renderTitle()}
        headingAction={
          <IconButton
            aria-label="Change title"
            variant="ghost"
            colorScheme="buttonGhost"
            icon={editTitle ? <CheckIcon /> : <PencilIcon />}
            onClick={toggleEdit}
            ml={2}
          />
        }
        action={
          <HStack spacing={4}>
            <Button colorScheme="buttonBlue" size="lg" onClick={onSave}>
              Save
            </Button>
          </HStack>
        }
      >
        <PanelRow>
          <Box maxH="500px" overflowY="scroll">
            <DraggableList
              items={playlist.videos.map((video, index) => (
                <PlaylistCard
                  key={`pc${index}`}
                  position={index + 1}
                  title={video.title}
                  thumbnail={video.thumbnails.medium}
                  hidden={false}
                >
                  <IconButton
                    aria-label="Delete video"
                    variant="ghost"
                    color="text.100"
                    colorScheme="buttonGhost"
                    icon={<TrashIcon />}
                    onClick={() => onRemove(index)}
                  />
                </PlaylistCard>
              ))}
              minimum={1}
              onDrop={handleDrop}
              getChildPayload={getChildPayload}
            />
          </Box>
        </PanelRow>
      </Panel>
    </Box>
  );
};

export default PlaylistEditor;
