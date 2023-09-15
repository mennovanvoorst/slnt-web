import { ReactElement, useEffect, useRef, useState } from "react";
import { Box, Image, AspectRatio, Heading, Text, Flex } from "@chakra-ui/react";
import useInterval from "react-useinterval";
import { useStore } from "@store/store";
import actions from "@store/store-actions";
import axios from "axios";
import config from "@config";
import { fetchToken } from "@client/api/auth";
import {
  pauseSong,
  playSong,
  transferDevice
} from "@client/sockets/services/spotify";
import { useSocket } from "@client/sockets/sockets";
import { logSlider } from "@utils/player";
import { Video } from "@interfaces/video";
import { SpotifyIcon } from "@assets/icons";

const SpotifyPlayer = ({
  onPlayerReady
}: {
  onPlayerReady: () => void;
}): ReactElement => {
  const { state, dispatch } = useStore();
  const socket = useSocket();

  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [playerState, setPlayerState] = useState(null);

  useEffect(() => {
    const initializePlayer = () => {
      const playerVolume =
        parseInt(window.localStorage.getItem("volume")) || 100;

      const player = new window.Spotify.Player({
        name: "SLNT.stream",
        getOAuthToken: async (cb) => {
          const res = await fetchToken("spotify");
          cb(res.payload.token);
        },
        volume: Math.round(logSlider(playerVolume)) / 100
      });

      setPlayer(player);

      player.addListener("ready", (data) => handlePlayerReady(data.device_id));
      player.addListener("player_state_changed", handlePlayerStateChange);

      player.addListener("initialization_error", (e) => console.log(e));
      player.addListener("authentication_error", (e) => console.log(e));
      player.addListener("account_error", (e) => console.log(e));
      player.addListener("playback_error", (e) => console.log(e));
      player.addListener("not_ready", (e) => console.log(e));

      player.connect();
    };

    (window as any).onSpotifyWebPlaybackSDKReady = initializePlayer;

    if (!window.Spotify) {
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
      scriptTag.async = true;

      document.body.appendChild(scriptTag);
      return;
    } else {
      initializePlayer();
    }

    return () => {
      player.removeListener("ready", handlePlayerReady);
      player.removeListener("player_state_changed", handlePlayerStateChange);
    };
  }, []);

  /*useInterval(() => {
    if (!player) return;
    player.getCurrentState().then((curState) => {
      if (!curState) return;

      dispatch({
        type: actions.PLAYER_PROGRESS_CHANGE,
        payload: {
          ...state.session,
          timestamp: Math.round(curState.position / 1000)
        }
      });
    });
  }, 1000);*/

  useEffect(() => {
    if (!player || !isReady) return;
    const { isPlaying, timestamp, playlist } = state.session;
    const curTrack = playlist.length > 0 ? playlist[0] : null;

    /*handleStateChange(curTrack ? isPlaying : false);

    if (curTrack) {
      handleTrackChange(curTrack);
      handleProgressChange(timestamp);
    }*/
  }, [state.session, isReady]);

  const handlePlayerReady = (deviceId: string) => {
    setDeviceId(deviceId);
    transferDevice(socket, { deviceId, play: state.session.isPlaying });

    onPlayerReady();
  };

  const handlePlayerStateChange = (state) => {
    if (!isReady) setIsReady(true);
    setPlayerState(state);
  };

  const handleStateChange = (isPlaying: boolean) => {
    if (isPlaying) {
      player.resume();
    } else {
      player.pause();
    }
  };

  const handleProgressChange = (progress: number) => {
    player.seek(progress * 1000);
  };

  const handleTrackChange = (video: Video | null) => {
    console.log(video);
    if (!video) return;

    playSong(socket, { deviceId, track: video.id });
  };

  /*const handleTrackChange = (state) => {
    const curTrack = state.track_window.current_track;
    const video = {
      id: curTrack.uri,
      title: curTrack.name,
      duration: Math.round(curTrack.duration_ms / 1000),
      channel: curTrack.artists.map((artist) => artist.name).join(", "),
      thumbnails: {
        default: curTrack.album.images.find((image) => image.size === "SMALL")
          .url,
        medium: curTrack.album.images.find((image) => image.size === "UNKNOWN")
          .url,
        high: curTrack.album.images.find((image) => image.size === "LARGE").url
      }
    };

    setTrack(video);
  };*/

  return (
    <AspectRatio ratio={16 / 9}>
      <Box role="group">
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="full"
          color="white"
          p={4}
          bgGradient="linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0))"
          alignContent="center"
          opacity={0}
          transition="opacity 0.2s"
          _groupHover={{
            opacity: 1
          }}
        >
          <SpotifyIcon boxSize="40px" color="white" />

          <Text
            fontSize="18px"
            fontWeight={400}
            textShadow="0 0 2px rgb(0 0 0 / 50%)"
            ml={4}
            alignSelf="center"
          >
            {state.session.playlist.length > 0 &&
              `${state.session.playlist[0].channel} - ${state.session.playlist[0].title}`}
          </Text>
        </Flex>

        <Image
          boxSize="100%"
          objectFit="cover"
          src={
            state.session.playlist.length > 0 &&
            state.session.playlist[0].thumbnails.high
          }
          alt={
            state.session.playlist.length > 0 && state.session.playlist[0].title
          }
        />
      </Box>
    </AspectRatio>
  );
};

export default SpotifyPlayer;
