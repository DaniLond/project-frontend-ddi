import { Input } from "@nextui-org/input";
import React from "react";

const CustomInput = ({
  type,
  register,
  label,
  placeholder,
  name,
  errorMessage,
  errors,
  value,
  onChange,
  ...rest
}) => {
  const isInvalid = errors[name];

  const registerProps =
    typeof register === "function"
      ? register(name, {
          onChange: (e) => {
            if (onChange) onChange(e);
          },
        })
      : register || {};

  return (
    <Input
      type={type}
      {...registerProps}
      value={value}
      label={label}
      placeholder={placeholder}
      name={name}
      errorMessage={isInvalid ? errorMessage : ""}
      variant="bordered"
      radius="sm"
      labelPlacement="outside"
      isRequired
      isClearable
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "primary"}
      classNames={{
        label: "text-black",
      }}
      {...rest}
    />
  );
};

export default CustomInput;
