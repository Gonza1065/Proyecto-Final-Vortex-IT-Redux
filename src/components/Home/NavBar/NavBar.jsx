import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { deleteToken } from "../../../features/userSlice";
export function NavBar() {
  const token = useSelector((state) => state.users.token);
  const role = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <nav>
          <ul className="navegation">
            <Link
              onClick={() => dispatch(deleteToken(token, role))}
              to="/login"
              className="btn-nav-bar-logout"
            >
              Logout
            </Link>
            <Link to="/doctores">Doctores</Link>
            <Link to="/turnos">Turnos</Link>
            <Link to="/especialidades">Especialidades</Link>
          </ul>
        </nav>
      </header>
    </>
  );
}
