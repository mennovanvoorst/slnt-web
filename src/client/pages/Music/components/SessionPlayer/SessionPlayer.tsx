import React, { useEffect, useState } from "react";
import YoutubePlayer from "@components/YoutubePlayer";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  AspectRatio
} from "@chakra-ui/react";
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

const SessionPlayer = ({ isPasta }: { isPasta: boolean }): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useStore();
  const socket = useSocket();
  const [player, setPlayer] = useState<any | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [playerProgress, setPlayerProgress] = useState<number>(0);

  useEffect(() => {
    if (!player) return;

    updateSession(socket, state.session.hosts[0], {
      ...state.session,
      timestamp: player.getCurrentTime()
    });
  }, [state.session]);

  const handlePlayerReady = (player: any): void => {
    setPlayer(player);
    player.seekTo(state.session.timestamp);
    const playerVolume = parseInt(window.localStorage.getItem("volume"));

    setVolume(playerVolume || 100);
    player.setVolume(logSlider(playerVolume) || 100);
    player.unMute();

    if (state.session.isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  };

  const gotoNextSong = async (): Promise<void> => {
    const { playlist } = state.session;
    playlist.shift();
    handleProgress(0);

    dispatch({
      type: actions.PLAYLIST_UPDATED,
      payload: { ...state.session, playlist }
    });
  };

  const handleProgress = (timestamp: number): void => {
    setPlayerProgress(timestamp);

    if (!state.session.isActive) return;

    dispatch({
      type: actions.PLAYER_PROGRESS_CHANGE,
      payload: { ...state.session, timestamp }
    });
  };

  const handleProgressChange = (timestamp: number): void => {
    if (!player) return;

    player.seekTo(timestamp);

    dispatch({
      type: actions.PLAYER_PROGRESS_CHANGE,
      payload: { ...state.session, timestamp }
    });
  };

  const togglePlayerState = () => {
    const isPlaying = !state.session.isPlaying;

    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }

    dispatch({
      type: actions.PLAYER_STATE_CHANGE,
      payload: {
        isPlaying,
        timestamp: player.getCurrentTime()
      }
    });
  };

  const handleRepeat = (): void => {
    player.seekTo(0);
    player.playVideo();

    dispatch({
      type: actions.PLAYER_STATE_CHANGE,
      payload: {
        isPlaying: true,
        timestamp: 0
      }
    });
  };

  const handleStateChange = async (newState: number): Promise<void> => {
    const newPlayerState = {
      isPlaying: state.session.isPlaying,
      timestamp: player.getCurrentTime()
    };

    switch (newState) {
      case -1:
        if (state.session.isPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
        break;
      case 0:
        await gotoNextSong();
        newPlayerState.timestamp = 0;
        newPlayerState.isPlaying = true;
        break;
      case 1:
        newPlayerState.isPlaying = true;
        break;
      case 2:
        newPlayerState.isPlaying = false;
        break;
      case 3:
        newPlayerState.isPlaying = false;
        break;
      case 5:
        if (state.session.isPlaying) {
          newPlayerState.isPlaying = true;
        } else {
          newPlayerState.isPlaying = false;
        }
        break;
      default:
        break;
    }

    dispatch({
      type: actions.PLAYER_STATE_CHANGE,
      payload: newPlayerState
    });
  };

  const handleVolumeChange = (value: number, logValue: number): void => {
    if (!player) return;

    if (isMuted) {
      setIsMuted(false);
      player.unMute();
    }

    player.setVolume(logValue);
    setVolume(value);
    window.localStorage.setItem("volume", value.toString());
  };

  const handleVolumeMute = (): void => {
    if (!player) return;

    setIsMuted(!isMuted);

    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
  };

  if (state.session.playlist.length === 0 && location.pathname === "/music") {
    return (
      <Heading color="text.100" size="lg" mb={6}>
        Nothing is playing right now.
      </Heading>
    );
  } else if (
    state.session.playlist.length === 0 &&
    location.pathname !== "/music"
  ) {
    return <></>;
  }

  return (
    <Flex
      direction={isPasta ? "row" : "column"}
      justifyContent="space-between"
      w="full"
      mb={isPasta ? 0 : 4}
    >
      <Box
        w={isPasta ? 380 : "full"}
        p={isPasta ? 4 : 0}
        position="relative"
        bottom={isPasta ? "75%" : 0}
        bg="ui.dark2"
        borderRadius="xl"
      >
        <YoutubePlayer
          videoId={state.session.playlist[0].id}
          onStateChange={handleStateChange}
          onPlayerReady={handlePlayerReady}
          onProgress={handleProgress}
          isActive={state.session.isActive}
          fullHeight={isPasta}
        />
      </Box>

      <Flex
        flex="1"
        mx={isPasta ? 12 : 0}
        flexDirection="column"
        justifyContent="center"
      >
        <VideoSlider
          currentTime={state.session.timestamp}
          max={state.session.playlist[0].duration}
          onChange={handleProgressChange}
        />

        <Flex justifyContent="space-between" mt={3}>
          <HStack justifyContent="flex-start" flex="1">
            <VolumeSlider
              volume={volume}
              muted={isMuted}
              onChange={(value, logValue) =>
                handleVolumeChange(value, logValue)
              }
              onMute={handleVolumeMute}
            />
            <Box color="white">
              {typeof state.session.timestamp === "number"
                ? TimeFormat.fromS(Math.floor(state.session.timestamp))
                : "00:00"}{" "}
              /{" "}
              {typeof state.session.timestamp === "number"
                ? TimeFormat.fromS(state.session.playlist[0].duration)
                : "00:00"}
            </Box>
          </HStack>

          <HStack justifyContent="center" spacing={6} flex="1">
            <IconButton
              aria-label="Shuffle playlist"
              variant="ghost"
              colorScheme="buttonGhost"
              color="text.100"
              size="lg"
              onClick={handleRepeat}
              icon={<RepeatIcon />}
            />

            <IconButton
              aria-label="Pause video"
              variant="solid"
              colorScheme="buttonBlue"
              color="text.100"
              size="lg"
              onClick={togglePlayerState}
              icon={state.session.isPlaying ? <PauseIcon /> : <PlayIcon />}
            />

            <IconButton
              aria-label="Pause video"
              variant="ghost"
              colorScheme="buttonGhost"
              color="text.100"
              size="lg"
              onClick={gotoNextSong}
              icon={<NextIcon />}
            />
          </HStack>

          <Box flex="1" />
        </Flex>
      </Flex>

      {isPasta && (
        <Flex w={380} mr={12} justifyContent="flex-end" alignItems="center">
          <IconButton
            aria-label="Expand player"
            variant="solid"
            colorScheme="buttonBlue"
            color="text.100"
            size="lg"
            onClick={() => navigate("/music")}
            icon={<MaximizeIcon />}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default SessionPlayer;
