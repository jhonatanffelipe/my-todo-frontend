import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./hooks";

import AppRoutes from "./routes";
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
};

export default App;
