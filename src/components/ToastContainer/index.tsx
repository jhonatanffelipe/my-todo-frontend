import React from "react";

import { Container } from "./styles";
import { IToastMessage } from "../../interfaces/IToastMessage";
import { Toast } from "./Toast";

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export { ToastContainer };
