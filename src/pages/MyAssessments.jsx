import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import AssessmentDetailedResults from "../components/AssessmentDetailedResults";
import { motion } from "framer-motion";

const MyAssessments = () => {
  const { userData, backendUrl, token } = useContext(AppContext);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [detailedResults, setDetailedResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) return;

    const fetchUserAssessments = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${backendUrl}/api/assessments/user/${userData._id}`,
          { headers: { token } }
        );
        setAssessments(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load your assessments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserAssessments();
  }, [userData, backendUrl, token]);

  const viewDetailedResults = async (assessmentId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/assessments/results/${assessmentId}`,
        { headers: { token } }
      );
      setDetailedResults(data);
      setSelectedAssessment(assessmentId);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load detailed results"
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl"
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-6">
            <svg
              className="h-8 w-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-purple-800 mb-3">
            Assessment History
          </h1>
          <p className="text-purple-600 mb-6">
            Please sign in to view your assessment history.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
          >
            Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-purple-700 text-lg"
          >
            Loading your assessments...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-purple-900 mb-2">
                Your Assessment History
              </h1>
              <p className="text-purple-700 text-lg">
                Review all assessments you've completed
              </p>
            </div>
            <Link
              to="/mood-analysis"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform inline-flex items-center justify-center whitespace-nowrap"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Take New Assessment
            </Link>
          </div>
        </motion.div>

        {detailedResults ? (
          <AssessmentDetailedResults resultData={detailedResults} />
        ) : assessments.length === 0 ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-10 text-center shadow-xl"
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-6">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-purple-800 mb-2">
              No assessments completed yet
            </h3>
            <p className="text-purple-600 mb-6 max-w-md mx-auto">
              Get started by taking your first assessment to track your progress
              and gain insights.
            </p>
            <Link
              to="/mood-analysis"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            >
              Take an Assessment
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6"
          >
            {assessments.map((assessment) => (
              <motion.div
                key={assessment._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-purple-900 mb-1">
                        {assessment.assessmentId?.title || "Assessment"}
                      </h2>
                      <p className="text-purple-600 text-sm">
                        Completed on{" "}
                        {new Date(assessment.completedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        assessment.result === "Low Risk"
                          ? "bg-green-100 text-green-800"
                          : assessment.result === "Moderate Risk"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {assessment.result}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                      <p className="text-sm font-semibold text-purple-600 mb-1">
                        Score
                      </p>
                      <p className="text-3xl font-bold text-purple-800">
                        {assessment.totalScore}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                      <p className="text-sm font-semibold text-purple-600 mb-1">
                        Assessment
                      </p>
                      <p className="text-lg font-semibold text-purple-800 truncate">
                        {assessment.assessmentId?.title || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyAssessments;
