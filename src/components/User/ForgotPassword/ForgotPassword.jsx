import { Button, Paper, TextField, Typography } from "@mui/material";
import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

export function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        navigate("/login");
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
    <Paper
      elevation={3}
      style={{
        padding: 20,
        maxWidth: 300,
        margin: "auto",
        marginTop: 50,
        backgroundColor: "#053d47",
        color: "white",
        border: "3px solid #00a2ad",
        boxShadow: "5px 5px 20px black",
      }}
    >
      <div className="header-users">
        <Typography variant="h5" gutterBottom>
          Registro de Usuario
        </Typography>
        <FontAwesomeIcon icon={faKey} />
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Enviar Mail de recuperación de contraseña
        </Button>
        <div className="forgot-password-text">
          <p>Ingrese su mail para poder recuperar la contraseña</p>
        </div>
      </form>
      <ToastContainer />
    </Paper>
  );
}
