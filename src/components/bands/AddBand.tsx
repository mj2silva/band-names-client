import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import { SocketContext } from "../../socket/SocketProvider";

const AddBand: FC = () => {
  const { socket } = useContext(SocketContext);
  const [bandName, setBandName] = useState("");

  const createBand = (bandName: string) => {
    if (!socket) return;
    socket.emit("create-band", { bandName });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (bandName.trim().length > 0) {
      createBand(bandName);
      setBandName("");
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setBandName(event.target.value);
  };

  return (
    <>
      <h3>Add band</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="New band name"
          value={bandName}
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default AddBand;
