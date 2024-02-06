import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../../../features/patientSlice";
import "./GetPatients.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Spinner } from "../../Spinner/Spinner";
import { motion } from "framer-motion";

export function GetPatients() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.users.token);
  const patients = useSelector((state) => state.patients.patients);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:5000/api/users/patients", {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch(getPatients(data));
      })
      .catch((err) => console.log(err));
  }, [token, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="patients">
        {patients.map((patient) => (
          <>
            <motion.article
              className="patient"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1>
                {patient.lastName}, {patient.name}
              </h1>
              <div className="btn">
                <Button>
                  <Link to={`/ver-cancelaciones-paciente/${patient._id}`}>
                    Ver Cancelaciones
                  </Link>
                </Button>
                <Button>
                  <Link to={`/ver-turnos-paciente/${patient._id}`}>
                    Ver Turnos
                  </Link>
                </Button>
              </div>
            </motion.article>
          </>
        ))}
      </section>
    </>
  );
}
