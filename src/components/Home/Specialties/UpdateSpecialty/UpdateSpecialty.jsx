import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UpdateSpecialty.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UpdateSpecialty() {
  const [formData, setFormData] = useState({
    specialty: "",
  });
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/specialty/${id}`, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          specialty: data.specialty,
        });
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/specialty/update-specialty/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      navigate("/ver-especialidades");
    } else {
      const data = await response.json();
      const { message } = data;
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="svg-icon-back">
        <Link to="/ver-especialidades">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className="title-update-specialty">
        <h1>Actualizar Especialidad</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-update-specialty">
        <input
          type="text"
          placeholder="Especialidad"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
        />
        <div className="btn-update">
          <Button type="submit">Actualizar Especialidad</Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
