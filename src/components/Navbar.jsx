import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X, Heart } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { WordRotate } from "./WordRotateComp";
import { motion, AnimatePresence } from "framer-motion";
import { clearAllTokens } from "../utils/tokenUtils";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, isLoadingUser } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMenu]);

  const logout = () => {
    setToken(null);
    clearAllTokens();
    toast.info("Logged Out.");
  };

  // Handle click outside for profile menu
  React.useEffect(() => {
    const handleProfileClickOutside = (event) => {
      if (event.target.closest(".profile-menu-container") === null) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleProfileClickOutside);
    } else {
      document.removeEventListener("mousedown", handleProfileClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleProfileClickOutside);
    };
  }, [showProfileMenu]);

  const handleClickOutside = (event) => {
    if (event.target.closest(".menu-container") === null) {
      setShowMenu(false);
    }
  };

  React.useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleAuthNavigation = (type) => {
    const currentPath = window.location.pathname;

    if (currentPath === "/login") {
      navigate(`/login?type=${type}`, { replace: true });
      window.location.reload();
    } else {
      navigate(`/login?type=${type}`);
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [navigate]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white backdrop-blur-xl shadow-lg border-b border-purple-100/50"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="flex items-center justify-between py-4 lg:py-6"> */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center py-4 -mt-1"
          >
            <img
              src="raskamonLogo2.jpg"
              alt="Logo"
              className="h-[4.2rem] w-auto object-contain transition-all duration-300 lg:h-[4.2rem]"
            />
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { path: "/", label: "HOME" },
              { path: "/services", label: "SERVICES" },
              { path: "/doctors", label: "EXPERTS" },
              { path: "/resources", label: "RESOURCES" },
              { path: "/moodtracker", label: "MOOD TRACKER" },
              // { path: "/mood-dashboard", label: "MOOD DASHBOARD" },
              { path: "/mood-analysis", label: "ASSESSMENT" },
              { path: "/about", label: "ABOUT" },
            ].map((link) => (
              <NavLink key={link.path} to={link.path}>
                <motion.div whileHover={{ y: -2 }} className="relative group">
                  <span
                    className={`font-semibold text-sm transition-all duration-300 ${
                      activeLink === link.path
                        ? "text-purple-600"
                        : "text-gray-700 group-hover:text-purple-600"
                    }`}
                  >
                    {link.label}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: activeLink === link.path ? "100%" : "0%",
                    }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons/Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {token ? (
              <>
                {/* Notification Bell */}
                {/* <NotificationBell /> */}

                <div className="relative profile-menu-container">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 sm:gap-2 cursor-pointer p-1.5 sm:p-2 rounded-full hover:bg-white/50 transition-all duration-300"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    {userData ? (
                      <img
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-purple-200"
                        src={userData.image || "profile_pic.png"}
                        alt="profile"
                        onError={(e) => {
                          e.target.src = "profile_pic.png";
                        }}
                      />
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-200 flex items-center justify-center">
                        <span className="text-purple-600 text-xs sm:text-sm font-medium">
                          {isLoadingUser ? "..." : "U"}
                        </span>
                      </div>
                    )}
                    <ChevronDown
                      size={14}
                      className={`text-purple-600 transition-transform duration-300 hidden sm:block ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 sm:w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100/50 overflow-hidden z-50"
                        style={{
                          maxWidth: "calc(100vw - 2rem)",
                          right: "0",
                          left: "auto",
                          minWidth: "200px",
                          transform: "translateX(0)",
                        }}
                      >
                        <div className="p-2">
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(124, 58, 237, 0.1)",
                            }}
                            onClick={() => {
                              navigate("my-profile");
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center px-3 py-3 sm:py-2.5 rounded-xl cursor-pointer transition-all duration-200 touch-manipulation"
                          >
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              My Profile
                            </span>
                          </motion.div>
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(124, 58, 237, 0.1)",
                            }}
                            onClick={() => {
                              navigate("my-appointments");
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center px-3 py-3 sm:py-2.5 rounded-xl cursor-pointer transition-all duration-200 touch-manipulation"
                          >
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              My Appointments
                            </span>
                          </motion.div>
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(124, 58, 237, 0.1)",
                            }}
                            onClick={() => {
                              navigate("my-assessments");
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center px-3 py-3 sm:py-2.5 rounded-xl cursor-pointer transition-all duration-200 touch-manipulation"
                          >
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              My Assessment Result
                            </span>
                          </motion.div>
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(124, 58, 237, 0.1)",
                            }}
                            onClick={() => {
                              navigate("dashboard");
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center px-3 py-3 sm:py-2.5 rounded-xl cursor-pointer transition-all duration-200 touch-manipulation"
                          >
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              My Analytics
                            </span>
                          </motion.div>
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(124, 58, 237, 0.1)",
                            }}
                            onClick={() => {
                              navigate("resources");
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center px-3 py-3 sm:py-2.5 rounded-xl cursor-pointer transition-all duration-200 touch-manipulation"
                          >
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              Self-Help Resources
                            </span>
                          </motion.div>
                          <div className="border-t border-purple-100 my-2" />
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                            }}
                            onClick={() => {
                              logout();
                              setShowProfileMenu(false);
                            }}
                            className="flex items-center justify-between px-3 py-3 sm:py-2.5 rounded-xl cursor-pointer transition-all duration-200 group touch-manipulation"
                          >
                            <span className="text-red-500 font-medium text-sm sm:text-base">
                              Logout
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-red-500 group-hover:translate-x-1 transition-transform duration-200"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthNavigation("login")}
                  className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full font-semibold text-sm hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAuthNavigation("signup")}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign Up
                </motion.button>
              </div>
            )}

            {/* Mobile Sign Up Button */}
            {!token && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAuthNavigation("signup")}
                className="sm:hidden px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-semibold"
              >
                Sign Up
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(true)}
              className="lg:hidden p-2 rounded-full hover:bg-white/50 transition-all duration-300 z-50"
            >
              <Menu size={24} className="text-purple-600" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setShowMenu(false)}
              onTouchMove={(e) => e.preventDefault()}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-[70] p-6 overflow-y-auto touch-pan-y"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "320px",
                maxWidth: "85vw",
              }}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMenu(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>

              <nav className="space-y-4">
                {[
                  { path: "/", label: "Home" },
                  { path: "/doctors", label: "All Doctors" },
                  { path: "/mood-analysis", label: "Assessment" },
                  { path: "/resources", label: "Resources" },
                  { path: "/about", label: "About" },
                  { path: "/contact", label: "Contact" },
                ].map((link) => (
                  <NavLink
                    key={link.path}
                    onClick={() => setShowMenu(false)}
                    to={link.path}
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      className={`py-3 px-4 rounded-xl transition-all duration-300 ${
                        activeLink === link.path
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-gray-700 hover:bg-purple-50"
                      }`}
                    >
                      <span className="font-medium">{link.label}</span>
                    </motion.div>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
