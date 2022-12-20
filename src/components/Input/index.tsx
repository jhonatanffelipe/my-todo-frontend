import React, { ComponentType, InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";
import { Container } from "./styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ComponentType<IconBaseProps>;
}

const Input: React.FC<IInputProps> = ({ icon: Icon, ...rest }) => {
  return (
    <Container>
      {Icon != null && <Icon size={20} />}
      <input {...rest} />
    </Container>
  );
};

export default Input;
