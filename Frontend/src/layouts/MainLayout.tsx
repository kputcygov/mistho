import { Link, Outlet } from "react-router-dom";
import { NavBarWrapper } from "../App.styled";

export default function MainLayout() {
  return (
    <>
      <NavBarWrapper>
        <ul>
          <li>
            <Link to=""> Scrapers</Link>
          </li>
          <li>
            <Link to="runs"> Runs</Link>
          </li>
        </ul>
      </NavBarWrapper>
      <Outlet />
    </>
  );
}
