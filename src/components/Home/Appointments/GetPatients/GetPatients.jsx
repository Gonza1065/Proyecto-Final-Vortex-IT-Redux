import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../../../features/patientSlice";
import "./GetPatients.css";
import { Link } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { Spinner } from "../../Spinner/Spinner";
import { motion } from "framer-motion";
import { NavBar } from "../../NavBar/NavBar";

export function GetPatients() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const token = useSelector((state) => state.users.token);
  const patients = useSelector((state) => state.patients.patients);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/users/patients?page=${currentPage}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setLoading(false);
          setMessage(data.message);
        } else {
          setLoading(false);
          setMessage(null);
          dispatch(getPatients(data));
        }
      })
      .catch((err) => console.log(err));
  }, [token, dispatch, currentPage, limit]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar />
      {message ? (
        <>
          <div className="message">
            <h1>{message}</h1>
          </div>
        </>
      ) : (
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
      )}
      <div className="pagination">
        <Pagination
          count={5}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
}
