import { ReactElement, useEffect, useState } from "react";
import { Box, Grid, Spinner } from "@chakra-ui/react";
import { useStore } from "@store/store";
import { useFetchUserSettings } from "../../hooks/useUserSettings";
import BotSettings from "@pages/Bot/components/BotSettings";
import TimedMessages from "@pages/Bot/components/TimedMessages";
import Commands from "@pages/Bot/components/Commands";
import { updateUserSettings } from "@client/api/user";
import { Settings } from "@interfaces/settings";

const Bot = (): ReactElement => {
  const [userSettings, isFetching, success] = useFetchUserSettings();
  const [settings, setSettings] = useState(null);
  const [settingsInitialized, setSettingsInitialized] = useState(null);
  const { state, dispatch } = useStore();

  useEffect(() => {
    setSettings(userSettings);
  }, [userSettings]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (settings && settingsInitialized) {
        handleUpdate(settings);
      } else if (settings && !settingsInitialized) {
        setSettingsInitialized(true);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [settings]);

  const handleChangeSettings = (newSettings: any) => {
    const s = { ...settings, ...newSettings };
    setSettings(s);
  };

  const handleUpdate = async (s: Settings) => {
    await updateUserSettings(s);
  };

  if (isFetching || !userSettings)
    return <Spinner size="lg" color="text.100" />;

  return (
    <Grid
      w="full"
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={6}
    >
      <Box minW={0}>
        <BotSettings settings={settings} onChange={handleChangeSettings} />
      </Box>

      <Box minW={0}>
        <TimedMessages settings={settings} onChange={handleChangeSettings} />

        <Commands settings={settings} onChange={handleChangeSettings} />
      </Box>
    </Grid>
  );
};

export default Bot;
