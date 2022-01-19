import React, { useEffect, useState } from "react";
import AddBand from "./components/bands/AddBand";
import BandList from "./components/bands/BandList";
import { io, Socket } from "socket.io-client";

const socketConnect = () => {
  return io("http://localhost:4000");
};

export interface Band {
  id: string;
  name: string;
  votes: string;
}

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [isOnline, setIsOnline] = useState(false);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    if (!socket) setSocket(socketConnect());
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      setIsOnline(true);
    });
    socket.on("disconnect", () => {
      setIsOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("current-bands", (data) => {
      setBands(data.bands);
    });
  }, [socket]);

  const voteBand = (bandId: string) => {
    if (!socket) return;
    socket.emit("vote-band", { bandId });
  };

  const deleteBand = (bandId: string) => {
    if (!socket) return;
    socket.emit("delete-band", { bandId });
  };

  const updateBand = (bandId: string, bandName: string) => {
    if (!socket) return;
    socket.emit("update-band", { bandId, bandName });
  };

  const createBand = (bandName: string) => {
    if (!socket) return;
    socket.emit("create-band", { bandName });
  };

  return (
    <div className="container">
      <p>
        Service status:
        {isOnline ? (
          <span className="text-success ms-1">Online</span>
        ) : (
          <span className="text-danger ms-1">Offline</span>
        )}
      </p>
      <h2>Band Names</h2>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandList
            bands={bands}
            voteFunction={voteBand}
            deleteFunction={deleteBand}
            updateFunction={updateBand}
          />
        </div>
        <div className="col-4">
          <AddBand createFunction={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
