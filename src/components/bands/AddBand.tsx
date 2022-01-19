import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

interface Props {
  createFunction: (bandName: string) => void;
}

const AddBand: FC<Props> = ({ createFunction }) => {
  const [bandName, setBandName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (bandName.trim().length > 0) {
      createFunction(bandName);
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
