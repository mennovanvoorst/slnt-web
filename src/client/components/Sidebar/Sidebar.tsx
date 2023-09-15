import { ReactElement } from "react";
import { VStack, Container, Box } from "@chakra-ui/react";
import Logo from "@components/Header/Logo";
import { useStore } from "@store/store";
import Menu from "./Menu";
import {
  PlayCircleIcon,
  PlaylistIcon,
  RobotIcon,
  UserIcon
} from "@assets/icons";

const menuItems = [
  {
    label: ".music",
    destination: "/music",
    icon: <PlayCircleIcon />
  },
  {
    label: "Playlists",
    destination: "/playlists",
    icon: <PlaylistIcon />
  },
  {
    label: "Bot",
    destination: "/bot",
    icon: <RobotIcon />
  },
  {
    label: "Account",
    destination: "/account",
    icon: <UserIcon />
  }
];

const Sidebar = (): ReactElement => {
  const { state, dispatch } = useStore();

  return (
    <Box as="nav">
      <Container h="100%" maxW="container.2xl">
        <Menu items={menuItems} authenticated={state.authenticated} />
      </Container>
    </Box>
  );
};

export default Sidebar;
