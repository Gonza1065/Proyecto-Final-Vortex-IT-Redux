import { Link } from "react-router-dom";
import "./Header.css";
export function Header() {
  return (
    <>
      <header>
        <nav>
          <ul className="header-home">
            <Link to="/">Inicio</Link>
          </ul>
        </nav>
      </header>
    </>
  );
}
