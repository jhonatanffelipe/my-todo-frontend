import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  size?: number;
}

const Button: React.FC<IButtonProps> = ({ children, loading, size, ...rest }) => {
  return (
    <Container type="button" disabled={loading} size={size} {...rest}>
      {loading ? "Carregando..." : children}
    </Container>
  );
};

export { Button };
