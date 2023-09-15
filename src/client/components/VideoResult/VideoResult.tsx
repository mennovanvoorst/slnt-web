import React, { ReactElement, ReactNode } from "react";
import {
  HStack,
  Image,
  Box,
  Heading,
  Text,
  IconButton,
  Flex
} from "@chakra-ui/react";

const VideoResult = ({
  title,
  thumbnail,
  channel,
  children
}: {
  title: string;
  thumbnail: string;
  channel: string;
  children: ReactNode;
}): ReactElement => {
  return (
    <HStack
      spacing={2}
      w="full"
      py={4}
      px={4}
      role="group"
      _hover={{ background: "#2E2F34" }}
    >
      <Image src={thumbnail} h="116px" borderRadius="lg" />

      <Box flex="2" pl={4} pr={10}>
        <Heading as="h5" size="sm" color="text.200">
          {title}
        </Heading>
        <Text color="text.400">{channel}</Text>
      </Box>

      <HStack
        flex="1"
        spacing={2}
        justify="flex-end"
        align="flex-end"
        opacity={0}
        _groupHover={{
          opacity: 1
        }}
      >
        {children}
      </HStack>
    </HStack>
  );
};

export default VideoResult;
