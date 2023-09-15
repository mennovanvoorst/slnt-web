import { ReactElement, useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import SessionPlayer from "@pages/Music/components/SessionPlayer";
import SessionSettings from "@pages/Music/components/SessionSettings";
import SearchBar from "./components/SearchBar";
import SessionPlaylist from "@pages/Music/components/SessionPlaylist";
import { fetchSession, joinSession } from "@client/sockets/services/session";
import { useStore } from "@store/store";
import { useSocket } from "@client/sockets/sockets";

const Music = (): ReactElement => {
  const { state, dispatch } = useStore();
  const socket = useSocket();

  useEffect(() => {
    fetchSession(socket, null);
    joinSession(socket, state.user.id.toString());
  }, []);

  return (
    <Grid
      w="full"
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={6}
    >
      <Box>
        <SessionPlayer isPasta={false} />

        <SessionSettings />
      </Box>

      <Box>
        <SearchBar />

        <SessionPlaylist />
      </Box>
    </Grid>
  );
};

export default Music;
