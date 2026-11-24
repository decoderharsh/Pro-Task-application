import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div className="h-12 bg-gray-600 shadow-md">
      <div className="relative flex h-full items-center justify-between px-6">
        {/* Logo */}
        <h3 className="text-xl font-bold text-gray-200">ProTask</h3>

        {/* Navigation Links */}
        <ul className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "text-blue-500" : "text-white"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "text-blue-500" : "text-white"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "text-blue-500" : "text-white"}`
            }
          >
            My projects
          </NavLink>
            <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `px-2 py-1 ${isActive ? "text-blue-500" : "text-white"}`
            }
          >
            Tasks
          </NavLink>
          </ul>
    
        {/*Auth Buttons */}
        {!localStorage.getItem('token')?
        <div className="flex items-center gap-3">
          <NavLink
            className="rounded-lg bg-blue-500 px-3 py-1 text-white" to="/login">
            Login
          </NavLink>

          <NavLink
            className="mr-3 rounded-lg bg-blue-500 px-3 py-1 text-white"
            to="/signup"
          >
            Signup
          </NavLink>
        </div>:<button onClick={handleLogout}className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:cursor-pointer">Logout</button>
          }
      </div>
    </div>
  );
};

export default Navbar;
