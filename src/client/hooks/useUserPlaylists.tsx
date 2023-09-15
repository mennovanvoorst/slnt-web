import { useStore } from "@store/store";
import { useEffect, useState } from "react";
import { fetchUserPlaylists } from "@client/api/playlist";

export const useFetchUserPlaylists = () => {
  const { state } = useStore();
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(null);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    if (state.userPlaylists !== null) {
      setResponse(state.userPlaylists);
      setIsFetching(false);
      return;
    }

    const fetch = async (): Promise<void> => {
      setIsFetching(true);
      const { success, payload } = await fetchUserPlaylists();

      if (success) {
        setResponse(payload);
        setSuccess(true);
      } else {
        setResponse([]);
        setSuccess(false);
      }

      setIsFetching(false);
    };

    fetch();
  }, []);

  return [response, isFetching, success];
};
