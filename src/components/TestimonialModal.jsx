import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaTimes, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createTestimonial,
  updateTestimonial,
} from "../services/testimonialService.js";
import { useAuth } from "../context/AppContext.jsx";

const TestimonialModal = ({ isOpen, onClose, existingTestimonial = null }) => {
  const { token, userData } = useAuth();
  const [formData, setFormData] = useState({
    author: "",
    role: "Patient",
    quote: "",
    rating: 5,
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingTestimonial) {
      setFormData({
        author:
          existingTestimonial.author === "Anonymous"
            ? userData?.name || ""
            : existingTestimonial.author,
        role: existingTestimonial.role,
        quote: existingTestimonial.quote,
        rating: existingTestimonial.rating,
        isAnonymous: existingTestimonial.isAnonymous,
      });
    } else if (userData) {
      setFormData((prev) => ({
        ...prev,
        author: userData.name || "",
      }));
    }
  }, [existingTestimonial, userData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to submit a testimonial");
      return;
    }

    if (!userData || !userData._id) {
      toast.error("User data not available. Please try logging in again.");
      return;
    }

    if (!formData.quote.trim()) {
      toast.error("Please write your testimonial");
      return;
    }

    if (formData.quote.length < 20) {
      toast.error("Testimonial must be at least 20 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      const testimonialData = {
        userId: userData._id,
        ...formData,
      };

      if (existingTestimonial) {
        await updateTestimonial(
          existingTestimonial._id,
          testimonialData,
          token
        );
        toast.success(
          "Testimonial updated successfully! It will be reviewed again."
        );
      } else {
        await createTestimonial(testimonialData, token);
        toast.success(
          "Testimonial submitted successfully! It will be reviewed and published soon."
        );
      }

      onClose();
      // Reset form
      setFormData({
        author: userData?.name || "",
        role: "Patient",
        quote: "",
        rating: 5,
        isAnonymous: false,
      });
    } catch (error) {
      toast.error(error.message || "Failed to submit testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const RatingStars = ({ rating, onRatingChange, interactive = true }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange(star)}
            className={`text-2xl transition-colors duration-200 ${
              interactive ? "hover:scale-110" : ""
            } ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            disabled={!interactive}
          >
            <FaStar />
          </button>
        ))}
      </div>
    );
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{ zIndex: 100000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {existingTestimonial ? "Edit Your Story" : "Share Your Story"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rate your experience
                </label>
                <RatingStars
                  rating={formData.rating}
                  onRatingChange={handleRatingChange}
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    disabled={formData.isAnonymous}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      formData.isAnonymous ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Enter your name"
                    required={!formData.isAnonymous}
                  />
                </div>
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="isAnonymous"
                  className="ml-2 text-sm text-gray-700"
                >
                  Submit anonymously
                </label>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Patient">Patient</option>
                  <option value="Family Member">Family Member</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Therapist Partner">Therapist Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Share your experience with Mood Mantra. How has it helped you? What would you like others to know?"
                  required
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.quote.length}/500 characters
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : existingTestimonial
                    ? "Update Story"
                    : "Submit Story"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default TestimonialModal;
