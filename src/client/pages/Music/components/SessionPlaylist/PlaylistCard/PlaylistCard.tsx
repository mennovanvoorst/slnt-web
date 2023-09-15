import React, { ReactElement } from "react";
import { Flex, Text, Image, Box, IconButton } from "@chakra-ui/react";

const PlaylistCard = ({
  title,
  position,
  thumbnail,
  hidden,
  children
}: {
  position: number;
  title: string;
  thumbnail: string;
  hidden: boolean;
  children?: ReactElement | ReactElement[];
}): JSX.Element => (
  <Flex
    alignItems="center"
    p={2}
    role="group"
    d={hidden ? "none" : "flex"}
    _hover={{ cursor: "grab", background: "#2E2F34" }}
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
    <Text color="text.200" ml={4} flex="1">
      {title}
    </Text>
    {children && (
      <Box
        d="none"
        _groupHover={{
          display: "inline-block"
        }}
      >
        {children}
      </Box>
    )}
  </Flex>
);

export default PlaylistCard;
