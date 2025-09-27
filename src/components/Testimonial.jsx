import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaHeart,
  FaUserCircle,
  FaArrowRight,
  FaCheckCircle,
  FaEdit,
  FaRegSmile,
  FaRegHeart,
  FaRegLightbulb,
  FaRegClock,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getApprovedTestimonials,
  getUserTestimonial,
  deleteTestimonial,
} from "../services/testimonialService.js";
import { useAuth } from "../context/AppContext.jsx";
import TestimonialModal from "./TestimonialModal.jsx";

const Testimonials = () => {
  const { token, userData } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [userTestimonial, setUserTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);

  // Enhanced color gradients for testimonials
  const colorGradients = [
    "from-blue-500 via-blue-600 to-cyan-500",
    "from-purple-500 via-purple-600 to-pink-500",
    "from-green-500 via-green-600 to-emerald-500",
    "from-orange-500 via-orange-600 to-red-500",
    "from-indigo-500 via-indigo-600 to-purple-500",
    "from-teal-500 via-teal-600 to-cyan-500",
    "from-pink-500 via-pink-600 to-rose-500",
    "from-yellow-500 via-yellow-600 to-orange-500",
  ];

  // Enhanced fallback testimonials with more details
  const fallbackTestimonials = [
    {
      quote:
        "Raska Mon helped me find a therapist who truly understands my needs. The personalized matching made all the difference in my healing journey. I feel like I've finally found the support I needed.",
      author: "Sarah K.",
      role: "Patient since 2022",
      rating: 5,
      avatar: "SK",
      color: "from-blue-500 via-blue-600 to-cyan-500",
      category: "Anxiety & Depression",
      sessionCount: "12 sessions",
    },
    {
      quote:
        "The assessment tools gave me insights I never had before about my anxiety patterns. It's like they know exactly what I need. The platform is so intuitive and the therapists are incredibly professional.",
      author: "Michael T.",
      role: "User for 8 months",
      rating: 5,
      avatar: "MT",
      color: "from-purple-500 via-purple-600 to-pink-500",
      category: "Stress Management",
      sessionCount: "8 sessions",
    },
    {
      quote:
        "As a professional, I appreciate how easy Raska Mon makes it to connect with clients. The platform is intuitive and secure. The quality of care and attention to detail is outstanding.",
      author: "Dr. Priya M.",
      role: "Therapist Partner",
      rating: 5,
      avatar: "PM",
      color: "from-green-500 via-green-600 to-emerald-500",
      category: "Professional Partner",
      sessionCount: "2+ years",
    },
    {
      quote:
        "I was skeptical at first, but after just 3 sessions I noticed significant improvement in my mood. The therapists are amazing and the whole experience has been transformative for me.",
      author: "David R.",
      role: "Patient for 3 months",
      rating: 5,
      avatar: "DR",
      color: "from-orange-500 via-orange-600 to-red-500",
      category: "Mood Disorders",
      sessionCount: "6 sessions",
    },
    {
      quote:
        "The matching algorithm is incredible - my therapist is perfectly suited to my personality. I feel truly understood and supported. This platform has changed my life for the better.",
      author: "Emma L.",
      role: "Patient since 2021",
      rating: 5,
      avatar: "EL",
      color: "from-indigo-500 via-indigo-600 to-purple-500",
      category: "Relationship Issues",
      sessionCount: "18 sessions",
    },
    {
      quote:
        "Raska Mon's platform is intuitive and the support team is responsive and caring. They really care about your well-being. The quality of care is exceptional and I highly recommend it.",
      author: "James P.",
      role: "Patient for 1 year",
      rating: 5,
      avatar: "JP",
      color: "from-teal-500 via-teal-600 to-cyan-500",
      category: "Life Transitions",
      sessionCount: "15 sessions",
    },
  ];

  // Fetch testimonials from backend and combine with user's approved testimonial
  const fetchTestimonials = async () => {
    try {
      const data = await getApprovedTestimonials();
      let formattedTestimonials = [];

      if (data && data.length > 0) {
        formattedTestimonials = data.map((testimonial, index) => ({
          ...testimonial,
          avatar: testimonial.author
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
          color: colorGradients[index % colorGradients.length],
          category: testimonial.category || "Mental Health",
          sessionCount: testimonial.sessionCount || "Multiple sessions",
          isUserTestimonial: userData && testimonial.userId === userData._id,
        }));
      } else {
        formattedTestimonials = fallbackTestimonials.map(
          (testimonial, index) => ({
            ...testimonial,
            isUserTestimonial: false,
          })
        );
      }

      // If user has an approved testimonial, ensure it's included in the grid
      if (userTestimonial && userTestimonial.isApproved) {
        const userTestimonialInGrid = formattedTestimonials.find(
          (t) => t.userId === userTestimonial.userId
        );

        if (!userTestimonialInGrid) {
          // Add user's approved testimonial to the grid if not already present
          const userTestimonialFormatted = {
            ...userTestimonial,
            avatar: userTestimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase(),
            color: colorGradients[0],
            category: userTestimonial.category || "Mental Health",
            sessionCount: userTestimonial.sessionCount || "Multiple sessions",
            isUserTestimonial: true,
          };
          formattedTestimonials.unshift(userTestimonialFormatted);
        }
      }

      setTestimonials(formattedTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials(
        fallbackTestimonials.map((testimonial, index) => ({
          ...testimonial,
          isUserTestimonial: false,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user's testimonial if logged in
  const fetchUserTestimonial = async () => {
    if (!token || !userData || !userData._id) {
      setUserTestimonial(null);
      return;
    }

    setIsUserLoading(true);
    try {
      const data = await getUserTestimonial(userData._id, token);
      setUserTestimonial(data);
    } catch (error) {
      if (error.message !== "No testimonial found for this user") {
        console.error("Error fetching user testimonial:", error);
      }
      setUserTestimonial(null);
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [userTestimonial]);

  useEffect(() => {
    fetchUserTestimonial();
  }, [token, userData]);

  const handleShareStory = () => {
    if (!token) {
      toast.error("Please login to share your story");
      return;
    }

    if (!userData || !userData._id) {
      toast.error("User data not available. Please try logging in again.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleEditStory = () => {
    setIsModalOpen(true);
  };

  const handleDeleteStory = async () => {
    if (!userTestimonial || !userData || !userData._id) return;

    if (window.confirm("Are you sure you want to delete your testimonial?")) {
      try {
        await deleteTestimonial(userTestimonial._id, userData._id, token);
        setUserTestimonial(null);
        toast.success("Testimonial deleted successfully");
        // Refresh testimonials to remove from grid
        fetchTestimonials();
      } catch (error) {
        toast.error(error.message || "Failed to delete testimonial");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Refresh user testimonial after modal closes
    fetchUserTestimonial();
  };

  const RatingStars = ({ rating, isWhite = false }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <FaStar
              className={`w-4 h-4 ${
                i < rating
                  ? isWhite
                    ? "text-yellow-300"
                    : "text-yellow-400"
                  : isWhite
                  ? "text-white/40"
                  : "text-gray-300"
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const stats = [
    { number: "500+", label: "Happy Clients", icon: <FaRegSmile /> },
    { number: "98%", label: "Satisfaction Rate", icon: <FaRegHeart /> },
    { number: "50+", label: "Expert Therapists", icon: <FaUserCircle /> },
    { number: "24/7", label: "Support Available", icon: <FaRegClock /> },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-white via-purple-50 to-indigo-100 relative overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background decorative elements */}
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
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        style={{ zIndex: 20 }}
      >
        {/* Header */}
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
            className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8 border border-purple-100"
          >
            <FaHeart className="text-pink-500 text-xl mr-3" />
            <span className="text-purple-800 font-semibold">
              Client Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Voices of{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Trust
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from people who've transformed their mental health journey with
            Raska Mon
          </p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="text-purple-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modern Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-[420px] flex flex-col">
                {/* User Action Buttons - Only show for user's own testimonial */}
                {testimonial.isUserTestimonial && (
                  <div className="absolute top-3 right-3 flex gap-2 z-50">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEditStory}
                      className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
                      title="Edit your testimonial"
                    >
                      <FaEdit className="text-xs" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDeleteStory}
                      className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
                      title="Delete your testimonial"
                    >
                      <FaTrash className="text-xs" />
                    </motion.button>
                  </div>
                )}

                {/* Header with gradient background */}
                <div
                  className={`bg-gradient-to-r ${testimonial.color} p-6 text-white relative flex-shrink-0 min-h-[140px]`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />

                  <div className="relative z-10">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        {testimonial.category}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                      <RatingStars rating={testimonial.rating} isWhite={true} />
                    </div>

                    {/* Quote Icon */}
                    <div className="mb-4">
                      <FaQuoteLeft className="text-2xl text-white/80" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Quote */}
                  <div className="flex-1 mb-4">
                    <p
                      className="text-gray-700 text-base leading-relaxed font-medium line-clamp-4"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Session Info */}
                  <div className="mb-4 text-sm text-gray-500 font-medium flex items-center flex-shrink-0">
                    <FaRegClock className="mr-2" />
                    {testimonial.sessionCount} completed
                  </div>

                  {/* Author Section */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-purple-500 to-pink-500">
                        {testimonial.avatar ? (
                          <span>
                            {String(testimonial.avatar).toUpperCase()}
                          </span>
                        ) : (
                          <FaUserCircle className="text-white text-xl" />
                        )}
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {isUserLoading ? (
            // Enhanced Loading state
            <div className="flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 max-w-md mx-auto">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600 font-medium">
                Loading your story...
              </span>
            </div>
          ) : userTestimonial && !userTestimonial.isApproved ? (
            // Show pending testimonial status
            <div className="space-y-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 max-w-3xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full -translate-y-16 translate-x-16 opacity-50" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <FaHeart className="text-pink-500 mr-2" />
                      Your Story (Pending Review)
                    </h3>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditStory}
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDeleteStory}
                        className="inline-flex items-center bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <RatingStars rating={userTestimonial.rating} />
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{userTestimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${colorGradients[0]} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {userTestimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {userTestimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {userTestimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Status:{" "}
                      <span className="text-yellow-600 font-semibold flex items-center">
                        <FaRegClock className="mr-1" />
                        Under Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : !userTestimonial ? (
            // Enhanced CTA button for users without testimonials
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareStory}
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group"
            >
              <FaHeart className="mr-3 text-xl group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-bold">Share Your Story</span>
              <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          ) : null}
        </motion.div>

        {/* Testimonial Modal */}
        {userData && userData._id && (
          <div className="relative" style={{ zIndex: 100 }}>
            <TestimonialModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              existingTestimonial={userTestimonial}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
