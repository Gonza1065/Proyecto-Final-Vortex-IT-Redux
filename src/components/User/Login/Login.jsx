import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeRole, storeToken } from "../../../features/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [loading, setLoading] = useState(true);

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
        // setLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <>
  //       <Box sx={{ display: "flex" }}>
  //         <CircularProgress />
  //       </Box>
  //     </>
  //   );
  // }

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
          Login
        </Typography>
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
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Login
          </Button>
        </form>
        <Link to="/signup">
          <div className="btn-login-signup">
            <Button variant="outlined" href="#outlined-buttons">
              You do not have an account?
            </Button>
          </div>
        </Link>
        <Link to="/forgot-password">
          <div className="btn-login-signup">
            <Button variant="outlined" href="#outlined-buttons">
              Forgot your password?
            </Button>
          </div>
        </Link>
      </Paper>
    </>
  );
}
