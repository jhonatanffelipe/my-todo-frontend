import React, { useEffect } from "react";
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

import { Container } from "./styles";
import { useToast } from "../../../hooks/toast";
import { IToastMessage } from "../../../interfaces/IToastMessage";

interface IToastProps {
  message: IToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<IToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container type={message.type ? message.type : "info"} hasDescription={!!message.description}>
      {icons[message.type ? message.type : "info"]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export { Toast };
