import { useParams } from "react-router-dom";
import "./GetCancelations.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCancelations } from "../../../../features/patientSlice";
import { Spinner } from "../../Spinner/Spinner";
import { Pagination } from "@mui/material";
export function GetCancelations() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  const cancelations = useSelector((state) => state.patients.cancelations);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointment/all-cancelations-by-patient/${id}?page=${currentPage}&limit=${limit}`,
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
          dispatch(getCancelations(data));
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
      <div className="title-cancelations">
        <h1>Cancelaciones</h1>
      </div>

      {message ? (
        <>
          <div className="message">
            <h1>{message}</h1>
          </div>
        </>
      ) : (
        <section className="appointments">
          {cancelations.map((cancelation) => (
            <>
              <article className="appointment">
                <div className="date-day-month-appointment">
                  <h1>
                    <strong>{cancelation.day}</strong>/
                    <strong>{cancelation.month}</strong>,{" "}
                    <strong>{cancelation.date}</strong> hrs.
                  </h1>
                  <h1>
                    Doctor:{" "}
                    <strong>
                      {cancelation.doctor.lastName}, {cancelation.doctor.name}
                    </strong>
                  </h1>
                  <h1>
                    Paciente:{" "}
                    <strong>
                      {cancelation.patient.name}, {cancelation.patient.lastName}
                    </strong>
                  </h1>
                  <h1>
                    Estatus: <strong>{cancelation.status}</strong>
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
