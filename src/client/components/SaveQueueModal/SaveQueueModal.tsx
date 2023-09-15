import React, { ReactElement, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Text
} from "@chakra-ui/react";
import { Video } from "@interfaces/video";
import { updatePlaylist } from "@client/api/playlist";
import { useStore } from "@store/store";
import actions from "@store/store-actions";
import playlist from "@models/playlist";

const SaveQueueModal = ({
  videos,
  isOpen,
  onClose
}: {
  videos: Video[];
  isOpen: boolean;
  onClose: () => void;
}): ReactElement => {
  const { state, dispatch } = useStore();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(videos.reduce((a, b) => a + b.duration, 0));
  }, [videos]);

  const handleSave = async (): Promise<void> => {
    setIsLoading(true);

    if (!title || title.length === 0) {
      setError("Title should not be empty");
      setIsLoading(false);
      return;
    }

    setError(null);

    const res = await updatePlaylist({
      id: null,
      user_id: state.user.id,
      title,
      duration,
      videos
    });

    if (state.userPlaylists !== null) {
      dispatch({
        type: actions.USER_UPDATE_PLAYLISTS,
        payload: [...state.userPlaylists, res.payload]
      });
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save {videos.length} videos as playlist</ModalHeader>
        <ModalBody my={4}>
          <Input
            variant="filled"
            size="lg"
            bg="ui.blue"
            color="white"
            placeholder="Untitled playlist"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={error !== null}
            isDisabled={isLoading}
            _hover={{
              bg: "ui.darkBlue"
            }}
            _active={{
              bg: "ui.darkBlue"
            }}
            _focus={{
              bg: "ui.darkBlue"
            }}
          />

          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="buttonGhost"
            mr={3}
            onClick={onClose}
            color="white"
            size="lg"
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            colorScheme="buttonOrange"
            size="lg"
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveQueueModal;
