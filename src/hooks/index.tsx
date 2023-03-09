import React, { HtmlHTMLAttributes } from "react";
import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";

interface IAppProvider extends HtmlHTMLAttributes<HTMLElement> {}

const AppProviders: React.FC<IAppProvider> = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export { AppProviders };
