import { NavLink } from "react-router-dom";

const NavBar = () => {
  let activeStyle = {
    backgroundColor: "#04aa6d",
    color: "white",
  };
  return (
    <div class="topnav">
      <NavLink
        to="/add-employee"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Add Employee
      </NavLink>
      <NavLink
        to="/modify-employee"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Modify Employee
      </NavLink>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Generate Report
      </NavLink>
      <NavLink
        to="/add-timecard"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Add Time Card
      </NavLink>
      <NavLink
        to="/delete-timecard"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Delete Time Card
      </NavLink>
    </div>
  );
};

export default NavBar;
