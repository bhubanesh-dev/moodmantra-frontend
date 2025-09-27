import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaStar,
  FaCalendarAlt,
  FaRupeeSign,
  FaHeart,
  FaGlobe,
  FaMobileAlt,
  FaShieldAlt,
  FaChartLine,
  FaHandsHelping,
  FaLeaf,
  FaBalanceScale,
  FaLightbulb,
  FaCheckCircle,
  FaArrowRight,
  FaBrain,
  FaUsers,
  FaClock,
  FaQuoteLeft,
  FaAward,
} from "react-icons/fa";
import { GiMeditation, GiBrain, GiHealthNormal } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BookAppointmentCTA from "../components/BookAppointment";

const OurTeam = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Stats data
  const stats = [
    {
      value: "5000+",
      label: "Patients Helped",
      icon: <FaHeart className="text-2xl" />,
    },
    {
      value: "100+",
      label: "Years Combined",
      icon: <FaCalendarAlt className="text-2xl" />,
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      icon: <FaStar className="text-2xl" />,
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: <FaShieldAlt className="text-2xl" />,
    },
  ];

  const approachFeatures = [
    {
      icon: <GiBrain className="text-2xl" />,
      title: "Evidence-Based Therapies",
      description:
        "We utilize scientifically validated treatment methods tailored to each individual's needs.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaUserMd className="text-2xl" />,
      title: "Personalized Care",
      description:
        "Every treatment plan is customized to address your unique circumstances and goals.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <GiHealthNormal className="text-2xl" />,
      title: "Holistic Healing",
      description:
        "Addressing mind, body, and spirit for comprehensive mental wellness.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const coreValues = [
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "Compassion",
      description: "Meeting every client with empathy",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaBalanceScale className="text-2xl" />,
      title: "Integrity",
      description: "Ethical practice in all our interactions",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Innovation",
      description: "Continually evolving our therapeutic approaches",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FaGlobe className="text-2xl" />,
      title: "Accessibility",
      description: "Breaking down barriers to mental healthcare",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8 border border-purple-100"
            >
              <RiTeamFill className="text-purple-600 text-xl mr-3" />
              <span className="text-purple-800 font-semibold">
                Meet Our Team
              </span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Compassionate Team
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Our dedicated professionals bring together decades of experience,
              cutting-edge knowledge, and a patient-centered approach to provide
              the best possible care for your mental health needs.
            </p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 text-center"
                >
                  <div className="text-purple-600 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-purple-100 px-6 py-3 rounded-full mb-8 shadow-lg"
            >
              <FaHandsHelping className="text-amber-600 text-xl mr-3" />
              <span className="text-purple-800 font-semibold">
                Our Therapeutic Approach
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Approach
              </span>{" "}
              to Healing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine evidence-based practices with personalized care to
              create transformative healing experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 h-full text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Expert Practitioners
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of our professionals brings unique expertise and a shared
              commitment to your mental well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                key={doctor._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="text-center p-6">
                  <div className="relative mb-8">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <img
                        className="w-full h-full object-cover"
                        src={doctor.image}
                        alt={doctor.name}
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <FaCheckCircle className="text-white text-xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {doctor.name}
                  </h3>
                  <p className="text-purple-600 font-medium text-base">
                    {doctor.specialization}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30"
            >
              <FaAward className="text-yellow-300 text-xl mr-3" />
              <span className="text-white font-semibold">Our Core Values</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What <span className="text-yellow-300">Drives</span> Us
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              These principles guide every interaction with our patients and
              team members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-purple-100 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookAppointmentCTA />
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
