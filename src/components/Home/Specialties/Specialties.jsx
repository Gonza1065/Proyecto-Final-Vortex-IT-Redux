import { Link } from "react-router-dom";
import "./Specialties.css";
import { NavBar } from "../NavBar/NavBar";
import { Button } from "@mui/material";

export function Specialties() {
  return (
    <>
      <NavBar />
      <div className="nav-bar">
        <Button>
          <Link to="/ver-especialidades">Ver Especialidades</Link>
        </Button>
      </div>
    </>
  );
}
