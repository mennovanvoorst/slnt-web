import { ReactElement, useEffect, useState, useRef, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { Progress, Time } from "@interfaces/youtube";

const VideoSlider = ({
  currentTime,
  onChange,
  max
}: Progress): ReactElement => {
  const [seekHoverPosition, setSeekHoverPosition] = useState(0);
  const [currentSeekTime, setCurrentSeekTime] = useState(currentTime);

  const seeking = useRef(false);
  const trackWidth = useRef(0);
  const mobileSeeking = useRef(false);
  const track = useRef<HTMLDivElement>(null);
  const hoverTime = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTrackWidthState();

    window.addEventListener("resize", setTrackWidthState);
    window.addEventListener("mousemove", handleSeeking);
    window.addEventListener("mouseup", mouseSeekingHandler);
    window.addEventListener("touchmove", handleTouchSeeking);
    window.addEventListener("touchend", mobileTouchSeekingHandler);

    return () => {
      window.removeEventListener("resize", setTrackWidthState);
      window.removeEventListener("mousemove", handleSeeking);
      window.removeEventListener("mouseup", mouseSeekingHandler);
      window.removeEventListener("touchmove", handleTouchSeeking);
      window.removeEventListener("touchend", mobileTouchSeekingHandler);
    };
  }, []);

  function secondsToTime(seconds: number): Time {
    seconds = Math.round(seconds);

    const hours: number = Math.floor(seconds / 3600);
    const divirsForMinutes: number = seconds % 3600;
    const minutes: number = Math.floor(divirsForMinutes / 60);
    const sec: number = Math.ceil(divirsForMinutes % 60);

    return {
      hh: hours.toString(),
      mm: minutes < 10 ? "0" + minutes : minutes.toString(),
      ss: sec < 10 ? "0" + sec : sec.toString()
    };
  }

  const hoverTimeValue = useMemo(() => {
    const percent: number = (seekHoverPosition * 100) / trackWidth.current;
    const time: number = Math.floor(+(percent * (max / 100)));
    const times: Time = secondsToTime(time);

    if (max < 60) {
      return "00:00:" + times.ss;
    } else if (max < 3600) {
      return "00:" + times.mm + ":" + times.ss;
    } else {
      return times.hh + ":" + times.mm + ":" + times.ss;
    }
  }, [seekHoverPosition, trackWidth]);

  function changeCurrentTimePosition(pageX: number): void {
    let position = pageX - track.current?.getBoundingClientRect().left;

    position = position < 0 ? 0 : position;
    position = position > trackWidth.current ? trackWidth.current : position;

    setSeekHoverPosition(position);

    const percent = (position * 100) / trackWidth.current;
    const time = +(percent * (max / 100)).toFixed(0);

    setCurrentSeekTime(time);
  }

  function setTrackWidthState(): void {
    if (track.current) {
      trackWidth.current = track.current.offsetWidth;
    }
  }

  function handleTouchSeeking(event: TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();

    let pageX = 0;

    for (let i = 0; i < event.changedTouches.length; i++) {
      pageX = event.changedTouches?.[i].pageX;
    }

    pageX = pageX < 0 ? 0 : pageX;

    if (mobileSeeking.current) {
      changeCurrentTimePosition(pageX);
    }
  }

  function handleSeeking(event: MouseEvent): void {
    if (seeking.current) {
      changeCurrentTimePosition(event.pageX);
    }
  }

  function handleTrackHover(
    clear: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    let position = event.pageX - track.current?.getBoundingClientRect().left;

    if (clear) {
      position = 0;
    }

    setSeekHoverPosition(position);
  }

  function getPositionStyle(time: number): string {
    const position = (time * 100) / max;

    return `scaleX(${position / 100})`;
  }

  function getThumbHandlerPosition(): string {
    const curTime = seeking.current ? currentSeekTime : currentTime;
    const position = trackWidth.current / (max / curTime);

    return `translateX(${position}px)`;
  }

  function getSeekHoverPosition(): string {
    const position: number = (seekHoverPosition * 100) / trackWidth.current;

    return `scaleX(${position / 100})`;
  }

  function getHoverTimePosition(): string {
    let position = 0;

    if (hoverTime.current) {
      position = seekHoverPosition - hoverTime.current.offsetWidth / 2;
    }

    return `translateX(${position}px)`;
  }

  function mouseSeekingHandler(event: MouseEvent): void {
    setSeeking(false, event);
  }

  function setSeeking(state: boolean, event: MouseEvent): void {
    event.preventDefault();

    seeking.current = state;
    handleSeeking(event);

    setSeekHoverPosition(state ? seekHoverPosition : 0);
  }

  function stopSeekingHandler(): void {
    onChange(currentSeekTime);
  }

  function mobileTouchSeekingHandler(): void {
    setMobileSeeking(false);
  }

  function setMobileSeeking(state = true): void {
    mobileSeeking.current = state;
    setSeekHoverPosition(state ? seekHoverPosition : 0);
  }

  function isThumbActive(): boolean {
    return seekHoverPosition > 0 || seeking.current;
  }

  if (!max) return <></>;

  return (
    <Box position="relative" role="group" w="full">
      <Box
        py={3}
        cursor="pointer"
        ref={track}
        onMouseMove={(event) => handleTrackHover(false, event)}
        onMouseLeave={(event) => handleTrackHover(true, event)}
        onMouseDown={(event) => setSeeking(true, event as any)}
        onMouseUp={() => stopSeekingHandler()}
        onTouchStart={() => setMobileSeeking(true)}
      >
        <Box
          position="absolute"
          w="full"
          h="4px"
          bg="ui.darkBlue"
          borderRadius="lg"
          overflow="hidden"
          transition="transform .4s"
          transform={isThumbActive() && "scaleY(1.5)"}
        >
          <Box
            position="absolute"
            bg="ui.blue"
            w="full"
            h="full"
            zIndex="1"
            transform={getSeekHoverPosition()}
            transformOrigin="0 0"
            opacity="0"
            transition="opacity .4s"
            _groupHover={{ opacity: "1" }}
          ></Box>

          <Box
            position="absolute"
            bg="ui.orange"
            w="full"
            h="full"
            zIndex="3"
            left="0"
            transform={getPositionStyle(
              seeking.current ? currentSeekTime : currentTime
            )}
            transformOrigin="0 0"
          ></Box>
        </Box>
      </Box>

      <Box
        ref={hoverTime}
        position="absolute"
        bg="ui.blue"
        color="text.100"
        top="-32px"
        px={4}
        py={2}
        borderRadius="lg"
        pointerEvents="none"
        transform={getHoverTimePosition()}
        opacity={isThumbActive() ? "1" : "0"}
      >
        {hoverTimeValue}
      </Box>

      <Box
        pointerEvents="none"
        position="absolute"
        w="12px"
        h="12px"
        left="-6px"
        top="8px"
        zIndex="4"
        transform={getThumbHandlerPosition()}
      >
        <Box
          transition="transform .2s"
          borderRadius="full"
          w="full"
          h="full"
          bg="ui.orange"
          opacity={isThumbActive() ? "1" : "0"}
          transform={isThumbActive() ? "scale(1)" : "scale(0.4)"}
        ></Box>
      </Box>
    </Box>
  );
};

export default VideoSlider;
