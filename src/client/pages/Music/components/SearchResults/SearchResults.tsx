import React, { ReactElement } from "react";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { Video } from "@interfaces/video";
import VideoResult from "@components/VideoResult";
import { AddToListIcon, TopOfListIcon } from "@assets/icons";

const SearchResults = ({
  videos,
  onAddToList,
  onAddToTop
}: {
  videos: Video[];
  onAddToList: (video: Video) => void;
  onAddToTop: (video: Video) => void;
}): ReactElement => {
  const renderResults = videos.map((video) => (
    <VideoResult
      key={video.id}
      title={video.title}
      thumbnail={video.thumbnails.medium}
      channel={video.channel}
    >
      <Tooltip label="Add to top" hasArrow>
        <IconButton
          colorScheme="gray"
          variant="ghost"
          size="lg"
          aria-label="Add to top of playlist"
          color="text.200"
          _hover={{
            color: "text.100",
            bg: "ui.blue"
          }}
          _focus={{
            color: "text.100",
            bg: "ui.darkBlue"
          }}
          _active={{
            color: "text.100",
            bg: "ui.darkBlue"
          }}
          icon={<TopOfListIcon />}
          onClick={() => onAddToTop(video)}
        />
      </Tooltip>

      <Tooltip label="Add to queue" hasArrow>
        <IconButton
          colorScheme="gray"
          variant="ghost"
          size="lg"
          aria-label="Add to playlist"
          color="text.200"
          _hover={{
            color: "text.100",
            bg: "ui.blue"
          }}
          _focus={{
            color: "text.100",
            bg: "ui.darkBlue"
          }}
          _active={{
            color: "text.100",
            bg: "ui.darkBlue"
          }}
          icon={<AddToListIcon />}
          onClick={() => onAddToList(video)}
        />
      </Tooltip>
    </VideoResult>
  ));

  return (
    <Box
      w="full"
      maxH={{ base: "520px", lg: "640px" }}
      overflowY="scroll"
      mt={6}
    >
      {renderResults}
    </Box>
  );
};

export default SearchResults;
