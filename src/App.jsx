import "./App.css";
import { Login } from "./components/User/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./components/User/Signup/Signup";
import { useSelector } from "react-redux";
import { Home } from "./components/Home/Home";
import { URLNotFound } from "./components/404 URL Not Found/URLNotFound";
import { Doctors } from "./components/Home/Doctors/Doctors";
import { GetDoctors } from "./components/Home/Doctors/GetDoctors/GetDoctors";
import { UpdateDoctor } from "./components/Home/Doctors/UpdateDoctor/UpdateDoctor";
import { AddDoctor } from "./components/Home/Doctors/AddDoctor/AddDoctor";
function App() {
  const token = useSelector((state) => state.users.token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/doctores" element={<Doctors />} />
              <Route path="/ver-doctores" element={<GetDoctors />} />
              <Route path="/actualizar-doctor/:id" element={<UpdateDoctor />} />
              <Route path="/añadir-doctor" element={<AddDoctor />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="*" element={<URLNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
