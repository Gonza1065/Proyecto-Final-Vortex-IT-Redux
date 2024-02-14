import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { deleteToken } from "../../../features/userSlice";
export function NavBar() {
  const token = useSelector((state) => state.users.token);
  const role = useSelector((state) => state.users.role);
  const id = useSelector((state) => state.users.id);
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <nav>
          <ul className="navegation">
            <div>
              <Link to="/">Inicio</Link>
              <Link to="/doctores">Doctores</Link>
              {role === "admin" && <Link to="/turnos">Turnos</Link>}

              <Link to="/especialidades">Especialidades</Link>
            </div>
            <div className="btn-logout">
              <Link
                onClick={() => dispatch(deleteToken(token, role, id))}
                to="/login"
                className="btn-nav-bar-logout"
              >
                Logout
              </Link>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}
