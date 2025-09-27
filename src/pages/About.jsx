import React from "react";
import {
  FaGlobe,
  FaUsers,
  FaMobileAlt,
  FaShieldAlt,
  FaHeart,
  FaChartLine,
  FaHandsHelping,
  FaLeaf,
  FaBalanceScale,
  FaLightbulb,
  FaArrowRight,
  FaPlay,
} from "react-icons/fa";
import { GiMeditation, GiBrain, GiHealthNormal } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { motion } from "framer-motion";
import BookAppointmentCTA from "../components/BookAppointment";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
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
                <FaHeart className="text-pink-500 text-xl mr-3" />
              </motion.div>
              <span className="text-purple-800 font-semibold">
                About Mood Mantra
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Healing Minds,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Transforming Lives
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Mood Mantra is India's most compassionate mental wellness
              platform, making professional therapy accessible, affordable, and
              stigma-free for everyone. We believe in holistic healing that
              nurtures mind, body, and soul.
            </motion.p>

            {/* CTA Buttons */}
           
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <section className="py-20 bg-white">
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
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small counseling center to India's leading mental wellness
              platform
            </p>
          </motion.div>

          <div className="md:flex gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 mb-8 md:mb-0"
            >
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-lg border border-purple-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mr-4">
                    <GiBrain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Our Story
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded in 2020 by psychologist Dr. Priya Sharma and tech
                  entrepreneur Rohan Mehta, Mood Mantra began as a small
                  counseling center in Bangalore. After witnessing the
                  devastating impact of untreated mental health issues in our
                  communities, we set out to create a solution that would break
                  down barriers to care.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Today, we've grown into a national movement with over 200
                  certified therapists, serving more than 75,000 clients across
                  India. Our name "Mood Mantra" reflects our philosophy - that
                  daily mental health practices (mantras) can transform
                  emotional well-being (mood).
                </p>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-l-4 border-purple-500">
                  <p className="text-purple-700 italic font-medium mb-2">
                    "Mental health is not a destination, but a journey of daily
                    practice and self-compassion."
                  </p>
                  <p className="text-gray-600">
                    - Dr. Priya Sharma, Co-Founder
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-8 shadow-lg border border-indigo-100">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      value: "75K+",
                      label: "Lives Impacted",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      value: "200+",
                      label: "Certified Therapists",
                      color: "from-indigo-500 to-blue-500",
                    },
                    {
                      value: "12",
                      label: "Regional Languages",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      value: "96%",
                      label: "Client Satisfaction",
                      color: "from-green-500 to-emerald-500",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-2xl text-center bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                    >
                      <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                      <p className="text-sm font-medium opacity-90">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="py-20">
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
                Mission & Vision
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving change in mental healthcare accessibility and awareness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 shadow-lg border border-amber-100"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 mr-4">
                  <FaChartLine className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                To democratize mental healthcare by removing barriers of cost,
                convenience, and stigma through:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Affordable therapy at 60% lower cost than traditional clinics",
                  "Culturally sensitive care in regional languages",
                  "Preventive mental health education programs",
                  "Corporate partnerships for employee wellness",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <span className="text-amber-500 mr-3 text-lg">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border-l-4 border-amber-500">
                <p className="text-amber-800 italic">
                  "Our goal is to make quality mental healthcare as accessible
                  as a cup of chai."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 shadow-lg border border-emerald-100"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 mr-4">
                  <FaGlobe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We envision an India where mental wellness is prioritized and
                accessible to all:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Where mental health checkups are as routine as physical exams",
                  "Where therapy is covered by insurance providers",
                  "Where workplaces prioritize psychological safety",
                  "Where no one suffers in silence due to stigma",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <span className="text-emerald-500 mr-3 text-lg">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-xl border-l-4 border-emerald-500">
                <p className="text-emerald-800 italic">
                  "We dream of an India where asking for help is seen as
                  strength, not weakness."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6"
            >
              <GiMeditation className="text-purple-600 text-2xl mr-3" />
              <span className="text-purple-800 text-xl font-bold">
                Our Methodology
              </span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Holistic{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Healing Approach
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine evidence-based therapies with traditional wellness
              practices to address mind, body, and spirit for complete
              well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <GiHealthNormal size={24} />,
                title: "Clinical Excellence",
                content:
                  "All therapists trained in CBT, DBT, and trauma-informed care with rigorous quality standards.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <FaUsers size={24} />,
                title: "Cultural Competence",
                content:
                  "Specialized understanding of Indian family dynamics, workplace pressures, and societal expectations.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <FaMobileAlt size={24} />,
                title: "Tech Integration",
                content:
                  "Secure video sessions, mood tracking, and AI-powered therapist matching for optimal care.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <FaLeaf size={24} />,
                title: "Preventive Care",
                content:
                  "Workshops, self-help resources, and community support to maintain mental wellness.",
                color: "from-amber-500 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
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
                Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every
              interaction we have.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: <FaHandsHelping size={20} />,
                    title: "Compassion",
                    description:
                      "We meet every client with empathy and understanding",
                  },
                  {
                    icon: <FaBalanceScale size={20} />,
                    title: "Integrity",
                    description:
                      "Ethical practice and transparency in all we do",
                  },
                  {
                    icon: <FaLightbulb size={20} />,
                    title: "Innovation",
                    description: "Continually evolving to serve better",
                  },
                  {
                    icon: <FaGlobe size={20} />,
                    title: "Accessibility",
                    description: "Breaking down barriers to care",
                  },
                  {
                    icon: <FaChartLine size={20} />,
                    title: "Growth",
                    description: "For our clients, team, and organization",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-purple-100">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <BookAppointmentCTA />
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

export default About;
