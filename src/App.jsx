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
import { Specialties } from "./components/Home/Specialties/Specialties";
import { GetSpecialties } from "./components/Home/Specialties/GetSpecialties/GetSpecialties";
import { UpdateSpecialty } from "./components/Home/Specialties/UpdateSpecialty/UpdateSpecialty";
import { SeeDetailsDoctor } from "./components/Home/Doctors/SeeDetails/SeeDetailsDoctor";
import { Appointments } from "./components/Home/Appointments/Appointments";
import { AddAppointment } from "./components/Home/Appointments/AddAppointment/AddAppointment";
import { GetPatients } from "./components/Home/Appointments/GetPatients/GetPatients";
import { GetCancelations } from "./components/Home/Appointments/GetCancelations/GetCancelations";
import { GetAppointmentsByDoctor } from "./components/Home/Appointments/GetAppointmentsByDoctor/GetAppointmentsByDoctor";
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
              <Route path="/especialidades" element={<Specialties />} />
              <Route path="/ver-especialidades" element={<GetSpecialties />} />
              <Route
                path="/actualizar-especialidad/:id"
                element={<UpdateSpecialty />}
              />
              <Route path="/ver-doctor/:id" element={<SeeDetailsDoctor />} />
              <Route path="/turnos" element={<Appointments />} />
              <Route path="/añadir-turno" element={<AddAppointment />} />
              <Route path="/pacientes" element={<GetPatients />} />
              <Route
                path="/ver-cancelaciones-paciente/:id"
                element={<GetCancelations />}
              />
              <Route
                path="/ver-turnos-doctor/:id"
                element={<GetAppointmentsByDoctor />}
              />
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
