import React, { useContext } from "react";
import {
  FaLeaf,
  FaHeart,
  FaGlobe,
  FaLanguage,
  FaBalanceScale,
  FaHandsHelping,
  FaClock,
  FaUserShield,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { GiBrain, GiMeditation } from "react-icons/gi";
import {
  MdOutlineSelfImprovement,
  MdFamilyRestroom,
  MdWork,
} from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { RiMentalHealthLine, RiTeamLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function CreateAccount() {
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
      icon: <FaLeaf className="text-2xl" />,
      title: "Personalized Care",
      content:
        "Every session is tailored to your unique needs and goals for maximum effectiveness.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Confidential Space",
      content:
        "A safe, non-judgmental place to express yourself freely with complete privacy.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaLanguage className="text-2xl" />,
      title: "Multilingual Support",
      content:
        "Therapy in multiple languages to ensure comfort for diverse clients.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaGlobe className="text-2xl" />,
      title: "Global Reach",
      content:
        "Online counseling accessible from anywhere with flexible scheduling across timezones.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FaBalanceScale className="text-2xl" />,
      title: "Holistic Approach",
      content:
        "Blending modern psychology with mindfulness and wellness techniques.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "Expert Therapists",
      content:
        "Licensed professionals with diverse specialties and years of experience.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Flexible Scheduling",
      content:
        "Book sessions at your convenience, including evenings and weekends.",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: <FaUserShield className="text-2xl" />,
      title: "Secure Platform",
      content:
        "End-to-end encrypted video calls and HIPAA compliant data protection.",
      color: "from-red-500 to-pink-500",
    },
  ];

  const benefits = [
    {
      icon: <GiBrain className="text-xl" />,
      text: "Individuals struggling with stress, anxiety, or depression",
    },
    {
      icon: <IoMdPeople className="text-xl" />,
      text: "Couples looking to improve communication and relationships",
    },
    {
      icon: <MdOutlineSelfImprovement className="text-xl" />,
      text: "Professionals facing burnout or career dilemmas",
    },
    {
      icon: <GiBrain className="text-xl" />,
      text: "Those experiencing grief, trauma, or emotional distress",
    },
    {
      icon: <MdFamilyRestroom className="text-xl" />,
      text: "Families navigating conflicts or parenting challenges",
    },
    {
      icon: <RiTeamLine className="text-xl" />,
      text: "Teams needing workplace mental health support",
    },
    {
      icon: <MdWork className="text-xl" />,
      text: "Students dealing with academic pressure",
    },
    {
      icon: <GiMeditation className="text-xl" />,
      text: "Anyone seeking personal growth and self-discovery",
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
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-purple-100"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-purple-100 px-6 py-3 rounded-full mb-8 shadow-lg"
            >
              <RiMentalHealthLine className="text-purple-600 text-2xl mr-3" />
              <span className="text-purple-800 text-xl font-bold">
                Why Choose Us
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Raska Mon
              </span>{" "}
              Special?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine clinical excellence with compassionate care to create
              transformative mental health experiences.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Who Can Benefit Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 sm:p-10 mb-16 border border-amber-100"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/80 px-6 py-3 rounded-full mb-6 shadow-lg"
              >
                <GiBrain className="text-purple-600 text-2xl mr-3" />
                <span className="text-purple-800 text-xl font-bold">
                  Who Can Benefit?
                </span>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We Support{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Diverse Needs
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our services are designed to help individuals from all walks of
                life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 rounded-2xl p-4 flex items-start gap-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <div className="p-2 rounded-lg bg-purple-100 mt-1">
                    {benefit.icon}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              At Raska Mon, we believe that mental health is a journey, not a
              destination.
              <span className="block font-medium text-purple-600 mt-2 not-italic">
                Take the first step today towards healing and self-discovery.
              </span>
            </motion.p>

            <motion.button
              onClick={handleAssessmentClick}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <FaCheckCircle className="group-hover:scale-110 transition-transform" />
              Get Started Today
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CreateAccount;
