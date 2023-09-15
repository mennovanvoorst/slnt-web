import React from "react";
import { StoreProvider } from "@store/store";
import Router from "@routes";
import AuthProvider from "@components/AuthProvider";
import { SocketProvider } from "@client/sockets/sockets";

const App = (): JSX.Element => (
  <StoreProvider>
    <AuthProvider>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </AuthProvider>
  </StoreProvider>
);

export default App;
