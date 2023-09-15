import { ReactElement } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const LiveIndicator = ({
  synced,
  onSync
}: {
  synced: boolean;
  onSync: () => void;
}): ReactElement => (
  <Flex
    justifyContent="flex-end"
    alignItems="center"
    flex="1"
    cursor="pointer"
    onClick={onSync}
  >
    <Box
      w="6px"
      h="6px"
      bg={synced ? "red" : "ui.darkBlue"}
      borderRadius="full"
    ></Box>
    <Text textTransform="uppercase" color="white" fontWeight={600} ml={2}>
      LIVE
    </Text>
  </Flex>
);

export default LiveIndicator;
