import { ReactElement } from "react";
import { Flex, Heading, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Logo = ({ dark }: { dark: boolean }): ReactElement => (
  <Link as={RouterLink} to="/" h="100%" style={{ textDecoration: "none" }}>
    <Flex h="100%" align="center">
      <Image
        h="100%"
        objectFit="cover"
        src="/hub/assets/img/logo/logo.svg"
        alt="SLNT.stream"
      />

      <Heading
        as="h1"
        size="lg"
        fontWeight="800"
        ml={3}
        mb={0}
        letterSpacing={1}
        color={dark ? "white" : "gray.800"}
      >
        SLNT
      </Heading>
    </Flex>
  </Link>
);

export default Logo;
