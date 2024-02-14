import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAppointments } from "../../../../features/patientSlice";
import "./GetAppointmentsByPatient.css";
import { Spinner } from "../../Spinner/Spinner";
import { Pagination } from "@mui/material";

export function GetAppointmentsByPatient() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const appointments = useSelector((state) => state.patients.appointments);
  const dispatch = useDispatch();

  const limit = 6;

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointment/get-appointments-by-patients/${id}?page=${currentPage}&limit=${limit}`,
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
          dispatch(getAppointments(data));
        }
      })
      .catch((err) => console.log(err));
  }, [id, token, dispatch, currentPage, limit]);

  if (loading) {
    return <Spinner />;
  }

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="title-get-appointments-by-patient">
        <h1>Turnos por pacientes</h1>
      </div>

      {message ? (
        <div className="message">
          <h1>{message}</h1>
        </div>
      ) : (
        <section className="appointments">
          {appointments.map((appointment) => (
            <>
              <article className="appointment">
                <div className="date-day-month-appointment">
                  <h1>
                    <strong>{appointment.day}</strong>/
                    <strong>{appointment.month}</strong>,{" "}
                    <strong>{appointment.date}</strong> hrs.
                  </h1>
                  <h1>
                    Doctor: <strong>{appointment.doctor.lastName}</strong>,{" "}
                    <strong>{appointment.doctor.name}</strong>
                  </h1>
                  <h1>
                    Estatus: <strong>{appointment.status}</strong>
                  </h1>
                </div>
              </article>
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
