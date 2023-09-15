import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { useStore } from "@store/store";
import actions from "@store/store-actions";
import { updateSession } from "@client/sockets/services/session";
import { useSocket } from "@client/sockets/sockets";
import VideoSlider from "@components/VideoSlider";
import {
  MaximizeIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon
} from "@assets/icons";
import VolumeSlider from "@components/VolumeSlider";
import { logSlider } from "@utils/player";
import TimeFormat from "hh-mm-ss";
import { useNavigate, useLocation } from "react-router-dom";
import SpotifyPlayer from "@components/SpotifyPlayer/SpotifyPlayer";
import { PlayerProps } from "@interfaces/youtube";
import {
  changeVolume,
  pauseSong,
  playSong,
  seekPosition,
  transferDevice
} from "@client/sockets/services/spotify";
import { Video } from "@interfaces/video";

const SpotifyTest = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useStore();
  const socket = useSocket();

  const [isReady, setIsReady] = useState<boolean>(false);

  const handlePlayerReady = (): void => {
    setIsReady(true);
  };

  const handleProgressChange = (timestamp: number): void =>
    dispatch({
      type: actions.PLAYER_PROGRESS_CHANGE,
      payload: { ...state.session, timestamp }
    });

  if (state.session.playlist.length === 0)
    return <Box>Nothing is playing right now.</Box>;

  return (
    <Flex direction="column" justifyContent="space-between" w="full" mb={4}>
      <Box
        w="full"
        p={0}
        position="relative"
        bottom={0}
        bg="ui.dark2"
        borderRadius="xl"
      >
        <SpotifyPlayer onPlayerReady={handlePlayerReady} />
      </Box>

      <Flex flex="1" mx={0} flexDirection="column" justifyContent="center">
        <VideoSlider
          currentTime={state.session.timestamp}
          max={state.session.playlist[0].duration}
          onChange={handleProgressChange}
        />

        {/*<Flex justifyContent="space-between" mt={3}>
          <HStack justifyContent="flex-start" flex="1">
            <VolumeSlider
              volume={volume}
              muted={isMuted}
              onChange={handleVolumeChange}
              onMute={handleVolumeMute}
            />
            <Box color="white">
              {typeof state.session.timestamp === "number"
                ? TimeFormat.fromS(Math.floor(state.session.timestamp))
                : "00:00"}{" "}
              /{" "}
              {typeof state.session.timestamp === "number"
                ? TimeFormat.fromS(currentTrack ? currentTrack.duration : 0)
                : "00:00"}
            </Box>
          </HStack>

          <HStack justifyContent="center" spacing={6} flex="1">
            <IconButton
              aria-label="Pause video"
              variant="solid"
              colorScheme="buttonBlue"
              color="text.100"
              size="lg"
              onClick={togglePlayerState}
              icon={state.session.isPlaying ? <PauseIcon /> : <PlayIcon />}
            />
          </HStack>

          <Box flex="1" />
  </Flex>*/}
      </Flex>
    </Flex>
  );
};

export default SpotifyTest;
