import React, { ReactElement } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Image
} from "@chakra-ui/react";

const SessionModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}): ReactElement => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader
        textAlign="center"
        sx={{
          borderBottom: "none!important",
          paddingBottom: "16px!important",
          paddingTop: "16px!important"
        }}
      >
        <Text fontSize="2xl">Join session</Text>
      </ModalHeader>
      <ModalBody>
        <Image
          h="100%"
          objectFit="cover"
          src="/hub/assets/img/lazy_fox.svg"
          alt="Join SLNT session"
          margin="0 auto"
        />
      </ModalBody>

      <ModalFooter justifyContent="center" mt={4}>
        <Button colorScheme="buttonOrange" size="lg" onClick={onClose}>
          Join session
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default SessionModal;
