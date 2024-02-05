import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAppointmentsByDoctor } from "../../../../features/doctorSlice";
import "./GetAppointmentsByDoctor.css";
import { Spinner } from "../../Spinner/Spinner";

export function GetAppointmentsByDoctor() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const appointments = useSelector(
    (state) => state.doctors.appointmentsByDoctor
  );
  console.log(appointments);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointment/get-appointments-by-doctor/${id}`,
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
          dispatch(getAppointmentsByDoctor(data));
        }
      })
      .catch((err) => console.log(err));
  }, [token, id, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="title-get-appointments-by-doctor">
        <h1>Get Appointments By Doctor</h1>
      </div>
      <section className="appointments-by-doctor">
        {message ? (
          <>
            <div className="message">
              <h1>{message}</h1>
            </div>
          </>
        ) : (
          appointments.map((appointment) => (
            <>
              <li className="appointment">
                <strong>{appointment.day}</strong>/
                <strong>{appointment.month}</strong>,
                <strong> {appointment.date}</strong> hrs. Estatus:
                <strong> {appointment.status}</strong>
              </li>
            </>
          ))
        )}
      </section>
    </>
  );
}
