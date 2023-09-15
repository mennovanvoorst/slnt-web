import React, { ReactElement } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Button,
  HStack,
  Switch,
  Input
} from "@chakra-ui/react";
import { Panel, PanelRow } from "@components/Panel";
import { Playlist } from "@interfaces/playlist";
import { intervalToDuration } from "date-fns";
import {
  AudioMixerIcon,
  ClockIcon,
  PlusIcon,
  PrefixIcon,
  RobotIcon,
  ServerIcon,
  SessionIcon,
  TrashIcon
} from "@assets/icons";
import { Settings } from "@interfaces/settings";
import { PanelSetting } from "@components/Panel/Panel";

const BotSettings = ({
  settings,
  onChange
}: {
  settings: Settings;
  onChange: (settings) => void;
}): ReactElement => {
  const handleChangePrefix = (prefix: string) => {
    onChange({ bot_prefix: prefix.charAt(prefix.length - 1) });
  };

  const handleToggleDJ = (isChecked: boolean) => {
    onChange({ bot_enabled: isChecked });
  };

  const handleToggleRequests = (isChecked: boolean) => {
    onChange({
      song_requests: { ...settings.song_requests, chat_enabled: isChecked }
    });
  };

  return (
    <Panel heading="Settings">
      <PanelRow>
        <PanelSetting
          heading="Prefix selection"
          description="Default '!'"
          icon={<PrefixIcon />}
        >
          <Input
            variant="filled"
            size="lg"
            w="64px"
            bg="ui.blue"
            color="white"
            textAlign="center"
            placeholder="!"
            value={settings.bot_prefix || "!"}
            onChange={(e) => handleChangePrefix(e.target.value)}
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
        </PanelSetting>

        <PanelSetting
          heading="SLNT DJ"
          description="Enable or disable SLNT DJ"
          icon={<RobotIcon />}
        >
          <HStack spacing={4}>
            <Switch
              colorScheme="green"
              size="lg"
              isChecked={settings.bot_enabled || false}
              onChange={(e) => handleToggleDJ(e.target.checked)}
            />
          </HStack>
        </PanelSetting>

        <PanelSetting
          heading="Song request"
          description="Allow viewers to request songs"
          icon={<AudioMixerIcon />}
          indented={true}
        >
          <HStack spacing={4}>
            <Switch
              colorScheme="green"
              size="lg"
              isChecked={settings.song_requests.chat_enabled || false}
              onChange={(e) => handleToggleRequests(e.target.checked)}
              isDisabled={!settings.bot_enabled}
            />
          </HStack>
        </PanelSetting>
      </PanelRow>
    </Panel>
  );
};

export default BotSettings;
