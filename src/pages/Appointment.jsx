import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import {
  CalendarArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Star,
  Clock,
  User,
  MapPin,
  Award,
  GraduationCap,
} from "lucide-react";
import RelatedDoctor from "../components/RelatedDoctor";
import AppointmentForm from "../components/AppointmentForm";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaArrowRight,
  FaUserMd,
  FaShieldAlt,
  FaBrain,
  FaVideo,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const progressRef = useRef(null);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && videoContainerRef.current) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getAvailableSlots = async (date = new Date()) => {
    if (!docInfo) return;

    let updatedSlots = [];
    let currentDate = new Date(date);

    // Reset time to beginning of day
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      let dayDate = new Date(currentDate);
      dayDate.setDate(currentDate.getDate() + i);

      let endTime = new Date(dayDate);
      endTime.setHours(21, 0, 0, 0);

      // Set starting time (10:00 AM or current time if today)
      let startTime = new Date(dayDate);
      if (i === 0 && isToday(dayDate)) {
        const now = new Date();
        startTime.setHours(now.getHours() > 10 ? now.getHours() + 1 : 10);
        startTime.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      let day = startTime.getDate().toString().padStart(2, "0");
      let month = (startTime.getMonth() + 1).toString().padStart(2, "0");
      let year = startTime.getFullYear();
      const slotDate = day + "/" + month + "/" + year;

      // Get real-time slot availability for this date
      let unavailableSlots = [];
      try {
        const encodedDate = encodeURIComponent(slotDate);
        const response = await axios.get(
          `${backendUrl}/api/user/slot-availability/${docInfo._id}/${encodedDate}`
        );
        if (response.data.success) {
          unavailableSlots = response.data.unavailableSlots;
        }
      } catch (error) {
        console.log("Error fetching slot availability:", error);
        // Fallback to doctor's booked slots if API fails
        unavailableSlots = docInfo?.slots_booked?.[slotDate] || [];
      }

      let timeSlots = [];

      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotTime = formattedTime;

        const isSlotUnavailable = unavailableSlots.includes(slotTime);

        if (!isSlotUnavailable) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: slotTime,
          });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      updatedSlots.push(timeSlots);
    }

    setDocSlots(updatedSlots);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const bookAppointment = () => {
    if (!token) {
      toast.warning("Login to book an appointment.");
      window.scrollTo(0, 0);
      return navigate("/login");
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    setShowAppointmentForm(true);
  };

  const handleAppointmentSuccess = () => {
    getDoctorsData();
    // Refresh slot availability after successful booking
    getAvailableSlots(selectedDate);
    navigate("/my-appointments");
    window.scrollTo(0, 0);
  };

  // Calendar functions
  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const today = new Date();
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="h-10 flex items-center justify-center text-gray-400"
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      const isDisabled =
        dayDate <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <div
          key={`current-${i}`}
          onClick={() => !isDisabled && handleDateSelect(dayDate)}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors
            ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : selectedDate.getDate() === i &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                : "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-indigo-500/10"
            }`}
        >
          {i}
        </div>
      );
    }

    // Next month days to fill the grid
    const totalDays = days.length;
    const remainingCells = 42 - totalDays; // 6 rows x 7 columns

    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="h-10 flex items-center justify-center text-gray-400"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    getAvailableSlots(date);
  };

  const changeMonth = (increment) => {
    if (increment === 1) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Refresh slot availability every 30 seconds to catch real-time changes
  useEffect(() => {
    if (docInfo) {
      const interval = setInterval(() => {
        getAvailableSlots(selectedDate);
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [docInfo, selectedDate]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    docInfo && (
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
            className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
        </div>

        <div className="relative z-10">
          {/* Hero Section with Video */}
          <section className="relative overflow-hidden py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Book Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Appointment
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Connect with {docInfo.name} for personalized mental health
                  care
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto mb-16"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black">
                  {docInfo.video ? (
                    <>
                      <video
                        ref={videoRef}
                        src={docInfo.video}
                        className="w-full h-full object-cover"
                        poster={docInfo.image}
                        onClick={togglePlay}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleTimeUpdate}
                        muted={isMuted}
                      />

                      {!isPlaying && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                          onClick={togglePlay}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl"
                          >
                            <Play className="text-white ml-2" size={40} />
                          </motion.div>
                        </div>
                      )}

                      <div
                        className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                          !isPlaying
                            ? "opacity-100"
                            : "opacity-0 hover:opacity-100"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                              {docInfo.name}
                            </h2>
                            <p className="text-lg text-white/80">
                              {docInfo.speciality}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={togglePlay}
                              className="text-white hover:text-purple-300 transition-colors"
                            >
                              {isPlaying ? (
                                <Pause size={28} />
                              ) : (
                                <Play size={28} />
                              )}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={toggleMute}
                              className="text-white hover:text-purple-300 transition-colors"
                            >
                              {isMuted ? (
                                <VolumeX size={28} />
                              ) : (
                                <Volume2 size={28} />
                              )}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={toggleFullscreen}
                              className="text-white hover:text-purple-300 transition-colors"
                            >
                              <Maximize2 size={28} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
                      <img
                        src={docInfo.image}
                        alt={docInfo.name}
                        className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Doctor Details Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Doctor Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h2 className="text-3xl font-bold text-gray-900">
                            {docInfo.name}
                          </h2>
                          <img
                            className="w-6"
                            src={assets.verified_icon}
                            alt="verified"
                          />
                        </div>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          {docInfo.about}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 px-4 py-2 rounded-full border border-purple-200">
                        <Star className="text-purple-600" size={20} />
                        <span className="font-semibold text-purple-600">
                          {docInfo.rating || "4.9"}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <Clock className="text-white" size={24} />
                          </div>
                          <h3 className="font-semibold text-gray-800">
                            Experience
                          </h3>
                        </div>
                        <p className="text-gray-600 font-medium">
                          {docInfo.experience} years
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <User className="text-white" size={24} />
                          </div>
                          <h3 className="font-semibold text-gray-800">
                            Patients
                          </h3>
                        </div>
                        <p className="text-gray-600 font-medium">
                          {docInfo.patients || "500+"}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Specializations
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                          {docInfo.speciality}
                        </span>
                        {docInfo.languages &&
                          docInfo.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-sm font-medium border border-gray-200"
                            >
                              {lang}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Consultation Fee
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          {currencySymbol}
                          {docInfo.fees}
                        </p>
                        <span className="text-gray-500">per session</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 h-fit sticky top-6">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                        <FaClock className="text-white text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Availability
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                        <FaClock className="text-purple-600 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Average wait time
                          </p>
                          <p className="font-semibold text-gray-800">
                            15-30 minutes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                        <FaCalendarAlt className="text-purple-600 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Consultation hours
                          </p>
                          <p className="font-semibold text-gray-800">
                            10:00 AM - 9:00 PM
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                        <FaShieldAlt className="text-purple-600 text-xl" />
                        <div>
                          <p className="text-sm text-gray-500">Response time</p>
                          <p className="font-semibold text-gray-800">
                            Within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20"
              >
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                      <CalendarArrowDown className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Book Your Appointment
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Choose your preferred date and time for a personalized
                    consultation
                  </p>
                </div>

                {/* Date Selection */}
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Select Date
                  </h3>

                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {/* Calendar icon button as first item */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`flex flex-col items-center justify-center py-4 px-6 min-w-28 rounded-2xl transition-all shadow-lg ${
                        showCalendar
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <CalendarArrowDown size={28} className="mb-2" />
                      <span className="text-sm font-medium">Calendar</span>
                    </motion.button>

                    {/* Date pills */}
                    {docSlots.map((item, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSlotIndex(index);
                          setShowCalendar(false);
                        }}
                        className={`flex flex-col items-center py-4 px-6 min-w-28 rounded-2xl transition-all shadow-lg ${
                          slotIndex === index
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <span className="font-semibold text-sm">
                          {item[0]?.datetime
                            .toLocaleDateString("en-US", { weekday: "short" })
                            .toUpperCase()}
                        </span>
                        <span className="text-2xl font-bold">
                          {item[0]?.datetime.getDate()}
                        </span>
                        <span className="text-xs opacity-80">
                          {item[0]?.datetime.toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => changeMonth(-1)}
                            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <ChevronLeft
                              className="text-purple-600"
                              size={24}
                            />
                          </motion.button>
                          <h4 className="font-bold text-gray-800 text-xl">
                            {months[currentMonth]} {currentYear}
                          </h4>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => changeMonth(1)}
                            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <ChevronRight
                              className="text-purple-600"
                              size={24}
                            />
                          </motion.button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {[
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                          ].map((day) => (
                            <div
                              key={day}
                              className="text-center text-sm font-semibold text-gray-500 py-2"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                          {renderCalendarDays()}
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCalendar(false)}
                            className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCalendar(false)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                          >
                            Select
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Time Selection */}
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Select Time
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {docSlots[slotIndex]?.map((item, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSlotTime(item.time)}
                        className={`py-4 px-6 rounded-2xl transition-all text-center font-medium shadow-lg ${
                          item.time === slotTime
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {item.time.toLowerCase()}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Confirm Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={bookAppointment}
                  disabled={!slotTime}
                  className={`w-full py-6 rounded-2xl text-white font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                    !slotTime
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 hover:shadow-2xl"
                  }`}
                >
                  <Check size={24} />
                  Continue to Details
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Related Doctors */}
          <section className="py-16">
            <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
          </section>

          {/* Appointment Form Modal */}
          <AppointmentForm
            isOpen={showAppointmentForm}
            onClose={() => {
              setShowAppointmentForm(false);
              // Refresh slot availability when form is closed
              getAvailableSlots(selectedDate);
            }}
            docInfo={docInfo}
            selectedDate={docSlots[slotIndex]?.[0]?.datetime || new Date()}
            selectedTime={slotTime}
            onSuccess={handleAppointmentSuccess}
          />
        </div>
      </div>
    )
  );
};

export default Appointment;
