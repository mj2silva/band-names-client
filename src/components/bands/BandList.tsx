import { ChangeEventHandler, FC, useContext, useEffect, useState } from "react";
import { SocketContext } from "../../socket/SocketProvider";
import { Band } from "./types";

const BandList: FC = () => {
  const { socket } = useContext(SocketContext);
  const [currentBands, setCurrentBands] = useState<Band[]>();

  useEffect(() => {
    if (!socket) return;
    socket.on("current-bands", (data) => {
      setCurrentBands(data.bands);
    });
    return () => {
      socket.off("current-bands");
    };
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

  return (
    <>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Current votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentBands?.map((currentBand) => {
            const handleChange: ChangeEventHandler<HTMLInputElement> = (
              event
            ) => {
              setCurrentBands((bands) =>
                bands?.map((band) =>
                  band.id === currentBand.id
                    ? { ...currentBand, name: event.target.value }
                    : band
                )
              );
            };

            const handleBlur = () => {
              updateBand(currentBand.id, currentBand.name);
            };

            return (
              <tr className="align-middle" key={currentBand.id}>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => voteBand(currentBand.id)}
                  >
                    +1
                  </button>
                </td>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={currentBand.name}
                  />
                </td>
                <td className="fs-4">{currentBand.votes}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBand(currentBand.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BandList;
