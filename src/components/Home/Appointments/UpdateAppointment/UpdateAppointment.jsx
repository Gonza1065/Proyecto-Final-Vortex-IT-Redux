import { useSelector } from "react-redux";
import "./UpdateAppointment.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
export function UpdateAppointment() {
  const [formData, setFormData] = useState({
    date: "",
    day: "",
    month: "",
  });
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          date: data.date,
          day: data.day,
          month: data.month,
        });
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointment/update-appointment/${id}`,
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
        navigate("/ver-doctores");
      } else {
        const data = await response.json();
        const { message } = data;
        console.log(message);
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
      <div className="title-update-appointment">
        <h1>Actualizar turno</h1>
      </div>
      <form className="form-update-appointment" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Fecha"
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
        <div className="btn-update-appointment">
          <Button type="submit">Actualizar Turno</Button>
        </div>
      </form>
    </>
  );
}
