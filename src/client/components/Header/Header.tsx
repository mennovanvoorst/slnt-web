import { ReactElement } from "react";
import { HStack, Container, Box } from "@chakra-ui/react";
import Menu from "@components/Header/Menu";
import Logo from "@components/Header/Logo";
import { CloudIcon, HeadphonesIcon, MenuIcon, PlugIcon } from "@assets/icons";
import { useStore } from "@store/store";

const menuItems = [
  {
    label: "Services",
    destination: "/why",
    dropdown: true,
    items: [
      {
        label: ".api",
        icon: <PlugIcon />,
        destination: "/api"
      },
      {
        label: ".cloud",
        icon: <CloudIcon />,
        destination: "/cloud"
      },
      {
        label: ".music",
        icon: <HeadphonesIcon />,
        destination: "/music"
      }
    ]
  },
  {
    label: "Why SLNT?",
    destination: "/why",
    dropdown: false
  },
  {
    label: "Support",
    destination: "/support",
    dropdown: false
  }
];

const Header = ({ dark }: { dark: boolean }): ReactElement => {
  const { state, dispatch } = useStore();

  return (
    <Box as="header" bg={dark ? "gray.800" : "white"} h="90px">
      <Container h="100%" py={5} maxW="container.2xl">
        <HStack
          justify={{ base: "space-between", lg: "flex-start" }}
          align="center"
          h="100%"
          spacing={12}
        >
          <Logo dark={dark} />
          <Menu
            items={menuItems}
            dark={dark}
            authenticated={state.authenticated}
          />
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
