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
  HStack,
  Radio,
  RadioGroup,
  Switch,
  Box
} from "@chakra-ui/react";
import { TimedMessage } from "@interfaces/timedMessage";
import { timedMessage } from "@constants";
import RadioStack from "@components/RadioStack";

const TimedMessageModal = ({
  message,
  onSave,
  isOpen,
  onClose,
  onRemove
}: {
  message: TimedMessage;
  onSave: (message: TimedMessage) => void;
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}): ReactElement => {
  const [formvalues, setFormvalues] = useState(timedMessage);

  const handleChange = (name: string, value: string | number) => {
    setFormvalues({ ...formvalues, [name]: value });
  };

  const handleToggle = (isChecked: boolean) => {
    setFormvalues({ ...formvalues, enabled: isChecked });
  };

  useEffect(() => {
    setFormvalues(message || timedMessage);
  }, [message]);

  return (
    <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {message ? "Edit" : "Add"} timed message
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={formvalues.enabled}
            onChange={(e) => handleToggle(e.target.checked)}
          />
        </ModalHeader>
        <ModalBody>
          <FormControl py={6}>
            <FormLabel htmlFor="name" color="white" fontWeight={600}>
              Name
            </FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              size="lg"
              bg="white"
              value={formvalues.name}
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

          <FormControl py={6} borderBottom="1px" borderColor="ui.dark4">
            <FormLabel htmlFor="interval" color="white" fontWeight={600}>
              Interval
            </FormLabel>

            <RadioStack
              name="interval"
              value={formvalues.interval.toString()}
              options={["15", "30", "45", "60"]}
              suffix="min"
              onChange={(value) => handleChange("interval", parseInt(value))}
              custom
            />

            <FormHelperText color="text.300">
              This is the time between each message. The messages are sent
              starting from the hour (for example: 20 minutes is at: 12:00,
              12:20, 12:40, etc).
            </FormHelperText>
          </FormControl>

          <FormControl py={6}>
            <FormLabel
              htmlFor="messages_between"
              color="white"
              fontWeight={600}
            >
              Chat lines
            </FormLabel>

            <Flex maxW="25%" align="center">
              <NumberInput
                id="messages_between"
                name="messages_between"
                value={formvalues.messages_between}
                min={0}
                onChange={(value) =>
                  handleChange("messages_between", parseInt(value))
                }
                allowMouseWheel
              >
                <NumberInputField color="ui.dark4" bg="white" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Text color="text.100" ml={2}>
                lines
              </Text>
            </Flex>

            <FormHelperText color="text.300">
              This is the minimum amount of chat lines (measured in lines per 5
              minutes). This prevents the bot from spamming your channel.
            </FormHelperText>
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

export default TimedMessageModal;
