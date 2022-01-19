import { useState } from "react";

const ServerStatus = () => {
  const [isOnline] = useState(false);
  return (
    <p>
      Service status:
      {isOnline ? (
        <span className="text-success ms-1">Online</span>
      ) : (
        <span className="text-danger ms-1">Offline</span>
      )}
    </p>
  );
};

export default ServerStatus;
