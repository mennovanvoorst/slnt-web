import {
  Grid,
  Box,
  Heading,
  Flex,
  Button,
  Badge,
  Tooltip
} from "@chakra-ui/react";
import { Panel, PanelRow } from "@components/Panel";
import { TwitchIcon, YoutubeIcon } from "@assets/icons";
import { useStore } from "@store/store";
import { ReactElement } from "react";
import action from "@store/store-actions";
import ProviderList from "@pages/Account/components/ProviderList";
import DeleteAccount from "@pages/Account/components/DeleteAccount";

const Account = (): ReactElement => (
  <Grid
    w="full"
    templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
    gap={6}
  >
    <Box>
      <ProviderList />
      <DeleteAccount />
    </Box>

    <Box></Box>
  </Grid>
);

export default Account;
