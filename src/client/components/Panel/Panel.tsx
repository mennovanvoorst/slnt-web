import { Box, Heading, VStack, Flex, Text } from "@chakra-ui/react";
import {
  Panel as PanelInterface,
  PanelSetting as PanelSettingInterface
} from "@interfaces/panel";
import { ReactNode } from "react";

export const Panel = ({
  heading,
  headingAction,
  action,
  maxH,
  children
}: PanelInterface) => (
  <Box bg="ui.dark2" borderRadius="lg" mb={4} maxH={maxH}>
    {heading && (
      <Flex justifyContent="space-between" alignItems="center" py={4} px={6}>
        <Heading as="h2" size="md" color="text.100">
          <Flex alignItems="center">
            {heading}

            {headingAction && headingAction}
          </Flex>
        </Heading>

        {action && action}
      </Flex>
    )}

    <VStack borderTopColor="ui.dark4" borderTopWidth={heading && "1px"} px={6}>
      {children}
    </VStack>
  </Box>
);

export const PanelRow = ({ children }: { children: ReactNode }) => (
  <Box
    borderTopColor="ui.dark4"
    borderTopWidth="1px"
    _first={{ borderTopWidth: 0 }}
    pt={2}
    pb={4}
    w="full"
  >
    {children}
  </Box>
);

export const PanelSetting = ({
  heading,
  description,
  icon,
  indented,
  children
}: PanelSettingInterface) => (
  <Flex
    justify="space-between"
    align="center"
    py={6}
    ml={indented ? 8 : 0}
    borderTopColor="ui.dark4"
    borderTopWidth="1px"
    _first={{ borderTopWidth: 0 }}
  >
    <Box color="text.100" fontSize="24px" mr={4}>
      {icon}
    </Box>

    <Flex direction="column" flex="1">
      <Heading as="h6" size="sm" color="text.100">
        {heading}
      </Heading>
      {description && <Text color="text.100">{description}</Text>}
    </Flex>

    <Box>{children}</Box>
  </Flex>
);
