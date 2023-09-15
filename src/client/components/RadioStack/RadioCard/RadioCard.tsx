import { ReactElement, useState } from "react";
import { Box, useRadio, Input } from "@chakra-ui/react";

const RadioCard = (props: any): ReactElement => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const [inputValue, setInputValue] = useState(props.value);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const handleChange = (e, isCustom) => {
    props.onChange(e.target.value, isCustom);

    if (isCustom) setInputValue(e.target.value);
  };

  const handleSelect = (isCustom) => {
    props.onChange(inputValue, isCustom);
  };

  if (props.isInput)
    return (
      <Box
        flex="1"
        position="relative"
        as="label"
        _after={{
          position: "absolute",
          top: 0,
          right: 4,
          display: "flex",
          alignItems: "center",
          h: "full",
          content: `'${props.suffix}'`,
          fontWeight: 600,
          color: props.isChecked ? "text.100" : "ui.dark2"
        }}
      >
        <Input
          cursor="pointer"
          fontWeight={600}
          px={4}
          py={2}
          bg={props.isChecked ? "ui.orange" : "white"}
          color={props.isChecked ? "text.100" : "ui.dark2"}
          borderRadius="md"
          outline="none"
          border="none"
          onChange={(value) => handleChange(value, true)}
          onClick={() => handleSelect(true)}
          value={inputValue}
          _focus={{
            color: "text.100",
            bg: "ui.orange"
          }}
          _hover={{
            color: "ui.dark2",
            bg: "text.100"
          }}
        />
      </Box>
    );

  return (
    <Box as="label" flex="1">
      <input {...input} onChange={(e) => handleChange(e, false)} />
      <Box
        {...checkbox}
        textAlign="center"
        cursor="pointer"
        color="ui.dark2"
        fontWeight={600}
        px={4}
        py={2}
        bg="white"
        borderRadius="md"
        _checked={{
          color: "text.100",
          bg: "ui.orange"
        }}
        _hover={{
          color: "ui.dark2",
          bg: "text.100"
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
