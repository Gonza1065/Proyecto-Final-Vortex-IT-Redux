import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Doctors.css";
export function Doctors() {
  const role = useSelector((state) => state.users.role);
  return (
    <>
      {role === "admin" ? (
        <>
          <div className="navegation">
            <Link to="/ver-doctores">Ver Doctores</Link>
            <Link to="/añadir-doctor">Añadir doctor</Link>
          </div>
        </>
      ) : role === "patient" ? (
        <>
          <div className="navegation">
            <Link to="/ver-doctores">Ver Doctores</Link>
          </div>
        </>
      ) : null}
    </>
  );
}
