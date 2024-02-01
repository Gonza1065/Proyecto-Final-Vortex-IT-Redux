import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddDoctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    specialty: "",
  });
  const [message, setMessage] = useState(null);
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/doctors/add-doctor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
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
        <Link to="/doctores">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className="title-add-doctor">
        <h1>Añadir doctor</h1>
      </div>
      <form className="form-add-doctor" onSubmit={handleSubmit}>
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
        <input
          type="text"
          placeholder="Especialidad"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
        />
        <Button type="submit">Añadir Doctor</Button>
      </form>
      {/* <div>
        <h1>{message}</h1>
      </div> */}
      <ToastContainer />
    </>
  );
}
