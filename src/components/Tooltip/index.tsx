import React, { HTMLAttributes } from "react";

import { Container } from "./styles";

interface ITooltipProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export { Tooltip };
