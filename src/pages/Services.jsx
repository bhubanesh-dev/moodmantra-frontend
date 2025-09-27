import React, { useContext } from "react";
import {
  FaComments,
  FaClock,
  FaClinicMedical,
  FaUsers,
  FaHeart,
  FaLeaf,
  FaHandHoldingHeart,
  FaRegSmile,
  FaBrain,
  FaBalanceScale,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaUserMd,
  FaVideo,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { GiMeditation, GiHealthNormal, GiSpellBook } from "react-icons/gi";
import { RiMentalHealthLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BookAppointmentCTA from "../components/BookAppointment";

const Services = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const handleAssessmentClick = () => {
    if (!token) {
      navigate("/login?type=login");
    } else {
      navigate("/assessments");
    }
  };

  const services = [
    {
      icon: <FaComments className="text-2xl" />,
      title: "Talk Therapy & Counseling",
      description:
        "Personalized one-on-one sessions with licensed therapists to address emotional challenges, life transitions, and personal growth.",
      benefits: [
        "Evidence-based approaches (CBT, DBT, Psychodynamic)",
        "Confidential environment to explore feelings",
        "Personalized treatment plans",
        "Weekly or bi-weekly sessions",
      ],
      whoItsFor:
        "Ideal for individuals dealing with depression, life transitions, self-esteem issues, or those seeking personal development",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "24/7 Online Therapy Support",
      description:
        "Immediate access to professional help through secure video, chat, or phone sessions whenever you need it.",
      benefits: [
        "No waiting lists or scheduling conflicts",
        "Therapy from the comfort of your home",
        "Emergency sessions available",
        "Same quality as in-person therapy",
      ],
      whoItsFor:
        "Perfect for busy professionals, students, parents, or anyone needing flexible access to mental health support",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaClinicMedical className="text-2xl" />,
      title: "Offline Counseling Centers",
      description:
        "Traditional face-to-face therapy in our calming, professionally designed centers across major cities.",
      benefits: [
        "Private, comfortable therapy rooms",
        "In-person connection with your therapist",
        "Access to therapeutic tools and resources",
        "Discreet locations for complete privacy",
      ],
      whoItsFor:
        "Those who prefer in-person interaction or need a dedicated space away from their daily environment",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Group Therapy & Workshops",
      description:
        "Healing in community with others who share similar experiences, guided by expert facilitators.",
      benefits: [
        "Reduced cost compared to individual therapy",
        "Shared experiences and peer support",
        "Specialized groups (grief, addiction, parenting)",
        "Monthly workshops on mindfulness and coping skills",
      ],
      whoItsFor:
        "Individuals who benefit from community support or want to supplement their individual therapy",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Couples & Relationship Counseling",
      description:
        "Expert guidance to improve communication, resolve conflicts, and strengthen emotional connections.",
      benefits: [
        "Pre-marital counseling available",
        "Conflict resolution strategies",
        "Intimacy and trust rebuilding",
        "Parenting partnership guidance",
      ],
      whoItsFor:
        "Couples at any stage - dating, engaged, married, or considering separation",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <GiMeditation className="text-2xl" />,
      title: "Stress & Anxiety Management",
      description:
        "Proven techniques to reduce anxiety, manage stress, and cultivate emotional resilience.",
      benefits: [
        "Mindfulness and meditation training",
        "Breathing and relaxation techniques",
        "Cognitive restructuring methods",
        "Personalized stress reduction plans",
      ],
      whoItsFor:
        "Anyone experiencing work stress, panic attacks, social anxiety, or general overwhelm",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const approachSteps = [
    {
      step: 1,
      title: "Initial Assessment",
      description:
        "We begin with a comprehensive evaluation to understand your unique needs and goals.",
      icon: <FaUserMd className="text-xl" />,
    },
    {
      step: 2,
      title: "Personalized Matching",
      description:
        "Our algorithm matches you with the ideal therapist based on your preferences and needs.",
      icon: <FaHeart className="text-xl" />,
    },
    {
      step: 3,
      title: "Treatment Plan",
      description:
        "Your therapist creates a customized roadmap for your healing journey.",
      icon: <FaChartLine className="text-xl" />,
    },
    {
      step: 4,
      title: "Ongoing Support",
      description:
        "Regular sessions and check-ins to ensure continuous progress and adjustment.",
      icon: <FaShieldAlt className="text-xl" />,
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: <FaRegSmile /> },
    { number: "98%", label: "Satisfaction Rate", icon: <FaStar /> },
    { number: "50+", label: "Expert Therapists", icon: <FaUserMd /> },
    { number: "24/7", label: "Support Available", icon: <FaClock /> },
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
              <FaHeart className="text-pink-500 text-xl mr-3" />
              <span className="text-purple-800 font-semibold">
                Our Services
              </span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transformative{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>{" "}
              Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Mood Mantra, we offer a comprehensive range of evidence-based
              therapeutic services tailored to your unique needs. Each program
              is designed by our expert clinicians to provide compassionate,
              effective care.
            </p>
          </motion.div>

          {/* Stats Section */}
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
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              <FaHandHoldingHeart className="text-red-500 text-xl mr-3" />
              <span className="text-purple-800 font-semibold">
                Our Offerings
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Holistic{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Healing Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine clinical excellence with compassionate care to address
              your unique mental health needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="flex items-center text-sm font-semibold mb-3 text-purple-600">
                        <FaChartLine className="mr-2" /> Key Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start text-gray-600"
                          >
                            <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="flex items-center text-sm font-semibold mb-2 text-purple-600">
                        <FaUsers className="mr-2" /> Who It's For:
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.whoItsFor}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden"
          >
            <div className="md:flex">
              <div className="p-8 md:p-12 flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center mb-6"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg mr-4">
                    <FaBrain className="text-xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Unique Approach
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                >
                  At Mood Mantra, we don't believe in one-size-fits-all therapy.
                  Our approach combines:
                </motion.p>

                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-4 text-gray-600"
                >
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">
                        Evidence-Based Practices:
                      </strong>{" "}
                      Clinically proven therapies tailored to your needs
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">
                        Cultural Sensitivity:
                      </strong>{" "}
                      Therapists who understand Indian contexts and values
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">
                        Holistic Perspective:
                      </strong>{" "}
                      Addressing mind, body, and lifestyle factors
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">
                        Measurable Progress:
                      </strong>{" "}
                      Regular check-ins to track your improvement
                    </div>
                  </li>
                </motion.ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 flex-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {approachSteps.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="flex items-start group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
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

export default Services;
