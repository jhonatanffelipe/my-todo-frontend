import React, { ComponentType, TextareaHTMLAttributes, useCallback, useRef, useState } from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

import { Container, Error } from "./styles";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ComponentType<IconBaseProps>;
  error: string;
}

const TextArea: React.FC<ITextAreaProps> = ({ icon: Icon, error, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      <textarea ref={inputRef} onFocus={() => handleInputFocus()} onBlur={() => handleInputBlur()} {...rest} />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export { TextArea };
