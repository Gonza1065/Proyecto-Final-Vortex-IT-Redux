import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Appointments() {
  const role = useSelector((state) => state.users.role);
  return (
    <>
      <div className="navegation">
        {role === "admin" ? (
          <>
            <Link to="/añadir-turno">Añadir turno</Link>
            <Link to="/pacientes">Ver pacientes</Link>
          </>
        ) : role === "patient" ? (
          <></>
        ) : null}
      </div>
    </>
  );
}
