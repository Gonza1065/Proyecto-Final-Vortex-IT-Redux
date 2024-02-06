import "./URLNotFound.css";
import { motion } from "framer-motion";
export function URLNotFound() {
  return (
    <>
      <motion.div
        className="url-not-found"
        animate={{ rotate: [0, 90, 180, 360] }}
        transition={{ duration: 1.2, ease: "linear" }}
      >
        <h1>
          <span>4</span>0<span>4</span>
        </h1>
        <h5>URL no encontrada</h5>
      </motion.div>
    </>
  );
}
