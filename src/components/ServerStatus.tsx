import { useContext } from "react";
import { SocketContext } from "../socket/SocketProvider";

const ServerStatus = () => {
  const { isOnline, socket } = useContext(SocketContext);
  return (
    <>
      <p>
        Socket ID:
        <span className="ms-1">{socket?.id || ""}</span>
      </p>
      <p>
        Service status:
        {isOnline ? (
          <span className="text-success ms-1">Online</span>
        ) : (
          <span className="text-danger ms-1">Offline</span>
        )}
      </p>
    </>
  );
};

export default ServerStatus;
