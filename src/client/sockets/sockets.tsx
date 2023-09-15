import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { EventHandlers } from "@interfaces/sockets";
import { io, Socket } from "socket.io-client";

import { useStore } from "@store/store";
import config from "@config";
import sessionHandler from "./routes/session";

export const handlers: EventHandlers = {
  ...sessionHandler
};

const socket: Socket = io(config.server_url, {
  withCredentials: true
});
const SocketContext = createContext(socket);

export const SocketProvider = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
  const { dispatch } = useStore();

  useEffect(() => {
    socket.on("action", (action) => {
      console.log(action);
      const eventHandler = handlers[action.type];

      if (eventHandler) {
        eventHandler(action.payload, dispatch);
      }
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket => useContext(SocketContext);
