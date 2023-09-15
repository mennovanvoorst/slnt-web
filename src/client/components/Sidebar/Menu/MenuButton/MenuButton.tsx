import { ReactElement } from "react";
import { Flex } from "@chakra-ui/react";
import { SidebarItem } from "@interfaces/sidebar";
import { Link } from "react-router-dom";

const MenuButton = ({ item }: { item: SidebarItem }): ReactElement => (
  <Flex
    as={Link}
    w="56px"
    h="56px"
    to={item.destination}
    key={item.label}
    aria-label={item.label}
    color="white"
    p={4}
    fontSize="24px"
    align="center"
    justifyContent="center"
    borderWidth="2px"
    borderColor="ui.blue"
    borderRadius="full"
    cursor="pointer"
    _hover={{ borderColor: "text.100" }}
    _active={{ borderColor: "text.200" }}
  >
    {item.icon}
  </Flex>
);

export default MenuButton;
