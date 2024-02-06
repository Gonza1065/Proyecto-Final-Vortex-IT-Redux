import { motion } from "framer-motion";
import "./Presentation.css";
export function Presentation() {
  return (
    <>
      <div className="body-presentation">
        <div className="presentation-title">
          <h1>
            <span>¡</span>Elige tu turno con nosotros<span>!</span>
          </h1>
        </div>
        <div className="img-doctor-presentation">
          <img
            src="https://res.cloudinary.com/dn2vrx9eu/image/upload/v1706899656/ricardo-removebg-preview_gvbepe.png"
            alt=""
          />
        </div>
      </div>
      <section className="cards-presentation">
        <motion.div
          className="card-presentation-1"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ transitionDelay: "0s" }}
        >
          <div className="title">
            <h1>Turnos</h1>
          </div>
          <div className="card-text">
            <h5>
              Puedes pedir turnos que estén habilidados para el doctor que
              quieras.
            </h5>
          </div>
        </motion.div>
        <motion.div
          className="card-presentation-2"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1>Especialidades</h1>
          <div className="card-text">
            <h5>¡Encontrá la especialidad que estás buscando!</h5>
          </div>
        </motion.div>
        <motion.div
          className="card-presentation-3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 1000 }}
        >
          <h1>Doctores</h1>
          <div className="card-text">
            <h5>Los mejores doctores están con nosotros.</h5>
          </div>
        </motion.div>
      </section>
    </>
  );
}
