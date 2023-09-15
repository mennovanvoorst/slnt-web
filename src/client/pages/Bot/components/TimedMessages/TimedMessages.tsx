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
  useDisclosure
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
import { PanelSetting } from "@components/Panel/Panel";
import TimedMessageModal from "@pages/Bot/components/TimedMessageModal";
import { TimedMessage } from "@interfaces/timedMessage";
import { updateUserSettings } from "@client/api/user";
import CommandsModal from "@pages/Bot/components/CommandsModal";

const TimedMessages = ({
  settings,
  onChange
}: {
  settings: Settings;
  onChange: (settings) => void;
}): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);

  const handleOpen = (message: TimedMessage | null) => {
    setSelected(message);
    onOpen();
  };

  const timedMessages = settings.bot_timedmessages.map((message) => (
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
          {message.name}
        </Box>
        <Box
          color="text.200"
          flex="2"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {message.message}
        </Box>
        <Flex color="text.400" flex="1" alignItems="center">
          <StopwatchIcon mr={2} /> {message.interval} min
        </Flex>
        <Flex flex="1" justifyContent="flex-end" color="text.200">
          <IconButton
            aria-label="Edit timed message"
            variant="ghost"
            colorScheme="buttonGhost"
            icon={<PencilIcon />}
            size="lg"
            onClick={() => handleOpen(message)}
            opacity={0}
            _groupHover={{
              opacity: 1
            }}
          />
        </Flex>
      </HStack>
    </PanelRow>
  ));

  const handleSave = (message: TimedMessage) => {
    const s = { ...settings };

    if (selected) {
      const curIndex = s.bot_timedmessages.findIndex(
        (m) => m.name === selected.name
      );

      s.bot_timedmessages[curIndex] = message;
    } else {
      s.bot_timedmessages = [...s.bot_timedmessages, message];
    }

    onChange(s);
    onClose();
    setSelected(null);
  };

  const handleRemove = () => {
    const s = { ...settings };
    const c = [...s.bot_timedmessages];
    const index = c.findIndex((c) => c.name === selected.name);

    c.splice(index, 1);
    s.bot_timedmessages = [...c];

    onChange(s);
    onClose();
    setSelected(null);
  };

  return (
    <Panel
      heading="Timed messages"
      action={
        <IconButton
          aria-label="Create timed message"
          color="text.100"
          icon={<PlusIcon />}
          colorScheme="buttonBlue"
          onClick={() => handleOpen(null)}
        />
      }
      maxH="460px"
    >
      <TimedMessageModal
        message={selected}
        onSave={handleSave}
        isOpen={isOpen}
        onClose={onClose}
        onRemove={handleRemove}
      />
      {timedMessages}
    </Panel>
  );
};

export default TimedMessages;
