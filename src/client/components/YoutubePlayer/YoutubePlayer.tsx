import { ReactElement, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import YouTube from "react-youtube";
import useInterval from "react-useinterval";
import { PlayerProps } from "@interfaces/youtube";

const config = {
  playerVars: {
    controls: 0 as const,
    mute: 1 as const,
    autoplay: 1 as const
  }
};

const YoutubePlayer = ({
  videoId,
  onStateChange,
  onPlayerReady,
  onProgress,
  isActive,
  fullHeight
}: PlayerProps): ReactElement => {
  const [player, setPlayer] = useState<any>(null);

  useInterval(() => {
    if (!player || !onProgress) return;

    onProgress(player.getCurrentTime());
  }, 1000);

  const onReady = (event: { target: any }): void => {
    if (!event.target) return;

    setPlayer(event.target);
    onPlayerReady(event.target);
  };

  const handleStateChange = (event: { target: any; data: number }): void => {
    if (!onStateChange) return;

    console.log(event.data);
    onStateChange(event.data);
  };

  return (
    <YouTube
      onReady={onReady}
      onStateChange={handleStateChange}
      containerClassName="session__video"
      videoId={videoId}
      opts={config}
    />
  );
};

export default YoutubePlayer;
