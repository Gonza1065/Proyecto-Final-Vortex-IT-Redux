import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Appointments.css";
import { NavBar } from "../NavBar/NavBar";
import { Button } from "@mui/material";

export function Appointments() {
  const role = useSelector((state) => state.users.role);
  return (
    <>
      <NavBar />
      <div className="nav-bar">
        <Button>
          <Link to="/añadir-turno">Añadir turno</Link>
        </Button>
        <Button>
          <Link to="/pacientes">Ver pacientes</Link>
        </Button>
      </div>
    </>
  );
}
