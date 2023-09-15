import { ChangeEvent, KeyboardEvent, ReactElement, useState } from "react";
import { HStack, Input, Button, Text, Box } from "@chakra-ui/react";
import { fetchPlaylist, fetchVideo, searchVideo } from "@client/api/video";
import { Video } from "@interfaces/video";
import { isPlaylist, isVideo } from "@utils/youtube";

const VideoSearch = ({
  onResult,
  onReset
}: {
  onResult: (videos: Video[], type: string) => void;
  onReset: () => void;
}): ReactElement => {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    try {
      setHasError(false);

      if (search.length === 0) return;

      setIsLoading(true);
      const playlist = isPlaylist(search);
      const video = isVideo(search);

      let res;
      let payload;
      let type = "";

      if (playlist) {
        res = await fetchPlaylist(playlist);
        payload = res.payload;
        type = "playlist";
      } else if (video) {
        res = await fetchVideo(video);
        payload = [res.payload];
        type = "video";
      } else {
        res = await searchVideo({ search });
        payload = res.payload;
        type = "video";
      }

      console.log(res);
      if (!res.success) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      onResult(payload, type);

      setIsLoading(false);
    } catch (e) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setSearch("");
      onReset();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);

    if (hasError) setHasError(false);
  };

  return (
    <Box>
      <HStack spacing={2}>
        <Input
          variant="filled"
          size="lg"
          bg="white"
          placeholder="Search YouTube"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          isDisabled={isLoading}
          isInvalid={hasError}
          _active={{
            bg: "gray.200"
          }}
          _focus={{
            bg: "gray.200"
          }}
        />
        <Button
          size="lg"
          colorScheme="buttonOrange"
          onClick={handleSearch}
          isLoading={isLoading}
        >
          Search
        </Button>
      </HStack>

      {hasError && (
        <Text color="red.500" mt={2}>
          Something went wrong. Please try again.
        </Text>
      )}
    </Box>
  );
};

export default VideoSearch;
