import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketHook = (socketUrl: string) => {
  socket: Socket | null;
  isOnline: boolean;
};

const useSocket: SocketHook = (socketUrl: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("connecting");
    if (socket !== null) return;
    const conn = io(socketUrl);
    setSocket(conn);
  }, [socket, socketUrl]);

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      setIsOnline(true);
      console.log("connected");
    });
    socket.on("disconnect", () => {
      setIsOnline(false);
      console.log("connected");
    });
  }, [socket]);

  return { socket, isOnline };
};

export default useSocket;
