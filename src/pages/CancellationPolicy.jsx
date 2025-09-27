import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CancellationPolicy = () => {
  const navigate = useNavigate();

  const policyItems = [
    {
      icon: <FaClock className="text-blue-600 text-xl" />,
      title: "24-Hour Cancellation",
      description:
        "Appointments must be cancelled at least 24 hours before the scheduled time to avoid any charges.",
    },
    {
      icon: <FaExclamationTriangle className="text-orange-600 text-xl" />,
      title: "Late Cancellation",
      description:
        "Cancellations made less than 24 hours before the appointment may incur a 50% charge of the session fee.",
    },
    {
      icon: <FaExclamationTriangle className="text-red-600 text-xl" />,
      title: "No-Show Policy",
      description:
        "Failure to attend without prior cancellation will result in a full charge for the session.",
    },
    {
      icon: <FaCheckCircle className="text-green-600 text-xl" />,
      title: "Rescheduling",
      description:
        "You may reschedule your appointment up to 24 hours before the scheduled time at no additional cost.",
    },
  ];

  const emergencyPolicy = [
    "Medical emergencies",
    "Family emergencies",
    " Natural disasters",
    "Technical issues (for online sessions)",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft />
              Back
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-900">
              Cancellation Policy
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Cancellation Policy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand that life can be unpredictable. Our cancellation
              policy is designed to be fair to both our clients and therapists
              while ensuring the best possible care for everyone.
            </p>
          </div>

          {/* Policy Items */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {policyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Exceptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Emergency Exceptions
            </h3>
            <p className="text-gray-700 mb-4">
              We understand that certain situations are beyond your control. The
              following circumstances may qualify for emergency exceptions:
            </p>
            <ul className="space-y-2">
              {emergencyPolicy.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              Please contact us immediately if you experience any of these
              situations, and we'll work with you to reschedule or waive
              cancellation fees.
            </p>
          </motion.div>

          {/* How to Cancel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              How to Cancel or Reschedule
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Online</h4>
                <p className="text-gray-600">
                  Log into your account and go to "My Appointments" to cancel or
                  reschedule your appointment.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Contact Us</h4>
                <p className="text-gray-600">
                  Call our support team at +1 (555) 123-4567 or email us at
                  support@mentalhealth.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Questions About Our Policy?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about our cancellation policy or need to
              discuss special circumstances, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all font-medium"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/my-appointments")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                View My Appointments
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
