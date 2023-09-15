import React, { ChangeEvent, ReactElement } from "react";
import { HStack, Input, VStack, IconButton, Box } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@assets/icons";

const NumberInput = ({
  onChange,
  value,
  isDisabled
}: {
  value: string;
  onChange: (value: number) => void;
  isDisabled: boolean;
}): ReactElement => {
  const handleIncrease = () => {
    onChange(parseInt(value) + 1);
  };
  const handleDecrease = () => {
    onChange(parseInt(value) - 1);
  };

  return (
    <HStack spacing={1} alignItems="stretch" opacity={isDisabled && "0.5"}>
      <Input
        type="number"
        variant="solid"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        bg="ui.blue"
        color="white"
        fontWeight="medium"
        w="64px"
        h="auto"
        display="inline-flex"
        alignItems="center"
      />

      <VStack spacing={1}>
        <IconButton
          colorScheme="buttonBlue"
          variant="solid"
          aria-label="add"
          size="xs"
          icon={<PlusIcon />}
          onClick={handleIncrease}
        />
        <IconButton
          colorScheme="buttonBlue"
          variant="solid"
          aria-label="minus"
          size="xs"
          icon={<MinusIcon />}
          onClick={handleDecrease}
        />
      </VStack>
    </HStack>
  );
};

export default NumberInput;
