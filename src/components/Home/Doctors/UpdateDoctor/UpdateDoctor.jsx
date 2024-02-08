import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UpdateDoctor.css";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function UpdateDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
  });
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          lastName: data.lastName,
          specialty: data.specialty.specialty,
        });
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lastName || !formData.name) {
      return toast.error("Todos los campos son requeridos");
    }
    const response = await fetch(
      `http://localhost:5000/api/doctors/update-doctor/${id}`,
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
      toast.success("Doctor actualizado");
      navigate("/ver-doctores");
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
        <Link to="/ver-doctores">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className="title-update-doctor">
        <h1>Actualizar Doctor</h1>
      </div>
      <form className="form-update-doctor" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <div className="btn-update-doctor">
          <Button variant="text" type="submit">
            Actualizar Doctor
          </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
