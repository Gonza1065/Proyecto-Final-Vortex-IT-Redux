import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAppointmentsByDoctor } from "../../../../features/doctorSlice";
import "./GetAppointmentsByDoctor.css";
import { Spinner } from "../../Spinner/Spinner";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GetAppointmentsByDoctor() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const role = useSelector((state) => state.users.role);
  const appointments = useSelector(
    (state) => state.doctors.appointmentsByDoctor
  );
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

  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointment/delete-appointment/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        const { message } = data;
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="title-get-appointments-by-doctor">
        <h1>Turnos por doctor</h1>
      </div>
      <section className="appointments">
        {message ? (
          <>
            <div className="message">
              <h1>{message}</h1>
            </div>
          </>
        ) : (
          appointments.map((appointment) => (
            <>
              <article className="appointment">
                <div className="date-day-month-appointment">
                  <h1>
                    <strong>{appointment.day}</strong>/
                    <strong>{appointment.month}</strong>,
                    <strong> {appointment.date}</strong> hrs. <br />
                    Estatus:
                    <strong> {appointment.status}</strong>
                    {role === "admin" && appointment.status !== "reserved" ? (
                      <>
                        <div className="btn">
                          <Button>
                            <Link to={`/actualizar-turno/${appointment._id}`}>
                              Actualizar Turno
                            </Link>
                          </Button>
                        </div>
                        <div className="btn">
                          <Button onClick={() => handleDelete(appointment._id)}>
                            <Link>Eliminar Turno</Link>
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </h1>
                </div>
              </article>
            </>
          ))
        )}
      </section>
      <ToastContainer />
    </>
  );
}
