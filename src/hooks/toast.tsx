import React, { createContext, HTMLAttributes, useCallback, useContext, useState } from "react";
import { ToastContainer } from "../components/ToastContainer";
import { v4 as uuidv4 } from "uuid";
import { IToastMessage } from "../interfaces/IToastMessage";

interface IToasProvider extends HTMLAttributes<HTMLElement> {}

interface IToastContextData {
  addToast: (message: Omit<IToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastProvider: React.FC<IToasProvider> = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<IToastMessage, "id">) => {
      const id = uuidv4();

      const toast = {
        id,
        title,
        description,
        type,
      };

      setMessages([...messages, toast]);
    },
    [messages],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
