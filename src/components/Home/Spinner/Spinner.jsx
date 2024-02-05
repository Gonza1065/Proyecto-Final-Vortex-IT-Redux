import { BeatLoader } from "react-spinners";
import "./Spinner.css";
export function Spinner() {
  return (
    <>
      <div className="spinner">
        <BeatLoader color="#1633f7" />
      </div>
    </>
  );
}
