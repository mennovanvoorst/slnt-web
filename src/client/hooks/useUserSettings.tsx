import { useStore } from "@store/store";
import { useEffect, useState } from "react";
import { fetchUserSettings } from "@client/api/user";
import { defaultBotSettings } from "@constants";

export const useFetchUserSettings = () => {
  const { state } = useStore();
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (state.userSettings !== null) {
      setResponse(state.userSettings);
      setIsFetching(false);
      return;
    }

    const fetch = async (): Promise<void> => {
      setIsFetching(true);
      const { success, payload } = await fetchUserSettings();
      const settings = { ...defaultBotSettings };

      if (success) {
        Object.keys(payload.settings).forEach((setting) => {
          settings[setting] = payload.settings[setting];
        });

        setResponse(settings);
        setSuccess(true);
      } else {
        setResponse({});
        setSuccess(false);
      }

      setIsFetching(false);
    };

    fetch();
  }, []);

  return [response, isFetching, success];
};
