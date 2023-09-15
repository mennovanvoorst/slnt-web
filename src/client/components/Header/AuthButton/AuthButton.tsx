import { ReactElement } from "react";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { logout } from "@client/api/auth";
import action from "@store/store-actions";
import { useStore } from "@store/store";

const AuthButton = ({
  authenticated,
  dark
}: {
  authenticated: boolean;
  dark: boolean;
}): ReactElement => {
  const { state, dispatch } = useStore();

  const handleLogout = async () => {
    await logout();

    dispatch({ type: action.AUTHENTICATE, payload: false });
    dispatch({
      type: action.USER_AUTHENTICATED,
      payload: null
    });
  };

  if (!authenticated || !state.user) {
    return (
      <Button
        as={Link}
        to="/login"
        colorScheme={dark ? "gray" : "orange"}
        size="md"
      >
        Login
      </Button>
    );
  }

  return (
    <HStack spacing={4}>
      <Button
        as={Link}
        to="/hub"
        colorScheme={dark ? "gray" : "orange"}
        size="md"
      >
        Creator Hub
      </Button>

      <Menu>
        <MenuButton
          aria-label="Profile"
          variant="link"
          colorScheme={dark ? "gray" : "orange"}
        >
          <Avatar src={state.user.avatar} />
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} to="/account">
            Account settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default AuthButton;
