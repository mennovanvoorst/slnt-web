import React, { ReactElement } from "react";
import { Panel, PanelRow } from "@components/Panel";
import { Button, useDisclosure } from "@chakra-ui/react";
import { CleanIcon } from "@assets/icons";
import { PanelSetting } from "@components/Panel/Panel";
import DeleteModal from "@pages/Account/components/DeleteModal";
import { deleteUser } from "@client/api/user";
import { logout } from "@client/api/auth";
import action from "@store/store-actions";
import { useStore } from "@store/store";

const DeleteAccount = (): ReactElement => {
  const { dispatch } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    const res = await deleteUser();

    if (res.success) {
      await logout();

      dispatch({ type: action.AUTHENTICATE, payload: false });
      dispatch({
        type: action.USER_AUTHENTICATED,
        payload: null
      });
    }
  };

  return (
    <Panel>
      <PanelRow>
        <PanelSetting heading="Delete SLNT account" icon={<CleanIcon />}>
          <Button
            colorScheme={"buttonBlue"}
            onClick={onOpen}
            size="lg"
            _hover={{
              bg: "ui.red"
            }}
          >
            Delete
          </Button>
        </PanelSetting>
      </PanelRow>

      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={handleDelete} />
    </Panel>
  );
};

export default DeleteAccount;
