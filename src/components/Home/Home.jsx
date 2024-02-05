import { NavBar } from "./NavBar/NavBar";
import { Presentation } from "./Presentation/Presentation";
import "./Home.css";
export function Home() {
  return (
    <>
      <div className="body-home">
        <NavBar />
        <Presentation />
      </div>
    </>
  );
}
