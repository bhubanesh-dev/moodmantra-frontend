import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserMd,
  FaCreditCard,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaStar,
} from "react-icons/fa";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [animatedAppointments, setAnimatedAppointments] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState({});
  const [loadingCancel, setLoadingCancel] = useState({});

  const navigate = useNavigate();

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("/");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  // loader progress simulation
  const simulateProgress = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  };

  const getUserAppointments = async () => {
    try {
      setIsLoading(true);
      const progressInterval = simulateProgress();

      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setLoadingProgress(100);
        // Filter out appointments that are neither paid nor cancelled
        const validAppointments = data.appointments.filter(
          (appt) => appt.payment || appt.cancelled
        );
        setAppointments(validAppointments.reverse());
      }
      clearInterval(progressInterval);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 500);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setLoadingCancel((prev) => ({ ...prev, [appointmentId]: true }));
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoadingCancel((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  const initPay = (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        } finally {
          setLoadingPayment((prev) => ({ ...prev, [appointmentId]: false }));
        }
      },
      modal: {
        ondismiss: function () {
          cancelAppointment(appointmentId);
          toast.info("Payment cancelled - Appointment has been cancelled");
        },
      },
      prefill: {
        name: "Patient Name",
        email: "patient@example.com",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      cancelAppointment(appointmentId);
      toast.error("Payment failed - Appointment has been cancelled");
      setLoadingPayment((prev) => ({ ...prev, [appointmentId]: false }));
    });
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    setLoadingPayment((prev) => ({ ...prev, [appointmentId]: true }));
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order, appointmentId);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoadingPayment((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    getUserAppointments();
  }, [token]);

  // ------- Paid Button Welcome Animation Playback Config ----------
  useEffect(() => {
    const savedAnimations = localStorage.getItem("animatedAppointments");
    if (savedAnimations) {
      setAnimatedAppointments(new Set(JSON.parse(savedAnimations)));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "animatedAppointments",
      JSON.stringify([...animatedAppointments])
    );
  }, [animatedAppointments]);

  // show all or less appointments
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const getStatusColor = (appointment) => {
    if (appointment.cancelled) return "from-red-500 to-red-600";
    if (appointment.isCompleted) return "from-green-500 to-green-600";
    return "from-blue-500 to-blue-600"; // Only paid appointments will be shown
  };

  const getStatusText = (appointment) => {
    if (appointment.cancelled) return "Cancelled";
    if (appointment.isCompleted) return "Completed";
    return "Paid"; // Only paid appointments will be shown
  };

  const getStatusIcon = (appointment) => {
    if (appointment.cancelled) return <FaTimes />;
    if (appointment.isCompleted) return <FaCheckCircle />;
    return <FaCheckCircle />; // For paid appointments
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
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
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaCalendarAlt className="text-purple-500 text-xl mr-3" />
            </motion.div>
            <span className="text-purple-800 font-semibold">
              Your Appointments
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Manage Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Appointments
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            View your confirmed and completed appointments
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <div className="w-full">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center min-h-[400px] flex-col"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100">
                <ProgressBar progress={loadingProgress} />
                <p className="text-center text-gray-600 mt-4">
                  Loading your appointments...
                </p>
              </div>
            </motion.div>
          ) : appointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-purple-100 max-w-md mx-auto">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaCalendarAlt className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Appointments Found
                </h3>
                <p className="text-gray-600 mb-8">
                  You don't have any confirmed appointments yet. Book an
                  appointment to get started!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/doctors")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book an Appointment
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid gap-6">
                {(showAll ? appointments : appointments.slice(0, 4)).map(
                  (item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex flex-col lg:flex-row gap-8">
                          {/* Doctor Profile Section */}
                          <div className="flex-shrink-0">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="relative"
                            >
                              <img
                                className="w-48 h-48 object-cover rounded-2xl shadow-lg border-4 border-white"
                                draggable="false"
                                src={item.docData.image}
                                alt="doctor photo"
                              />
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <FaStar className="text-white text-sm" />
                              </div>
                            </motion.div>
                          </div>

                          {/* Appointment Details */}
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Doctor Info */}
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {item.docData.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-purple-600 font-semibold">
                                    <FaUserMd className="text-lg" />
                                    <span>{item.docData.speciality}</span>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 text-gray-600">
                                    <FaMapMarkerAlt className="text-purple-500" />
                                    <div>
                                      <p className="font-medium">
                                        {item.docData.address.line1}
                                      </p>
                                      <p className="text-sm">
                                        {item.docData.address.line2}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 text-gray-600">
                                    <FaCalendarAlt className="text-purple-500" />
                                    <span className="font-medium">
                                      {slotDateFormat(item.slotDate)}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3 text-gray-600">
                                    <FaClock className="text-purple-500" />
                                    <span className="font-medium">
                                      {item.slotTime}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Additional Details */}
                              <div className="space-y-4">
                                {item.reasonForVisit && (
                                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                    <h4 className="font-semibold text-purple-800 mb-2">
                                      Reason for Visit
                                    </h4>
                                    <p className="text-gray-700">
                                      {item.reasonForVisit}
                                    </p>
                                  </div>
                                )}

                                {item.sessionType && (
                                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <h4 className="font-semibold text-blue-800 mb-2">
                                      Session Details
                                    </h4>
                                    <p className="text-gray-700">
                                      {item.sessionType}
                                      {item.communicationMethod && (
                                        <span className="text-blue-600">
                                          {" "}
                                          • {item.communicationMethod}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                )}

                                {item.briefNotes && (
                                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <h4 className="font-semibold text-green-800 mb-2">
                                      Notes
                                    </h4>
                                    <p className="text-gray-700">
                                      {item.briefNotes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Status and Actions */}
                          <div className="flex flex-col gap-4 items-center justify-center">
  {/* Status Badge - Only show Cancelled or Completed */}
  <div className={`${
    item.cancelled
      ? "bg-red-100 text-red-800 border border-red-200"
      : item.isCompleted
      ? "bg-green-100 text-green-800 border border-green-200"
      : "hidden" // Hide for paid but not completed appointments
  } px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}>
    {item.cancelled ? (
      <FaTimes className="text-red-600" />
    ) : (
      <FaCheckCircle className="text-green-600" />
    )}
    {item.cancelled ? "Cancelled" : "Completed"}
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col gap-3 w-full max-w-xs">
    {/* Payment Confirmed Button - shown for paid but not completed appointments */}
    {!item.cancelled && item.payment && !item.isCompleted && (
      <motion.button
        className="text-sm w-full px-4 py-3 border border-green-300 rounded-xl cursor-not-allowed bg-green-50 text-green-700 font-semibold flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
      >
        <FaCheckCircle className="text-green-500" />
        Paid
      </motion.button>
    )}

    {/* Cancel Appointment Button */}
    {!item.cancelled && !item.isCompleted && (
      <motion.button
        onClick={() => cancelAppointment(item._id)}
        className={`text-sm text-center w-full px-4 py-3 rounded-xl transition-all duration-200 ease-in-out font-semibold ${
          loadingCancel[item._id]
            ? "bg-gray-100 text-gray-500 cursor-not-allowed flex items-center justify-center gap-3"
            : "bg-white text-red-600 border border-red-300 hover:bg-red-600 hover:text-white hover:border-transparent"
        }`}
        disabled={loadingCancel[item._id]}
        whileHover={!loadingCancel[item._id] ? { scale: 1.02 } : {}}
        whileTap={!loadingCancel[item._id] ? { scale: 0.98 } : {}}
      >
        {loadingCancel[item._id] ? (
          <>
            <FaSpinner className="animate-spin" />
            Cancelling...
          </>
        ) : (
          <>
            <FaTimes className="inline mr-2" />
            Cancel Appointment
          </>
        )}
      </motion.button>
    )}
  </div>
</div>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>

              {/* Show All/Less Button */}
              {appointments.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="w-full flex justify-center mt-8"
                >
                  <motion.button
                    onClick={toggleShowAll}
                    className="bg-white/80 backdrop-blur-sm hover:bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl border border-purple-100 transition-all duration-300 flex items-center gap-3"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showAll ? (
                      <>
                        <FaChevronUp />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FaChevronDown />
                        Show All ({appointments.length} appointments)
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-purple-500/25 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/doctors")}
      >
        <FaHeart className="text-xl" />
      </motion.button>
    </div>
  );
};

export default MyAppointments;
