import { ReactElement, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  useDisclosure,
  Flex,
  Stack,
  VStack,
  Button,
  Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronIcon, CloseIcon, MenuIcon } from "@assets/icons";
import { DropdownItem, MenuItem } from "@interfaces/header";
import Logo from "../Logo";
import AuthButton from "@components/Header/AuthButton";

const Menu = ({
  items,
  dark,
  authenticated
}: {
  items: MenuItem[];
  dark: boolean;
  authenticated: boolean;
}): ReactElement => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDropdown, setShowDropdown] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleNavigation = (destination: string | undefined): void => {
    if (!destination) return;

    onClose();
    navigate(destination);
    setShowDropdown(false);
  };

  const handleToggleDropdown = (): void => {
    setShowDropdown(!showDropdown);
  };

  const getRotation = (): string =>
    showDropdown ? "rotate(180deg)" : "rotate(0deg)";

  const renderDropdownItems = (childItems: DropdownItem[]): JSX.Element => {
    const buttons = childItems.map((item) => (
      <Button
        colorScheme="gray"
        color={
          dark
            ? { base: "gray.800", lg: "gray.800" }
            : { base: "gray.800", lg: "white" }
        }
        variant="ghost"
        fontWeight="600"
        justifyContent="flex-start"
        w="100%"
        leftIcon={item.icon}
        onClick={(): void => handleNavigation(item.destination)}
        _hover={dark ? { lg: { bg: "gray.200" } } : { lg: { bg: "gray.700" } }}
      >
        {item.label}
      </Button>
    ));

    return (
      <VStack
        w={{ base: "100%", lg: "auto" }}
        pl={{ base: 6, lg: 0 }}
        px={{ base: 0, lg: 6 }}
        py={{ base: 0, lg: 4 }}
        mt={4}
        spacing={4}
        bg={
          dark
            ? { base: "transparent", lg: "white" }
            : { base: "transparent", lg: "gray.800" }
        }
        position={{ base: "relative", lg: "absolute" }}
        boxShadow={dark ? "none" : { lg: "0px 1px 14px rgba(0, 0, 0, 0.15)" }}
        borderRadius="xl"
        transform="translateX(-50%)"
        left="50%"
        onMouseLeave={(): void => setShowDropdown(false)}
        zIndex="99"
      >
        {buttons}
      </VStack>
    );
  };

  const renderItems = (): JSX.Element => {
    const buttons = items.map((item) => {
      if (item.dropdown && item.items)
        return (
          <Box w={{ base: "100%", lg: "auto" }} position="relative">
            <Button
              colorScheme="gray"
              color={dark ? { base: "gray.800", lg: "white" } : "gray.800"}
              _hover={
                dark ? { lg: { bg: "gray.700" } } : { base: { bg: "gray.200" } }
              }
              variant="ghost"
              fontWeight="600"
              justifyContent="flex-start"
              w={{ base: "100%", lg: "auto" }}
              onClick={handleToggleDropdown}
              onMouseEnter={(): void => setShowDropdown(true)}
            >
              {item.label}
              <ChevronIcon ml={2} transform={getRotation()} />
            </Button>
            {showDropdown && renderDropdownItems(item.items)}
          </Box>
        );

      return (
        <Button
          colorScheme="gray"
          color={dark ? { base: "gray.800", lg: "white" } : "gray.800"}
          _hover={
            dark ? { lg: { bg: "gray.700" } } : { base: { bg: "gray.200" } }
          }
          variant="ghost"
          fontWeight="600"
          justifyContent="flex-start"
          w={{ base: "100%", lg: "auto" }}
          onClick={(): void => handleNavigation(item.destination)}
          onMouseEnter={(): void => setShowDropdown(false)}
        >
          {item.label}
        </Button>
      );
    });

    return (
      <Stack
        direction={{ base: "column", lg: "row" }}
        align="flex-start"
        spacing={6}
      >
        {buttons}
      </Stack>
    );
  };

  return (
    <>
      <Flex
        w="full"
        display={{ base: "none", lg: "flex" }}
        justify="space-between"
        align="center"
      >
        {renderItems()}
        <AuthButton dark={dark} authenticated={authenticated} />
      </Flex>

      <Box display={{ base: "block", lg: "none" }}>
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          colorScheme="gray"
          color={dark ? { base: "white", lg: "gray.800" } : "gray.800"}
          variant="ghost"
          aria-label="menu"
          icon={<MenuIcon boxSize={6} />}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              mx={8}
              px={0}
              py={6}
              borderBottom="1px"
              borderColor="gray.50"
            >
              <Flex h="32px" justify="space-between" align="center">
                <Logo dark={false} />

                <IconButton
                  ref={btnRef}
                  onClick={onClose}
                  colorScheme="gray"
                  variant="ghost"
                  aria-label="menu"
                  icon={<CloseIcon boxSize={4} />}
                />
              </Flex>
            </DrawerHeader>

            <DrawerBody px={8} py={6}>
              {renderItems()}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Menu;
