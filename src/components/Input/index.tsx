import React, { ComponentType, InputHTMLAttributes, useCallback, useRef, useState } from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

import { Container, Error } from "./styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<IconBaseProps>;
  error: string;
}

const Input: React.FC<IInputProps> = ({ icon: Icon, error, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  const handleInputFocus = useCallback((): void => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback((): void => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

  return (
    <Container isError={!!error} isFocused={isFocused} isField={isField}>
      {Icon != null && <Icon size={20} />}
      <input ref={inputRef} onFocus={() => handleInputFocus()} onBlur={() => handleInputBlur()} {...rest} />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export { Input };
