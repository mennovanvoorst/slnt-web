import React, { ReactElement } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar";

const HubLayout = (): ReactElement => (
  <HStack
    align="flex-start"
    spacing={6}
    bg="ui.dark3"
    minH="100vh"
    py={8}
    px={6}
  >
    <Sidebar />

    <Box w="full">
      <Outlet />
    </Box>
  </HStack>
);

export default HubLayout;
