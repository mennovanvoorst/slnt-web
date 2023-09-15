import React, { ReactElement, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Tr,
  Td,
  Text,
  Table,
  Thead,
  Th,
  Tbody,
  IconButton
} from "@chakra-ui/react";
import { intervalToDuration } from "date-fns";
import { Playlist } from "@interfaces/playlist";
import { useFetchUserPlaylists } from "../../hooks/useUserPlaylists";
import { Simulate } from "react-dom/test-utils";
import play = Simulate.play;

const PlaylistModal = ({
  onSelect,
  isOpen,
  onClose
}: {
  onSelect: (playlist: Playlist) => void;
  isOpen: boolean;
  onClose: () => void;
}): ReactElement => {
  const [playlists, isFetching, success] = useFetchUserPlaylists();
  const [selected, setSelected] = useState(null);

  const renderItems = playlists.map((playlist) => {
    const duration = intervalToDuration({
      start: 0,
      end: playlist.duration * 1000
    });

    return (
      <Tr
        onClick={() => setSelected(playlist.id)}
        bg={selected === playlist.id && "ui.dark3"}
        _hover={{ cursor: "pointer", bg: "ui.dark3" }}
      >
        <Td fontWeight="semiBold">{playlist.title}</Td>
        <Td>{`${duration.hours > 0 ? duration.hours + "h" : ""} ${
          duration.minutes
        }m`}</Td>
        <Td>{playlist.videos.length} video&apos;s</Td>
      </Tr>
    );
  });

  const renderTable = () => {
    if (playlists.length === 0)
      return <Text color="text.200">No playlists have been created.</Text>;

    return (
      <Table variant="unstyled" color="text.200">
        <Thead>
          <Tr>
            <Th>TITLE</Th>
            <Th>DURATION</Th>
            <Th>AMOUNT</Th>
          </Tr>
        </Thead>
        <Tbody>{renderItems}</Tbody>
      </Table>
    );
  };

  if (isFetching) return <div></div>;

  return (
    <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Load playlist</ModalHeader>
        <ModalBody>{renderTable()}</ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="buttonGhost"
            mr={3}
            onClick={onClose}
            color="white"
            size="lg"
          >
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="buttonOrange"
            size="lg"
            onClick={() => onSelect(playlists.find((p) => p.id === selected))}
          >
            Load
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlaylistModal;
