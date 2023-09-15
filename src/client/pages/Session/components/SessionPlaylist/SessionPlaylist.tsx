import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { Panel, PanelRow } from "@components/Panel";
import { useStore } from "@store/store";
import PlaylistCard from "@pages/Music/components/SessionPlaylist/PlaylistCard";

const SessionPlaylist = (): ReactElement => {
  const { state, dispatch } = useStore();

  return (
    <Box>
      <Panel heading="Queue">
        <PanelRow>
          <Box maxH="500px" overflowY="scroll">
            {state.session.playlist.map((video, index) => (
              <PlaylistCard
                key={`pc${index}`}
                position={index}
                title={video.title}
                thumbnail={video.thumbnails.medium}
                hidden={index === 0}
              />
            ))}
          </Box>
        </PanelRow>
      </Panel>
    </Box>
  );
};

export default SessionPlaylist;
