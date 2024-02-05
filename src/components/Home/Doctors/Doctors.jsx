import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function Doctors() {
  const role = useSelector((state) => state.users.role);
  return (
    <>
      <div className="body-home">
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
      </div>
    </>
  );
}
