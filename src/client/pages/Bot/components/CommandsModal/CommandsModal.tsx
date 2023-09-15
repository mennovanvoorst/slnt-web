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
  Box,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/react";
import { botCommand } from "@constants";
import { Command } from "../../../../../types/command";

const CommandsModal = ({
  command,
  onSave,
  isOpen,
  onClose,
  onRemove
}: {
  command: Command;
  onSave: (message: Command) => void;
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}): ReactElement => {
  const [formvalues, setFormvalues] = useState(botCommand);

  const handleChange = (name: string, value: string | number) => {
    setFormvalues({ ...formvalues, [name]: value });
  };

  useEffect(() => {
    setFormvalues(command || botCommand);
  }, [command]);

  return (
    <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{command ? "Edit" : "Add"} command</ModalHeader>
        <ModalBody>
          <FormControl py={6}>
            <FormLabel htmlFor="name" color="white" fontWeight={600}>
              Trigger
            </FormLabel>
            <Input
              id="trigger"
              name="trigger"
              type="text"
              placeholder="Trigger"
              size="lg"
              bg="white"
              value={formvalues.trigger}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </FormControl>

          <FormControl pb={6} borderBottom="1px" borderColor="ui.dark4">
            <FormLabel htmlFor="message" color="white" fontWeight={600}>
              Message
            </FormLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              size="lg"
              bg="white"
              value={formvalues.message}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter d="flex" justifyContent="space-between">
          <Box>
            <Button
              variant="ghost"
              colorScheme="buttonGhost"
              mr={3}
              onClick={onRemove}
              color="white"
              size="lg"
            >
              Remove
            </Button>
          </Box>

          <Box>
            <Button
              variant="ghost"
              colorScheme="buttonGhost"
              mr={3}
              onClick={onClose}
              color="white"
              size="lg"
            >
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme="buttonOrange"
              size="lg"
              onClick={() => onSave(formvalues)}
            >
              Save
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommandsModal;
