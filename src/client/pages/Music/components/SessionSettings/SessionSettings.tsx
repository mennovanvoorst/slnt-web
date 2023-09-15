import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import {
  Box,
  Button,
  Switch,
  HStack,
  Tooltip,
  IconButton
} from "@chakra-ui/react";
import { useStore } from "@store/store";
import { Panel, PanelRow } from "@components/Panel";
import { PanelSetting } from "@components/Panel/Panel";
import {
  BadgeIcon,
  ClockIcon,
  FolderIcon,
  ServerIcon,
  SessionIcon,
  CheckIcon,
  PlaylistIcon
} from "@assets/icons";
import { createSession, stopSession } from "@client/sockets/services/session";
import { useSocket } from "@client/sockets/sockets";
import actions from "@store/store-actions";
import NumberInput from "@components/NumberInput";
import config from "@config";
import copy from "copy-to-clipboard";

const SessionButton = ({ active }: { active: boolean }): ReactElement => {
  const { state, dispatch } = useStore();
  const socket = useSocket();

  const handleCreate = (): void => {
    createSession(socket, state.session);
  };

  const handleStop = (): void => {
    stopSession(socket, state.session.hosts[0]);
  };

  if (!active)
    return (
      <Button colorScheme="green" size="lg" onClick={handleCreate}>
        Start session
      </Button>
    );

  return (
    <Button colorScheme="red" size="lg" onClick={handleStop}>
      Stop session
    </Button>
  );
};

const SessionSettings = (): ReactElement => {
  const { state, dispatch } = useStore();
  const [oldValue, setOldValue] = useState<number>(state.session.delay);
  const [delayDisabled, setDelayDisabled] = useState<boolean>(false);
  const [delayChecked, setDelayChecked] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    setDelayChecked(state.session.delay > 0);
    setDelayDisabled(state.session.delay === 0);
  }, [state.session.delay]);

  const handleStreamDelay = (value: number): void => {
    dispatch({
      type: actions.SET_DELAY,
      payload: value
    });
  };

  const handleStreamDelaySwitch = (e: ChangeEvent<HTMLInputElement>): void => {
    let value;

    if (e.target.checked) {
      value = state.session.delay === 0 ? oldValue : state.session.delay;
      setOldValue(value);
    } else {
      value = 0;
      setOldValue(state.session.delay);
    }

    setDelayChecked(e.target.checked);
    setDelayDisabled(!e.target.checked);
    dispatch({
      type: actions.SET_DELAY,
      payload: value
    });
  };

  const handleCopy = (): void => {
    copy(`${config.app_url}/hub/session/${state.session.hosts[0]}`);
    setIsCopied(true);
  };

  const handleQueueClear = (): void => {
    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: { ...state.session, playlist: [state.session.playlist[0]] }
    });
  };

  return (
    <Box>
      <Panel
        heading="Actions"
        action={
          <Box>
            <Tooltip
              label={isCopied ? "Copied!" : "Copy session URL"}
              onClose={() => setIsCopied(false)}
              closeOnClick={false}
              hasArrow
            >
              <Button
                colorScheme="buttonGhost"
                variant="ghost"
                color="text.100"
                leftIcon={<BadgeIcon />}
                onClick={handleCopy}
              >
                Session ID
              </Button>
            </Tooltip>
          </Box>
        }
      >
        <PanelRow>
          <PanelSetting
            heading="Stream"
            description="Turn your session on/off"
            icon={<SessionIcon />}
          >
            <SessionButton active={state.session.isActive} />
          </PanelSetting>

          <PanelSetting
            heading="Resync your session"
            description="Get all your listeners on the same page"
            icon={<ServerIcon />}
          >
            <Button colorScheme="buttonBlue" size="lg">
              Resync
            </Button>
          </PanelSetting>

          <PanelSetting
            heading="Streamer delay"
            description="Add a delay so you don’t get sniped"
            icon={<ClockIcon />}
          >
            <HStack spacing={4}>
              <NumberInput
                value={state.session.delay.toString()}
                onChange={handleStreamDelay}
                isDisabled={delayDisabled}
              />

              <Switch
                colorScheme="green"
                size="lg"
                onChange={handleStreamDelaySwitch}
                isChecked={delayChecked}
              />
            </HStack>
          </PanelSetting>

          <PanelSetting
            heading="Clear queue"
            description="Clear all songs in your queue except for currently playing"
            icon={<PlaylistIcon />}
          >
            <Button
              colorScheme="buttonBlue"
              size="lg"
              onClick={handleQueueClear}
              isDisabled={state.session.playlist.length < 2}
            >
              Clear queue
            </Button>
          </PanelSetting>
        </PanelRow>
      </Panel>
    </Box>
  );
};

export default SessionSettings;
