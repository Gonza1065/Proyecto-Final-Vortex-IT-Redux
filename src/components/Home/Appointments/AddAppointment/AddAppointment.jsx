import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AddAppointment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddAppointment() {
  const [formData, setFormData] = useState({
    doctorSpecialty: "",
    date: "",
    day: "",
    month: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.users.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointment/add-appointment",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="title-add-appointment">
        <h1>Add Appointment</h1>
      </div>
      <form className="form-add-appointment" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Especialidad del doctor"
          name="doctorSpecialty"
          value={formData.doctorSpecialty}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Cita"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Dia"
          name="day"
          value={formData.day}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Mes"
          name="month"
          value={formData.month}
          onChange={handleChange}
        />
        <div className="btn-add-appointment">
          <Button type="submit">Añadir turno</Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
