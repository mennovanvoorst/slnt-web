import { ReactElement } from "react";
import {
  Box,
  IconButton,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/react";
import { MuteIcon, VolumeIcon } from "@assets/icons";
import { logSlider } from "@utils/player";

const VolumeSlider = ({
  volume,
  muted,
  onChange,
  onMute
}: {
  volume: number;
  muted: boolean;
  onChange: (value: number, logValue: number) => void;
  onMute: () => void;
}): ReactElement => {
  const handleChange = (value: number): void => {
    onChange(value, logSlider(value));
  };

  return (
    <Flex
      role="group"
      position="relative"
      alignItems="center"
      justifyContent="center"
      h="48px"
    >
      <IconButton
        icon={volume === 0 || muted ? <MuteIcon /> : <VolumeIcon />}
        aria-label="Toggle video playback state"
        variant="ghost"
        color="white"
        size="lg"
        onClick={onMute}
        _hover={{
          bg: "#383E4E"
        }}
        _active={{
          bg: "#2B2F3B"
        }}
      />

      <Flex
        d="flex"
        w="0"
        h="full"
        alignItems="center"
        justifyContent="center"
        transition="all 0.3s"
        opacity="0"
        _groupHover={{
          opacity: "1",
          width: "80px",
          marginRight: 2,
          marginLeft: 2
        }}
      >
        <Slider
          aria-label="Volume slider"
          value={muted ? 0 : volume}
          h="80px"
          min={0}
          max={100}
          step={1}
          onChange={handleChange}
        >
          <SliderTrack bg="#2B2F3B">
            <SliderFilledTrack bg="#E7EAEF" />
          </SliderTrack>
          <SliderThumb bg="#E7EAEF" />
        </Slider>
      </Flex>
    </Flex>
  );
};

export default VolumeSlider;
