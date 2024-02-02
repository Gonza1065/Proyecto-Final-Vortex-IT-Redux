import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSpecialties } from "../../../../features/specialtySlice";
import "./GetSpecialties.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Header } from "../../NavBar/Header/Header";
export function GetSpecialties() {
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  const specialties = useSelector((state) => state.specialties.specialties);
  useEffect(() => {
    fetch("http://localhost:5000/api/specialty", {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        } else {
          dispatch(getSpecialties(data));
        }
      })
      .catch((err) => console.log(err));
  }, [token, dispatch]);
  return (
    <>
      <Header />
      <section className="specialties">
        {specialties.map((specialty) => (
          <>
            <article className="specialty">
              <div>
                <h1>{specialty.specialty}</h1>
              </div>
              <div className="btn-update">
                <Link to={`/actualizar-especialidad/${specialty._id}`}>
                  <FontAwesomeIcon icon={faPencil} />
                </Link>
              </div>
            </article>
          </>
        ))}
      </section>
      <ToastContainer />
    </>
  );
}
