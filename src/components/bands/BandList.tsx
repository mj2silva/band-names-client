import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { Band } from "../../App";

interface Props {
  bands: Band[];
  voteFunction: (id: string) => void;
  deleteFunction: (id: string) => void;
  updateFunction: (id: string, name: string) => void;
}

const BandList: FC<Props> = ({
  bands,
  voteFunction,
  deleteFunction,
  updateFunction,
}) => {
  const [currentBands, setCurrentBands] = useState(bands);

  useEffect(() => {
    setCurrentBands(bands);
  }, [bands]);

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
          {currentBands.map((currentBand) => {
            const handleChange: ChangeEventHandler<HTMLInputElement> = (
              event
            ) => {
              setCurrentBands((bands) =>
                bands.map((band) =>
                  band.id === currentBand.id
                    ? { ...currentBand, name: event.target.value }
                    : band
                )
              );
            };

            const handleBlur = () => {
              updateFunction(currentBand.id, currentBand.name);
            };

            return (
              <tr className="align-middle" key={currentBand.id}>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => voteFunction(currentBand.id)}
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
                    onClick={() => deleteFunction(currentBand.id)}
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
