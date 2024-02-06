import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/reset-password/${token}`,
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
    <>
      <Paper
        elevation={3}
        style={{ padding: 20, maxWidth: 300, margin: "auto", marginTop: 50 }}
      >
        <Typography variant="h5" gutterBottom>
          Recuperar Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="Nueva contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <TextField
            type="password"
            label="Repite la nueva contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            name="repeatNewPassword"
            value={formData.repeatNewPassword}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Resetear Contraseña
          </Button>
        </form>
        <ToastContainer />
      </Paper>
    </>
  );
}
