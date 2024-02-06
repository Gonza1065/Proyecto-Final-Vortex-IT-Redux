import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
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
          <FontAwesomeIcon icon={faUser} />
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Rol"
            variant="outlined"
            fullWidth
            margin="normal"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Registrarme
          </Button>
        </form>
        <Link to="/login">
          <div className="btn-login-signup">
            <Button variant="outlined" href="#outlined-buttons">
              ¿Tienes una cuenta?
            </Button>
          </div>
        </Link>
      </Paper>
    </>
  );
}
