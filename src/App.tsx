import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
