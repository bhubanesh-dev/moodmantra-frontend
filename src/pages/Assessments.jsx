import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Assessments = () => {
  const { userData, backendUrl, token } = useContext(AppContext);
  const location = useLocation();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const therapyType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("therapy") || "individual";
  }, [location.search]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/assessments?therapyType=${therapyType}`
        );
        console.log(data, "getting the assessment data");
        setAssessments(data);
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load assessments"
        );
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [backendUrl, therapyType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-purple-700 text-lg font-medium"
          >
            Loading assessments...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
          {therapyType === "individual" && "Individual Therapy Assessments"}
          {therapyType === "couple" && "Couples Therapy Assessments"}
          {therapyType === "family" && "Family Therapy Assessments"}
          {therapyType === "child" && "Child Therapy Assessments"}
        </h1>
        <p className="text-xl text-purple-700 mb-8">
          Explore curated quizzes tailored for {therapyType} therapy.
        </p>
        {!token && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-blue-800 font-medium">
                Login to save your assessment results and track your progress
                over time
              </p>
            </div>
          </div>
        )}
        <div className="w-20 h-1 bg-purple-400 mx-auto rounded-full"></div>
      </motion.div>

      {/* Assessments Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {assessments.map((assessment) => (
            <motion.div
              key={assessment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-3 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-purple-100 mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {assessment.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">{assessment.description}</p>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {assessment.questions.length} questions
                  </span>
                  <Link
                    to={`/assessment/${assessment._id}/${therapyType}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {userData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-900 mb-4">
              Track Your Progress
            </h2>
            <Link
              to="/my-assessments"
              className="inline-flex items-center text-lg text-purple-600 font-medium hover:text-purple-800 transition-colors duration-300"
            >
              View your assessment history
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Assessments;
