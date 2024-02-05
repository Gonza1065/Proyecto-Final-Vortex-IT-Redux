import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../../../features/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import "./GetDoctors.css";
import { Link } from "react-router-dom";
import { Spinner } from "../../Spinner/Spinner";
export function GetDoctors() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctors);
  const role = useSelector((state) => state.users.role);
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/doctors", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            console.log(data);
            setMessage(data.message);
          } else {
            setLoading(false);
            dispatch(getDoctors(data));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, token]);

  if (loading) {
    return <Spinner />;
  }

  if (message) {
    return (
      <div className="message">
        <h1>{message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="cards-doctors">
        {doctors.map((doctor) => (
          <>
            <article className="card-doctor">
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
            </article>
          </>
        ))}
      </section>
    </>
  );
}
