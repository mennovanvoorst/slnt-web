import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const PlaylistCard = ({
  title,
  position,
  thumbnail
}: {
  position: number;
  title: string;
  thumbnail: string;
}): JSX.Element => (
  <Flex
    alignItems="center"
    my={2}
    id="playlist"
    _hover={{ cursor: "grab" }}
    _active={{ cursor: "grabbing" }}
  >
    <Text color="text.300" fontWeight="bold" mr={3} w={4}>
      {position}.
    </Text>
    <Image
      alt="Thumbnail"
      src={thumbnail}
      boxSize="46px"
      objectFit="cover"
      borderRadius="sm"
    />
    <Text color="text.200" ml={4}>
      {title}
    </Text>
  </Flex>
);

export default PlaylistCard;
