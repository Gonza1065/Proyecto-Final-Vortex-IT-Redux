import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getSpecialties } from "../../../../features/specialtySlice";
import "./GetSpecialties.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Spinner } from "../../Spinner/Spinner";
import { Pagination } from "@mui/material";
import { NavBar } from "../../NavBar/NavBar";
import "react-toastify/dist/ReactToastify.css";

export function GetSpecialties() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const token = useSelector((state) => state.users.token);
  const role = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  const specialties = useSelector((state) => state.specialties.specialties);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/specialty?page=${currentPage}&limit=${limit}`,
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
          dispatch(getSpecialties(data));
        }
      })
      .catch((err) => console.log(err));
  }, [token, dispatch, currentPage, limit]);

  if (loading) {
    return <Spinner />;
  }

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <NavBar />
      {message ? (
        <div className="message">
          <h1>{message}</h1>
        </div>
      ) : (
        <section className="specialties">
          {specialties.map((specialty) => (
            <>
              <article className="specialty">
                <div>
                  <h1>{specialty.specialty}</h1>
                </div>
                {role === "admin" && (
                  <>
                    <div className="btn-update">
                      <Link to={`/actualizar-especialidad/${specialty._id}`}>
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                    </div>
                  </>
                )}
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
