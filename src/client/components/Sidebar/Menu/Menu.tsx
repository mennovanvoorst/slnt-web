import { ReactElement, createElement } from "react";
import { VStack, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SidebarItem } from "@interfaces/sidebar";
import MenuButton from "./MenuButton";

const Menu = ({
  items,
  authenticated
}: {
  items: SidebarItem[];
  authenticated: boolean;
}): ReactElement => {
  const navigate = useNavigate();

  const handleNavigation = (destination: string | undefined): void => {
    if (!destination) return;
    navigate(destination);
  };

  const renderItems = items.map((item) => <MenuButton item={item} />);

  return (
    <Flex direction="column">
      <MenuButton
        item={{
          label: "Home",
          destination: "/",
          icon: <Image src="/hub/assets/img/logo/logo.svg" />
        }}
      />

      {authenticated && (
        <VStack h="100%" spacing={2} mt={8}>
          {renderItems}
        </VStack>
      )}
    </Flex>
  );
};

export default Menu;
