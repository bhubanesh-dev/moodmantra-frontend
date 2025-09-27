import React, { useContext } from "react";
import { assets } from "../assets/assets";
import {
  Copyright,
  Mail,
  Phone,
  Heart,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
  Users,
  Star,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { WordRotate } from "./WordRotateComp";

const Footer = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Our Team", path: "/ourTeam" },
    { name: "Resources", path: "/resources" },
    { name: "Expert Therapists", path: "/doctors" },
    { name: "Contact Us", path: "/contact" },
    {
      name: "Privacy Policy",
      //path: "https://merchant.razorpay.com/policy/PweTRtIOPlC8KZ/privacy",
      //external: true,
      path: "/privacy-policy",
    },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Terms and conditions", path: "/terms&conditions" },
  ];

  const services = [
    { name: "Individual Therapy", path: "/individual-therapy" },
    { name: "Couples Counseling", path: "/couples-counselling" },
    { name: "Family Therapy", path: "/family-therapy" },
    { name: "Child & Adolescent", path: "/child-adolescent" },
    { name: "Online Sessions", path: "/services" },
    { name: "Mental Health Assessment", path: "/mood-analysis" },
  ];

  const stats = [
    {
      icon: <Users className="text-2xl" />,
      number: "500+",
      label: "Happy Clients",
    },
    {
      icon: <Star className="text-2xl" />,
      number: "98%",
      label: "Satisfaction Rate",
    },
    {
      icon: <Clock className="text-2xl" />,
      number: "24/7",
      label: "Support Available",
    },
    {
      icon: <Shield className="text-2xl" />,
      number: "100%",
      label: "Confidential",
    },
  ];

  const socialLinks = [
    {
      name: "twitter",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "youtube",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.615 3.184a3.024 3.024 0 012.122 2.146c.517 1.918.517 5.918.517 5.918s0 4-.517 5.918a3.024 3.024 0 01-2.122 2.146C17.7 20 12 20 12 20s-5.7 0-7.615-.688a3.024 3.024 0 01-2.122-2.146C1.746 15.266 1.746 11.266 1.746 11.266s0-4 .517-5.918a3.024 3.024 0 012.122-2.146C6.3 2.5 12 2.5 12 2.5s5.7 0 7.615.684zm-9.615 4.632v6.568l5.545-3.284L10 7.816z" />
        </svg>
      ),
      href: "https://www.youtube.com/@RaskaMon1",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://www.linkedin.com/company/raskamon/",
    },
    {
      name: "Instagram",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.354 2.618 6.782 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.782-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      href: "https://www.instagram.com/raskamon1/",
    },
    {
      name: "Facebook",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "https://www.facebook.com/raskamon/",
    },
  ];

  return (
    <footer className="relative mt-40 overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-white/5 backdrop-blur-sm border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 text-white shadow-lg"
                  >
                    {stat.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-purple-200 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center mb-6">
                <img
                  src="raskamonLogo2.jpg"
                  alt="Raska Mon Logo"
                  className="h-[4rem] w-auto transition-all duration-300"
                />
              </div>
              <p className="text-purple-200 leading-relaxed mb-6">
                Your trusted partner in mental healthcare. We connect you with
                top professionals for a seamless healing journey towards better
                mental wellness.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <ArrowRight className="mr-2 text-pink-400" size={20} />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-200 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          size={14}
                        />
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          navigate(link.path);
                          window.scrollTo(0, 0);
                        }}
                        className="text-purple-200 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          size={14}
                        />
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Heart className="mr-2 text-pink-400" size={20} />
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <button
                      onClick={() => {
                        navigate(service.path);
                        window.scrollTo(0, 0);
                      }}
                      className="text-purple-200 hover:text-pink-400 transition-colors duration-300 cursor-pointer"
                    >
                      {service.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Mail className="mr-2 text-pink-400" size={20} />
                Contact Us
              </h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group"
                >
                  <Phone
                    className="mt-1 text-pink-400 group-hover:scale-110 transition-transform duration-300"
                    size={18}
                  />
                  <span className="text-purple-200">+91-9452-155-154</span>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group"
                >
                  <Mail
                    className="mt-1 text-pink-400 group-hover:scale-110 transition-transform duration-300"
                    size={18}
                  />
                  <a
                    href="mailto:tusharwork.001@gmail.com"
                    className="text-purple-200 hover:text-pink-400 transition-colors duration-300"
                  >
                    moodmantrateam@gmail.com
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group"
                >
                  <Mail
                    className="mt-1 text-pink-400 group-hover:scale-110 transition-transform duration-300"
                    size={18}
                  />
                  <a
                    href="mailto:tusharwork.001@gmail.com"
                    className="text-purple-200 hover:text-pink-400 transition-colors duration-300"
                  >
                    info@moodmantra.com
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group"
                >
                  <MapPin
                    className="mt-1 text-pink-400 group-hover:scale-110 transition-transform duration-300"
                    size={18}
                  />
                  <span className="text-purple-200">
                    Desqworks, Gurgaon,
                    <br />
                    Kanakpura Road, Bangalore
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-white/10 py-8 bg-black/20 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 text-purple-200 text-sm"
              >
                <Copyright size={16} />
                <span>© {currentYear} Raska Mon. All Rights Reserved.</span>
              </motion.p>

              <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                {/* Resources Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate("/resources");
                    window.scrollTo(0, 0);
                  }}
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold text-base shadow-lg hover:bg-white/20 transition-all duration-300"
                >
                  Resources
                </motion.button>

                {/* Admin/Doctor Login Button */}
                {!token && (
                  <NavLink
                    to={import.meta.env.VITE_ADMIN_PANEL_URL}
                    target="_blank"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <WordRotate words={["Doctor"]} />
                      Login
                    </motion.button>
                  </NavLink>
                )}

                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 text-purple-200 text-sm"
                >
                  <Heart className="text-pink-400" size={16} />
                  <span>Made with love for better mental health</span>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
