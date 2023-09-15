import React, { ReactElement, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useStore } from "@store/store";
import { Panel, PanelRow } from "@components/Panel";
import VideoSearch from "@components/VideoSearch";
import { Video } from "@interfaces/video";
import SearchResults from "../SearchResults";
import actions from "@store/store-actions";

const SearchBar = ({
  show,
  onAdd
}: {
  show: boolean;
  onAdd: (video: Video, type: string) => void;
}): ReactElement => {
  const { state, dispatch } = useStore();
  const [results, setResults] = useState<Video[]>([]);
  const [resultType, setResultType] = useState<string | null>(null);

  const handleResult = (videos: Video[], type: string): void => {
    setResults(videos);
    setResultType(type);
  };

  const handleReset = (): void => setResults([]);

  const handleAdd = (video: Video): void => {
    handleReset();
    onAdd(video, resultType);
  };

  if (!show) return <></>;

  return (
    <Box>
      <Panel heading="Add songs">
        <PanelRow>
          <VideoSearch onResult={handleResult} onReset={handleReset} />

          {results.length > 0 && (
            <SearchResults videos={results} onAdd={handleAdd} />
          )}
        </PanelRow>
      </Panel>
    </Box>
  );
};

export default SearchBar;
