import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../../../features/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./GetDoctors.css";
import { Link } from "react-router-dom";
import { Header } from "../../NavBar/Header/Header";
export function GetDoctors() {
  const [message, setMessage] = useState(null);
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
            setMessage(data.message);
          } else {
            dispatch(getDoctors(data));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, token]);
  return (
    <>
      <Header />
      <section className="cards-doctors">
        {message ? (
          <div className="message">
            <h1>{message}</h1>
          </div>
        ) : (
          doctors.map((doctor) => (
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
                    </div>
                  </>
                ) : null}
              </article>
            </>
          ))
        )}
      </section>
    </>
  );
}
