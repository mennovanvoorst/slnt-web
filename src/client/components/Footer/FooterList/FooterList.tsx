import { Box, List, ListItem, Text, Link } from "@chakra-ui/react";
import { Link as NavLink } from "react-router-dom";
import { FooterMenu, FooterMenuItem } from "@interfaces/footer";

const FooterList = ({ title, items }: FooterMenu): JSX.Element => {
  const linkProps = (item: FooterMenuItem): any => {
    if (item.isExternal) {
      return { href: item.destination, isExternal: true };
    }

    return { as: NavLink, to: item.destination };
  };

  const renderItems = (): JSX.Element[] =>
    items.map((item) => (
      <ListItem color="gray.600">
        <Link _hover={{ textDecoration: "none" }} {...linkProps(item)}>
          {item.label}
        </Link>
      </ListItem>
    ));

  return (
    <Box>
      <Text fontWeight={600} mb={1}>
        {title}
      </Text>
      <List spacing={1}>{renderItems()}</List>
    </Box>
  );
};

export default FooterList;
