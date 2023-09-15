import { ReactElement } from "react";
import { Badge, Flex, Heading } from "@chakra-ui/react";
import ConnectButton from "../ConnectButton";
import { authenticate, unlink } from "@client/api/auth";
import { Panel, PanelRow } from "@components/Panel";
import { TwitchIcon, YoutubeIcon, SpotifyIcon } from "@assets/icons";
import { useStore } from "@store/store";
import action from "@store/store-actions";

const providers = [
  {
    name: "twitch",
    label: "Twitch",
    icon: <TwitchIcon boxSize="16px" color="text.100" />
  },
  {
    name: "youtube",
    label: "Youtube",
    icon: <YoutubeIcon boxSize="16px" color="text.100" />
  },
  {
    name: "spotify",
    label: "Spotify",
    icon: <SpotifyIcon boxSize="16px" color="text.100" />
  }
];

const ProviderList = (): ReactElement => {
  const { dispatch, state } = useStore();

  const handleUnlink = async (strategy: string): Promise<void> => {
    const res = await unlink(strategy);

    if (res.success) {
      dispatch({
        type: action.USER_AUTHENTICATED,
        payload: {
          ...state.user,
          providers: {
            ...state.user.providers,
            [strategy]: {
              ...state.user.providers[strategy],
              token: undefined
            }
          }
        }
      });
    }
  };

  const providersList = providers.map((provider) => {
    const userProvider = state.user.providers[provider.name];

    const isPrimary = state.user.provider === provider.name;
    const isConnected =
      Object.keys(state.user.providers).includes(provider.name) &&
      userProvider.token !== undefined;

    return (
      <PanelRow>
        <Flex w="full" align="center" direction={{ base: "column", lg: "row" }}>
          {provider.icon}
          <Heading as="h5" size="sm" ml={4} flex="1" color="text.100">
            {provider.label}
            {isConnected && <Badge ml={4}>{userProvider.displayName}</Badge>}
            {isPrimary && (
              <Badge colorScheme="green" ml={4}>
                Primary
              </Badge>
            )}
          </Heading>

          <ConnectButton
            isConnected={isConnected}
            isPrimary={isPrimary}
            onUnlink={() => handleUnlink(provider.name)}
            onAuthenticate={() => authenticate(provider.name)}
          />
        </Flex>
      </PanelRow>
    );
  });

  return <Panel heading="Connected accounts">{providersList}</Panel>;
};

export default ProviderList;
