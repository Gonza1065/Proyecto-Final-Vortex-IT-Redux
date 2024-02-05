import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../../../features/patientSlice";
import "./GetPatients.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Spinner } from "../../Spinner/Spinner";

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
            <article className="patient">
              <h1>
                {patient.lastName}, {patient.name}
              </h1>
              <div className="btn-see-cancelations">
                <Button>
                  <Link to={`/ver-cancelaciones-paciente/${patient._id}`}>
                    Ver Cancelaciones
                  </Link>
                </Button>
              </div>
            </article>
          </>
        ))}
      </section>
    </>
  );
}
