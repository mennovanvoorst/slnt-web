import React, { ReactElement, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Box
} from "@chakra-ui/react";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}): ReactElement => (
  <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xl" isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader textAlign="center">Delete this account?</ModalHeader>
      <ModalBody textAlign="center" pb={2} pt={6}>
        <Text color="text.300">
          All data will be lost and your account will not be retrieveable
        </Text>
      </ModalBody>

      <ModalFooter d="flex" justifyContent="center">
        <Button
          variant="ghost"
          colorScheme="buttonGhost"
          mr={3}
          onClick={onClose}
          color="white"
          size="lg"
        >
          Cancel
        </Button>
        <Button variant="solid" colorScheme="red" size="lg" onClick={onDelete}>
          Delete
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteModal;
