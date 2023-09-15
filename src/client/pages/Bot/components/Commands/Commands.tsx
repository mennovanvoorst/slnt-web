import React, { ReactElement, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  HStack,
  Switch,
  Input,
  Td,
  Tr,
  Table,
  useDisclosure,
  ModalHeader
} from "@chakra-ui/react";
import { Panel, PanelRow } from "@components/Panel";
import { Playlist } from "@interfaces/playlist";
import { intervalToDuration } from "date-fns";
import {
  AudioMixerIcon,
  ClockIcon,
  FolderIcon,
  PencilIcon,
  PlusIcon,
  PrefixIcon,
  RobotIcon,
  ServerIcon,
  SessionIcon,
  StopwatchIcon,
  TrashIcon
} from "@assets/icons";
import { Settings } from "@interfaces/settings";
import CommandsModal from "../CommandsModal";
import { Command } from "../../../../../types/command";

const Commands = ({
  settings,
  onChange
}: {
  settings: Settings;
  onChange: (settings) => void;
}): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);

  const handleOpen = (command: Command | null) => {
    setSelected(command);
    onOpen();
  };

  const handleToggle = (
    command: Command,
    index: number,
    isChecked: boolean
  ) => {
    handleSave({ ...command, enabled: isChecked }, index);
  };

  const commands = settings.bot_commands.map((command, index) => (
    <PanelRow>
      <HStack
        spacing={1}
        py={5}
        px={4}
        role="group"
        _hover={{ cursor: "pointer", bg: "ui.dark3" }}
        borderRadius="md"
      >
        <Box
          color="text.200"
          flex="1"
          fontWeight={600}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {settings.bot_prefix}
          {command.trigger}
        </Box>
        <Box
          color="text.200"
          flex="2"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {command.message}
        </Box>
        <Flex
          flex="1"
          justifyContent="flex-end"
          alignItems="center"
          color="text.200"
        >
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={command.enabled}
            onChange={(e) => handleToggle(command, index, e.target.checked)}
            mr={2}
          />

          <IconButton
            aria-label="Edit timed message"
            variant="ghost"
            colorScheme="buttonGhost"
            icon={<PencilIcon />}
            size="lg"
            onClick={() => handleOpen(command)}
            opacity={0}
            _groupHover={{
              opacity: 1
            }}
          />
        </Flex>
      </HStack>
    </PanelRow>
  ));

  const handleSave = (command: Command, index?: number) => {
    const s = { ...settings };

    if (selected) {
      const curIndex = s.bot_commands.findIndex(
        (c) => c.trigger === selected.trigger
      );

      s.bot_commands[curIndex] = command;
    } else if (index !== undefined) {
      s.bot_commands[index] = command;
    } else {
      s.bot_commands = [...s.bot_commands, command];
    }

    onChange(s);
    onClose();
    setSelected(null);
  };

  const handleRemove = () => {
    const s = { ...settings };
    const c = [...s.bot_commands];
    const index = c.findIndex((c) => c.trigger === selected.trigger);

    c.splice(index, 1);
    s.bot_commands = [...c];

    onChange(s);
    onClose();
    setSelected(null);
  };

  return (
    <Panel
      heading="Commands"
      action={
        <IconButton
          aria-label="Create command"
          color="text.100"
          icon={<PlusIcon />}
          colorScheme="buttonBlue"
          onClick={() => handleOpen(null)}
        />
      }
      maxH="460px"
    >
      <CommandsModal
        command={selected}
        onSave={handleSave}
        isOpen={isOpen}
        onClose={onClose}
        onRemove={handleRemove}
      />
      {commands}
    </Panel>
  );
};

export default Commands;
