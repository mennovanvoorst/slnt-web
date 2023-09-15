import { ReactElement } from "react";
import { Button } from "@chakra-ui/react";

const ConnectButton = ({
  isConnected,
  isPrimary,
  onUnlink,
  onAuthenticate
}: {
  isConnected: boolean;
  isPrimary: boolean;
  onUnlink: () => void;
  onAuthenticate: () => void;
}): ReactElement => (
  <Button
    colorScheme={isPrimary || isConnected ? "buttonBlue" : "orange"}
    onClick={isConnected ? onUnlink : onAuthenticate}
    size="lg"
    isDisabled={isPrimary}
    _hover={
      !isPrimary && isConnected
        ? {
            bg: "ui.red"
          }
        : {}
    }
  >
    {isConnected ? "Unlink" : "Connect"}
  </Button>
);

export default ConnectButton;
