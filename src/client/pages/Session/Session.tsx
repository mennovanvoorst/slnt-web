import React, { ReactElement, useEffect, useState } from "react";
import { Box, Grid, Heading, useDisclosure } from "@chakra-ui/react";
import SessionPlayer from "./components/SessionPlayer";
import { useParams } from "react-router-dom";
import { joinSession } from "@client/sockets/services/session";
import { useSocket } from "@client/sockets/sockets";
import SessionPlaylist from "./components/SessionPlaylist";
import { useStore } from "@store/store";
import SessionModal from "./components/SessionModal";

const Session = (): ReactElement => {
  const { state, dispatch } = useStore();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const socket = useSocket();
  const { sessionId } = useParams();

  useEffect((): void => {
    joinSession(socket, sessionId);
  }, [sessionId]);

  const handleJoin = (): void => {
    setHasJoined(true);
    onClose();
  };

  if (!state.session.isActive)
    return (
      <Heading color="text.100" size="lg" mb={6}>
        This session is not active
      </Heading>
    );

  if (!hasJoined) return <SessionModal isOpen={isOpen} onClose={handleJoin} />;

  return (
    <Grid
      w="full"
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={6}
    >
      <Box>
        <SessionPlayer />
      </Box>

      <Box>
        <SessionPlaylist />
      </Box>
    </Grid>
  );
};

export default Session;
