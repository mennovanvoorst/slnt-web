import React, { useEffect, useState } from "react";
import YoutubePlayer from "@components/YoutubePlayer";
import { Box, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { useStore } from "@store/store";
import { useSocket } from "@client/sockets/sockets";
import actions from "@store/store-actions";
import VideoSlider from "@components/VideoSlider";
import VolumeSlider from "@components/VolumeSlider";
import TimeFormat from "hh-mm-ss";
import { NextIcon, PauseIcon, PlayIcon, RepeatIcon } from "@assets/icons";
import LiveIndicator from "@pages/Session/components/LiveIndicator";
import { logSlider } from "@utils/player";
import { Video } from "@interfaces/video";

const SessionPlayer = (): JSX.Element => {
  const { state, dispatch } = useStore();
  const socket = useSocket();
  const [player, setPlayer] = useState<any | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [videoInitialized, setVideoInitialized] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [userPaused, setUserPaused] = useState<boolean>(false);
  const [userSearched, setUserSearched] = useState<boolean>(false);
  const [playerProgress, setPlayerProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);

  useEffect(() => {
    if (!player) return;

    if (!hasStarted) {
      handleStateChange(state.session.isPlaying);
      handleProgress(state.session.timestamp - state.session.delay);
      handleVideo(state.session.playlist[0] || null);

      setHasStarted(true);
    }

    setTimeout(() => {
      const progress = player.getCurrentTime();

      handleStateChange(state.session.isPlaying);
      handleVideo(state.session.playlist[0] || null);

      if (!userPaused && !userSearched) {
        setPlayerProgress(progress);
      }

      if (
        state.session.timestamp > Math.ceil(progress + 1) ||
        state.session.timestamp < Math.floor(progress - 1)
      ) {
        handleProgress(state.session.timestamp);
      }
    }, state.session.delay * 1000);
  }, [state.session, videoInitialized]);

  useEffect(() => {
    if (!player) return;
    if (currentVideo && currentVideo.id) return;

    player.pauseVideo();
  }, [currentVideo]);

  const handlePlayerReady = (player: any): void => {
    setPlayer(player);
    const playerVolume = parseInt(window.localStorage.getItem("volume"));

    setVolume(playerVolume || 100);
    player.setVolume(logSlider(playerVolume) || 100);
    player.unMute();

    player.unMute();
    player.playVideo();
    setVideoInitialized(true);
  };

  const handleVideo = (video: Video | null): void => {
    if (userPaused || userSearched) return;

    setCurrentVideo(video);
  };

  const handleProgress = (timestamp: number): void => {
    if (userPaused || userSearched) return;

    player.seekTo(timestamp);
  };

  const handleStateChange = (isPlaying: boolean): void => {
    if (userPaused || userSearched) return;

    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  };

  const togglePlayerState = () => {
    if (userPaused) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }

    setUserPaused(!userPaused);
    setUserSearched(!userSearched);
  };

  const handleProgressChange = (timestamp: number): void => {
    if (!player) return;

    player.seekTo(timestamp);
    setUserSearched(true);
    setPlayerProgress(timestamp);
  };

  const handleSync = (): void => {
    setUserPaused(false);
    setUserSearched(false);

    handleStateChange(state.session.isPlaying);
    handleProgress(state.session.timestamp + state.session.delay);
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

  return (
    <Box overflow="hidden" borderRadius="2xl" mb={4}>
      {!currentVideo && (
        <Heading color="text.100" size="lg" mb={6}>
          Nothing is playing right now.
        </Heading>
      )}

      <Box display={currentVideo ? "block" : "none"}>
        <YoutubePlayer
          videoId={currentVideo ? currentVideo.id : "hA58tU9FQgI"}
          onPlayerReady={handlePlayerReady}
          isActive={state.session.isActive}
        />

        {currentVideo && (
          <VideoSlider
            currentTime={playerProgress}
            max={currentVideo.duration}
            onChange={handleProgressChange}
          />
        )}

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
            {currentVideo && (
              <Box color="white">
                {TimeFormat.fromS(
                  player && player.getCurrentTime()
                    ? Math.floor(player.getCurrentTime())
                    : 0
                )}{" "}
                / {TimeFormat.fromS(currentVideo.duration || 0)}
              </Box>
            )}
          </HStack>

          <HStack justifyContent="center" spacing={6} flex="1">
            <IconButton
              aria-label="Pause video"
              variant="solid"
              colorScheme="buttonBlue"
              color="text.100"
              size="lg"
              onClick={togglePlayerState}
              icon={
                !state.session.isPlaying || userPaused ? (
                  <PlayIcon />
                ) : (
                  <PauseIcon />
                )
              }
            />
          </HStack>

          <LiveIndicator
            synced={!userPaused && !userSearched}
            onSync={handleSync}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default SessionPlayer;
