import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../../../features/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import "./GetDoctors.css";
import { Link } from "react-router-dom";
import { Spinner } from "../../Spinner/Spinner";
import { motion } from "framer-motion";
import Pagination from "@mui/material/Pagination";
import { NavBar } from "../../NavBar/NavBar";
import { getSpecialties } from "../../../../features/specialtySlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function GetDoctors() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctors);
  const role = useSelector((state) => state.users.role);
  const specialties = useSelector((state) => state.specialties.specialties);

  const limit = 5;
  useEffect(() => {
    if (token) {
      fetch(`http://localhost:5000/api/doctors`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setLoading(false);
            setMessage(data.message);
          } else {
            setLoading(false);
            setMessage(null);
            dispatch(getDoctors(data));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, token, currentPage, limit]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/specialty`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(getSpecialties(data)))
      .catch((err) => console.log(err));
  }, [token, dispatch, currentPage, limit]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
  };

  const handleWithoutFilter = () => {
    setSelectedSpecialty(false);
  };

  const filteredDoctors = selectedSpecialty
    ? doctors.filter(
        (doctor) => doctor.specialty.specialty === selectedSpecialty
      )
    : doctors;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar />
      {message ? (
        <div className="message">
          <h1>{message}</h1>
        </div>
      ) : (
        <>
          <article className="filter-doctors">
            <FormControl>
              <InputLabel id="specialty-select-label">Especialidad</InputLabel>
              <Select
                labelId="specialty-select-label"
                id="specialty-select"
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
                style={{
                  width: "150px",
                  border: "3px solid #088a96",
                }}
              >
                {specialties.map((specialty) => (
                  <MenuItem key={specialty._id} value={specialty.specialty}>
                    {specialty.specialty}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleWithoutFilter}>Sin filtrar</MenuItem>
              </Select>
            </FormControl>
          </article>
          <section className="cards-doctors">
            {filteredDoctors
              ? filteredDoctors.map((doctor) => (
                  <>
                    <motion.article
                      className="card-doctor"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="doctor-name">
                        <h1>{doctor.name}</h1>
                      </div>
                      <div className="doctor-last-name">
                        <h1>{doctor.lastName}</h1>
                      </div>
                      <div className="doctor-specialty">
                        <h1>{doctor.specialty.specialty}</h1>
                      </div>
                      {role === "admin" ? (
                        <>
                          <div className="btn-update">
                            <Link to={`/actualizar-doctor/${doctor._id}`}>
                              <FontAwesomeIcon icon={faPencil} />
                            </Link>
                            <Link to={`/ver-turnos-doctor/${doctor._id}`}>
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>
                        </>
                      ) : role === "patient" ? (
                        <>
                          <div className="btn-see-detail-doctor">
                            <Link to={`/ver-doctor/${doctor._id}`}>
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>
                        </>
                      ) : null}
                    </motion.article>
                  </>
                ))
              : doctors.map((doctor) => (
                  <>
                    <motion.article
                      className="card-doctor"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="doctor-name">
                        <h1>{doctor.name}</h1>
                      </div>
                      <div className="doctor-last-name">
                        <h1>{doctor.lastName}</h1>
                      </div>
                      <div className="doctor-specialty">
                        <h1>{doctor.specialty.specialty}</h1>
                      </div>
                      {role === "admin" ? (
                        <>
                          <div className="btn-update">
                            <Link to={`/actualizar-doctor/${doctor._id}`}>
                              <FontAwesomeIcon icon={faPencil} />
                            </Link>
                            <Link to={`/ver-turnos-doctor/${doctor._id}`}>
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>
                        </>
                      ) : role === "patient" ? (
                        <>
                          <div className="btn-see-detail-doctor">
                            <Link to={`/ver-doctor/${doctor._id}`}>
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>
                        </>
                      ) : null}
                    </motion.article>
                  </>
                ))}
          </section>
        </>
      )}
      {/* <div className="pagination">
        <Pagination
          count={5}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div> */}
    </>
  );
}
