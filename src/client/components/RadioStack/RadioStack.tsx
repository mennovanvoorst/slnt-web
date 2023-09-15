import { ReactElement, useState } from "react";
import { HStack, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "./RadioCard";

const RadioStack = ({
  name,
  value,
  options,
  suffix,
  onChange,
  custom
}: {
  name: string;
  value: string;
  options: string[];
  suffix: string;
  onChange: (value) => void;
  custom?: boolean;
}): ReactElement => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    onChange
  });
  const [inputChecked, setInputChecked] = useState(!options.includes(value));

  const group = getRootProps();

  const handleChange = (value, isCustom) => {
    onChange(value.replace(suffix, ""));
    setInputChecked(isCustom);
  };

  return (
    <HStack {...group}>
      {options.map((option, index) => {
        const radio = getRadioProps({ value: option });
        return (
          <RadioCard
            key={option}
            {...radio}
            options={options}
            onChange={handleChange}
          >
            {option} {suffix}
          </RadioCard>
        );
      })}

      {custom && (
        <RadioCard
          key="custom"
          onChange={handleChange}
          isChecked={inputChecked}
          options={options}
          value={!options.includes(value) ? value : ""}
          suffix={suffix}
          isInput
        />
      )}
    </HStack>
  );
};

export default RadioStack;
