import React, { ReactElement } from "react";
import { Flex } from "@chakra-ui/react";
import SessionPlayer from "@pages/Music/components/SessionPlayer";
import { useLocation } from "react-router-dom";
import { useStore } from "@store/store";

const PastaPlayer = (): ReactElement => {
  const { state } = useStore();
  const location = useLocation();

  if (location.pathname === "/music" || location.pathname.includes("session"))
    return <></>;

  if (state.session.playlist.length === 0 || state.session.isActive === false)
    return <></>;

  return (
    <Flex
      w="100vw"
      h={128}
      bg="ui.dark2"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={9999}
    >
      <SessionPlayer isPasta={true} />
    </Flex>
  );
};

export default PastaPlayer;
