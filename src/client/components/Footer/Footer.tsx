import React from "react";
import { Box, Container, Stack, Image, Grid } from "@chakra-ui/react";
import FooterList from "@components/Footer/FooterList";

const menus = [
  {
    title: "Explore",
    items: [
      {
        label: "Home",
        destination: "/",
        isExternal: false
      },
      {
        label: "Why SLNT?",
        destination: "/why",
        isExternal: false
      },
      {
        label: ".api",
        destination: "/api",
        isExternal: false
      },
      {
        label: ".cloud overlays",
        destination: "/cloud",
        isExternal: false
      },
      {
        label: ".music",
        destination: "/music",
        isExternal: false
      },
      {
        label: "Support",
        destination: "/support",
        isExternal: false
      }
    ]
  },
  {
    title: "Contact",
    items: [
      {
        label: "Discord",
        destination: "https://discord.gg/Z2PP5rqKVu",
        isExternal: true
      },
      {
        label: "support@slnt.stream",
        destination: "mailto:support@slnt.stream",
        isExternal: true
      },
      {
        label: "CoC (81899203)",
        destination:
          "https://www.kvk.nl/orderstraat/product-kiezen/?kvknummer=818992030000",
        isExternal: true
      }
    ]
  },
  {
    title: "Follow us",
    items: [
      {
        label: "Twitter",
        destination: "https://twitter.com/slntstream",
        isExternal: true
      },
      {
        label: "Instagram",
        destination: "https://www.instagram.com/slnt.stream/",
        isExternal: true
      }
    ]
  },
  {
    title: "Legal",
    items: [
      {
        label: "Terms",
        destination: "/legal/terms",
        isExternal: false
      },
      {
        label: "Privacy",
        destination: "/legal/privacy",
        isExternal: false
      }
    ]
  }
];

const Footer = (): JSX.Element => {
  const renderMenus = (): JSX.Element[] =>
    menus.map((menu) => <FooterList title={menu.title} items={menu.items} />);

  return (
    <Box as="footer" bg="gray.800" mt={20} color="white">
      <Container py={12} maxW="container.xl">
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: 0, lg: 60 }}
          align="flex-start"
        >
          <Box boxSize="48px" display={{ base: "none", lg: "block" }}>
            <Image src="/hub/assets/img/logo/logo.svg" alt="slnt.stream" />
          </Box>

          <Grid
            w="full"
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={12}
          >
            {renderMenus()}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
