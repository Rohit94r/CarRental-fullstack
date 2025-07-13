import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";
import toast from "react-hot-toast";
import {motion} from 'motion/react'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isHome = location.pathname === "/";

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.header
    initial={{y: -20, opacity: 0}}
    animate={{y:0, opacity: 1}}
    transition={{duration: 1}}

      className={`flex justify-between items-center p-4 border-b border-borderColor fixed top-0 left-0 right-0 z-50 transition-colors ${
        isHome ? "bg-light" : "bg-white"
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link to="/">
        <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="Logo" className="h-8" />
      </Link>

      {/* Navigation Links */}
      <nav
        className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8
          max-sm:fixed max-sm:top-16 max-sm:right-0 max-sm:h-screen max-sm:w-full
          max-sm:p-4 max-sm:border-t border-borderColor transition-transform duration-300
          ${isHome ? "max-sm:bg-light" : "max-sm:bg-white"}
          ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map(({ path, name }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setOpen(false)}
            className={`transition-colors ${
              location.pathname === path ? "text-primary font-semibold" : ""
            }`}
          >
            {name}
          </Link>
        ))}

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search Products"
          />
          <img src={assets.search_icon} alt="Search" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              if (isOwner) {
                navigate("/owner");
              } else {
                changeRole();
              }
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>

          <button
            onClick={() => {
              if (user) {
                logout();
              } else {
                setShowLogin(true);
              }
              setOpen(false);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-colors text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt={open ? "Close menu" : "Open menu"}
        />
      </button>
    </motion.header>
  );
};

export default Navbar;
