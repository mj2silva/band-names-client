import { createContext, FC } from "react";
import useSocket from "./useSocket";

export const SocketContext = createContext<ReturnType<typeof useSocket>>({
  socket: null,
  isOnline: false,
});

const SocketProvider: FC = ({ children }) => {
  const { socket, isOnline } = useSocket("http://localhost:4000");
  return (
    <SocketContext.Provider value={{ socket, isOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
