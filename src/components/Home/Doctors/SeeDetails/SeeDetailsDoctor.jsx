import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAppointmentsByDoctor } from "../../../../features/doctorSlice";
import "./SeeDetailsDoctor.css";
import { Spinner } from "../../Spinner/Spinner";
import { Button } from "@mui/material";
export function SeeDetailsDoctor() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const appointments = useSelector(
    (state) => state.doctors.appointmentsByDoctor
  );
  const userId = useSelector((state) => state.users.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        console.log(data);
        if (data.message) {
          setLoading(false);
          setMessage(data.message);
        } else {
          setLoading(false);
          dispatch(getAppointmentsByDoctor(data));
        }
      })
      .catch((err) => console.log(err));
  }, [id, token, dispatch]);

  const reserveAppointment = async (userId, appointmentId) => {
    const response = await fetch(
      "http://localhost:5000/api/appointment/reserve-appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ userId, appointmentId }),
      }
    );
    if (response.ok) {
      navigate("/");
    } else {
      const data = await response.json();
      const { message } = data;
      setMessage(message);
    }
  };

  const cancelAppointment = async (userId, appointmentId) => {
    const response = await fetch(
      "http://localhost:5000/api/appointment/cancel-appointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ userId, appointmentId }),
      }
    );
    if (response.ok) {
      navigate("/");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="title-appointments">
        <h1>Turnos</h1>
      </div>
      <section>
        <ul className="appointments-by-doctor">
          {appointments.map((appointment) => (
            <>
              {appointment.status === "reserved" ? (
                <li>
                  {appointment.patient?.lastName}, {appointment.patient?.name},
                  <strong> {appointment.day}</strong>/
                  <strong>{appointment.month}</strong>,
                  <strong> {appointment.date}</strong> hrs.
                  {appointment.patient?._id === userId ? (
                    <div className="btn-cancel-reserve-appointment">
                      <Button>
                        <Link
                          onClick={() =>
                            cancelAppointment(userId, appointment._id)
                          }
                        >
                          Cancelar Turno
                        </Link>
                      </Button>
                    </div>
                  ) : null}
                </li>
              ) : appointment.status === "available" ? (
                <>
                  <li>
                    <strong>{appointment.day}</strong>/
                    <strong>{appointment.month}</strong>,{" "}
                    <strong>{appointment.date}</strong> hrs.
                    <div className="btn-cancel-reserve-appointment">
                      <Button>
                        <Link
                          onClick={() =>
                            reserveAppointment(userId, appointment._id)
                          }
                        >
                          Reservar Turno
                        </Link>
                      </Button>
                    </div>
                  </li>
                </>
              ) : null}
            </>
          ))}
        </ul>
        {message && (
          <>
            <div className="message">
              <h1>{message}</h1>
            </div>
          </>
        )}
      </section>
    </>
  );
}
