import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Doctor.css";
import { NavBar } from "../NavBar/NavBar";
import { Button } from "@mui/material";
export function Doctors() {
  const role = useSelector((state) => state.users.role);
  return (
    <>
      <NavBar />
      <section>
        {role === "admin" ? (
          <>
            <div className="nav-bar">
              <Button>
                <Link to="/ver-doctores">Ver Doctores</Link>
              </Button>
              <Button>
                <Link to="/añadir-doctor">Añadir doctor</Link>
              </Button>
            </div>
          </>
        ) : role === "patient" ? (
          <>
            <div className="nav-bar">
              <Button>
                <Link to="/ver-doctores">Ver Doctores</Link>
              </Button>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
