import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Specialties() {
  const role = useSelector((state) => state.users.role);
  return (
    <>
      {role === "admin" ? (
        <>
          <div className="navegation">
            <Link to="/ver-especialidades">Ver Especialidades</Link>
            <Link to="/añadir-especialidad">Añadir Especialidad</Link>
          </div>
        </>
      ) : role === "patient" ? (
        <>
          <div className="navegation">
            <Link to="/ver-especialidades">Ver Especialidades</Link>
          </div>
        </>
      ) : null}
    </>
  );
}
