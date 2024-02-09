import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeId, storeRole, storeToken } from "../../../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../../Home/Spinner/Spinner";

export function Login() {
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, existingUser } = data;
        dispatch(storeToken(token));
        dispatch(storeRole(existingUser.role));
        dispatch(storeId(existingUser._id));
        setLoading(false);
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

  if (loading) {
    return <Spinner />;
  }

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
            Iniciar sesión
          </Typography>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <form onSubmit={handleSubmit} className="form-register-users">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
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
          <Button variant="contained" color="primary" fullWidth type="submit">
            Iniciar Sesión
          </Button>
        </form>
        <Link to="/signup">
          <div className="btn-login-signup">
            <Button variant="outlined" href="#outlined-buttons">
              ¿No tienes una cuenta?
            </Button>
          </div>
        </Link>
        <Link to="/olvidar-contraseña">
          <div className="btn-login-signup">
            <Button variant="outlined" href="#outlined-buttons">
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
        </Link>
        <ToastContainer />
      </Paper>
    </>
  );
}
