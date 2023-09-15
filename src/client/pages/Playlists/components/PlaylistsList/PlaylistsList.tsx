import React, { ReactElement } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton
} from "@chakra-ui/react";
import { Panel, PanelRow } from "@components/Panel";
import { Playlist } from "@interfaces/playlist";
import { intervalToDuration } from "date-fns";
import { PlusIcon, TrashIcon } from "@assets/icons";

const PlaylistsList = ({
  items,
  onCreate,
  onSelect,
  onDelete
}: {
  items: Playlist[];
  onCreate: () => void;
  onSelect: (playlist: Playlist) => void;
  onDelete: () => void;
}): ReactElement => {
  const renderItems = items.map((playlist) => {
    const duration = intervalToDuration({
      start: 0,
      end: playlist.duration * 1000
    });

    return (
      <Tr
        onClick={() => onSelect(playlist)}
        _hover={{ cursor: "pointer", bg: "ui.dark3" }}
        role="group"
      >
        <Td fontWeight="semiBold">{playlist.title}</Td>
        <Td>{`${duration.hours > 0 ? duration.hours + "h" : ""} ${
          duration.minutes
        }m`}</Td>
        <Td>{playlist.videos.length} video&apos;s</Td>
        <Td d="flex" justifyContent="flex-end">
          <IconButton
            aria-label="Delete playlist"
            variant="ghost"
            colorScheme="buttonGhost"
            icon={<TrashIcon />}
            size="lg"
            onClick={onDelete}
            opacity={0}
            _groupHover={{
              opacity: 1
            }}
          />
        </Td>
      </Tr>
    );
  });

  const renderTable = () => {
    if (items.length === 0)
      return <Text color="text.200">No playlists have been created.</Text>;

    return (
      <Table variant="unstyled" color="text.200">
        <Thead>
          <Tr>
            <Th>TITLE</Th>
            <Th>DURATION</Th>
            <Th>AMOUNT</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{renderItems}</Tbody>
      </Table>
    );
  };

  return (
    <Panel
      heading="Playlists"
      action={
        <IconButton
          aria-label="Create playlist"
          colorScheme="buttonBlue"
          icon={<PlusIcon />}
          size="lg"
          onClick={onCreate}
        />
      }
    >
      <PanelRow>{renderTable()}</PanelRow>
    </Panel>
  );
};

export default PlaylistsList;
