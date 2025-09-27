import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaCalendarAlt, 
  FaUserMd, 
  FaClipboardCheck,
  FaArrowRight,
  FaPlay,
  FaHeart,
  FaExclamationTriangle
} from 'react-icons/fa';
import { motion } from "framer-motion";
import BookAppointmentCTA from '../components/BookAppointment';

const Contact = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const handleAssessmentClick = () => {
    if (!token) {
      navigate('/login?type=login');
    } else {
      navigate('/assessments');
    }
  };

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
                <FaMapMarkerAlt className="text-purple-500 text-xl mr-3" />
              </motion.div>
              <span className="text-purple-800 font-semibold">We're Here For You</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Contact{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mood Mantra
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Reach out to our compassionate team - we're here to support your mental wellness journey every step of the way.
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
                Send Message
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
                <FaPlay className="text-sm" />
                Call Now
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

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col lg:flex-row gap-12"
        >
          {/* Left Column - Contact Form & Image */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Form */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
            >
              <div className="h-3 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mr-4 flex-shrink-0">
                    <FaEnvelope className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Send Us a Message</h3>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <select 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Select a subject</option>
                      <option value="therapy">Therapy Inquiry</option>
                      <option value="appointment">Appointment Booking</option>
                      <option value="emergency">Emergency Support</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Location Image */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                className="w-full h-auto"
                src={assets.contact_image}
                alt="Supportive therapist talking to client"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-3">Our Healing Space</h3>
                  <p className="opacity-90 text-lg">A welcoming environment designed for your comfort and peace</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Info Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100"
            >
              <div className="h-3 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Office</h3>
                </div>
                
                <p className="text-gray-600 mb-8 text-lg">
                  50709 Wilims Station, <br />
                  Suite 350, Washington, USA
                </p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>
                
                <div className="flex items-center mb-8">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mr-4 flex-shrink-0">
                    <FaPhone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Contact Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl mr-4">
                      <FaPhone className="text-purple-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-lg">General Inquiries</p>
                      <p className="text-gray-600 text-lg">(415) 555-0132</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl mr-4">
                      <FaEnvelope className="text-purple-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-lg">Email</p>
                      <p className="text-gray-600 text-lg">support@moodmantra.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-red-100 to-pink-100 p-4 rounded-xl mr-4">
                      <FaPhone className="text-red-500 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-lg">Emergency Support</p>
                      <p className="text-gray-600 text-lg">(415) 555-0199</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-amber-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
            >
              <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 mr-4 flex-shrink-0">
                    <FaClock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Office Hours</h3>
                </div>
                
                <ul className="space-y-6">
                  <li className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="font-medium text-gray-700 text-lg">Monday - Friday</span>
                    <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="font-medium text-gray-700 text-lg">Saturday</span>
                    <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center py-4">
                    <span className="font-medium text-gray-700 text-lg">Sunday</span>
                    <span className="bg-gradient-to-r from-red-100 to-pink-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Emergency Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm mr-4">
                    <FaExclamationTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Need Immediate Help?</h3>
                </div>
                <p className="mb-6 opacity-90 text-lg">
                  If you're in crisis or experiencing suicidal thoughts, please contact emergency services immediately.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Emergency Contacts
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <div className="mt-20">
          <BookAppointmentCTA />
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

export default Contact;