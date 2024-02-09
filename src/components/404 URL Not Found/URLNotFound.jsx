import "./URLNotFound.css";
import { motion } from "framer-motion";
export function URLNotFound() {
  return (
    <>
      <motion.div
        className="url-not-found"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h1>
          <span>4</span>0<span>4</span>
        </h1>
        <h5>URL no encontrada</h5>
      </motion.div>
    </>
  );
}
