import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserMd,
  FaVideo,
  FaArrowRight,
  FaHeart,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const BookAppointmentCTA = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const handleAssessmentClick = () => {
    if (!token) {
      navigate("/login?type=login");
    } else {
      navigate("/assessments");
    }
  };

  const features = [
    {
      icon: <FaUserMd className="text-2xl" />,
      title: "Expert Therapists",
      desc: "Licensed professionals with specialized training",
    },
    {
      icon: <FaVideo className="text-2xl" />,
      title: "Virtual Sessions",
      desc: "Secure video consultations from anywhere",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Flexible Scheduling",
      desc: "Book sessions at your convenience",
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "100% Confidential",
      desc: "Your privacy is our top priority",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 relative overflow-hidden shadow-2xl"
        >
          {/* Background Elements */}
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
              className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"
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
              className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full"
            />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30"
              >
                <FaHeart className="text-white text-xl mr-3" />
                <span className="text-white font-semibold">
                  Start Your Healing Journey
                </span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Begin Your{" "}
                <span className="text-yellow-300">Healing Journey</span>?
              </h2>

              <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Our compassionate team of licensed therapists is here to support
                you every step of the way. Take the first step towards better
                mental health today.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-100 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={() => navigate("/doctors")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                <FaCalendarAlt className="group-hover:scale-110 transition-transform" />
                Book an Appointment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={handleAssessmentClick}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 transition-all duration-300 flex items-center gap-2"
              >
                Take Assessment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-purple-100 text-sm mb-4">
                Trusted by 500+ clients • 98% satisfaction rate • 24/7 support
              </p>
              <div className="flex justify-center items-center gap-8 text-purple-100">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-300" />
                  <span className="text-sm">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserMd className="text-green-300" />
                  <span className="text-sm">Licensed Therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaVideo className="text-green-300" />
                  <span className="text-sm">Secure Video Calls</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookAppointmentCTA;
