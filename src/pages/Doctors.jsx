import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ChevronDown, Star, MapPin, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import {
  FaHeart,
  FaArrowRight,
  FaUserMd,
  FaSearch,
  FaFilter,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter((doc) => doc.speciality === speciality);
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const handleSpecialityClick = (newSpeciality) => {
    setAnimationKey((prev) => prev + 1);

    if (speciality === newSpeciality) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${newSpeciality}`);
    }

    scrollToTop();
  };

  const specialities = [
    "Psychiatrists",
    "Clinical Psychologists",
    "Therapists",
    "Child and Adolescent Psychiatrists",
    "Geriatric Psychiatrists",
    "Addiction Psychiatrists",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
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
            className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
            className="absolute top-40 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8 border border-purple-100"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaUserMd className="text-purple-500 text-xl mr-3" />
              </motion.div>
              <span className="text-purple-800 font-semibold">
                Expert Mental Health Professionals
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {speciality
                ? `${speciality} Specialists`
                : "Our Mental Health Professionals"}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with qualified mental health professionals who can guide
              you on your wellness journey.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Book Appointment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f8fafc",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl border border-purple-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaSearch className="text-sm" />
                Search Doctors
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-24"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
              className="text-white"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
              className="text-white"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
              className="text-white"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <button
                className={`w-full py-4 px-6 flex items-center justify-between gap-2 rounded-2xl text-lg font-semibold transition-all duration-300 lg:hidden ${
                  showFilter
                    ? "bg-white text-purple-700 border border-purple-200 shadow-lg"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl"
                }`}
                onClick={() => setShowFilter((prev) => !prev)}
              >
                <div className="flex items-center gap-2">
                  <FaFilter className="text-lg" />
                  {showFilter ? "Hide Filters" : "Filter by Specialization"}
                </div>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    showFilter ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${showFilter ? "block" : "hidden"} lg:block`}
              >
                <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-3xl shadow-lg border border-purple-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Award size={24} className="text-purple-600" />
                    Specializations
                  </h3>
                  <div className="space-y-4">
                    {specialities.map((spec, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSpecialityClick(spec)}
                        className={`w-full text-left px-6 py-4 rounded-2xl transition-all flex items-center gap-4 ${
                          speciality === spec
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 border border-gray-100 hover:border-purple-200"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            speciality === spec ? "bg-white" : "bg-purple-500"
                          }`}
                        ></div>
                        <span className="font-medium">{spec}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Doctors Grid */}
          <div className="lg:w-3/4">
            {filterDoc.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-12 text-center shadow-lg border border-purple-100"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUserMd className="text-4xl text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    No Doctors Found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any doctors matching your criteria. Please
                    try a different specialization or check back later.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/doctors")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    View All Doctors
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={animationKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filterDoc.map((doctor, index) => (
                  <motion.div
                    key={`${animationKey}-${index}`}
                    whileHover={{ y: -10 }}
                    onClick={() => {
                      navigate(`/appointment/${doctor._id}`);
                      scrollToTop();
                    }}
                    className="bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full border border-purple-100"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={
                          doctor.image ||
                          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        }
                        alt={doctor.name}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                      <div
                        className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm ${
                          doctor.available
                            ? "bg-green-100/90 text-green-800"
                            : "bg-red-100/90 text-red-800"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            doctor.available ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        {doctor.available ? "Available" : "Not Available"}
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-white">
                          <p className="font-semibold">Book Appointment</p>
                          <p className="text-sm opacity-90">
                            Click to schedule a session
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-purple-600 font-semibold text-sm truncate">
                            {doctor.speciality || "General Practitioner"}
                          </p>
                        </div>
                        <div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-xl shrink-0 ml-3">
                          <Star
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="text-yellow-800 font-bold ml-1 text-sm">
                            {doctor.rating || "4.8"}
                          </span>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <MapPin
                            size={16}
                            className="text-purple-500 mr-3 flex-shrink-0"
                          />
                          <span className="truncate text-sm">
                            {doctor.location || "Online & In-person"}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase
                            size={16}
                            className="text-purple-500 mr-3 flex-shrink-0"
                          />
                          <span className="text-sm">
                            {doctor.experience || "5"}+ years experience
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap
                            size={16}
                            className="text-purple-500 mr-3 flex-shrink-0"
                          />
                          <span className="truncate text-sm">
                            {doctor.qualification || "MD, MBBS"}
                          </span>
                        </div>
                      </div>

                      {/* Footer Section */}
                      <div className="mt-auto pt-4 border-t border-purple-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-500 text-sm font-medium">
                            Starting from
                          </span>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-purple-700">
                              ₹{doctor.fees || "500"}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              /consultation
                            </span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                          <FaCalendarAlt className="text-sm" />
                          Book Appointment
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-purple-500/25 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaHeart className="text-xl" />
      </motion.button>
    </div>
  );
};

export default Doctors;
