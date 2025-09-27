import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import BookAppointmentCTA from "../components/BookAppointment";
import { useLocation } from "react-router-dom";

const Assessment = () => {
  const { id, therapy } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { backendUrl, token, userData } = useContext(AppContext);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [start, setStart] = useState(null);
  const location = useLocation();

  const therapyType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("therapy") || "individual";
  }, [location.search]);
  console.log(therapy, "getting ");
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/assessments/${id}`);
        setAssessment(data);
        console.log(data, "wegetting couple data");
        // Set start time once when assessment is loaded
        setStart(new Date().toISOString());
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load assessment"
        );
        navigate("/assessments");
      }
    };

    fetchAssessment();
  }, [id, backendUrl, navigate]);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: assessment.questions[currentQuestion]._id,
      selectedOption: value,
    };
    setAnswers(newAnswers);

    // Auto move to next question if not last question
    if (currentQuestion < assessment.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300); // Small delay for smooth transition
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== assessment.questions.length) {
      toast.warning("Please answer all questions before submitting");
      return;
    }

    setSubmitting(true);
    try {
      if (!token) {
        // If user is not logged in, show results without saving
        const mockResult = {
          score: answers.reduce(
            (total, answer) => total + parseInt(answer.selectedOption),
            0
          ),
          totalQuestions: assessment.questions.length,
          assessment: assessment,
          message:
            "You need to login to save your results and get detailed analysis.",
        };
        setResult(mockResult);
        setCompleted(true);
        toast.info("Login to save your results and get detailed analysis");
      } else {
        // If user is logged in, save results

        const { data } = await axios.post(
          `${backendUrl}/api/assessments/submit`,
          {
            userId: userData?._id,
            assessmentId: assessment._id,
            answers,
            therapyType: therapy,
            startTime: start,
          },
          { headers: { token } }
        );

        setResult(data);
        setCompleted(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit assessment"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (completed && result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
              <h1 className="text-3xl font-bold">Assessment Completed</h1>
              <p className="mt-2 opacity-90">{assessment.title}</p>
            </div>

            <div className="p-6 md:p-8">
              {!token && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <p className="text-yellow-800 font-medium">
                      Login to save your results and get detailed analysis
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/login")}
                    className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Login Now
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">
                    Your Score
                  </h3>
                  <p className="text-4xl font-bold text-blue-600">
                    {result.totalScore || result.score}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                  <h3 className="text-sm font-medium text-green-800 mb-1">
                    Result
                  </h3>
                  <p className="text-xl font-semibold text-green-600">
                    {result.result || "Assessment completed"}
                  </p>
                </div>
              </div>

              {result.recommendations && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-purple-600 p-6 text-white">
                <h1 className="text-3xl font-bold">
                  Recommended Professionals
                </h1>
                <p className="mt-2 opacity-90">
                  Based on your assessment results
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                <div
                  style={{
                    maxWidth: "1400px",
                    margin: "0 auto 4rem auto",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "1.5rem",
                    }}
                  >
                    {doctors.map((doctor, index) => (
                      <motion.div
                        onClick={() => navigate(`/appointment/${doctor._id}`)}
                        key={doctor._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "180px",
                            height: "180px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "4px solid white",
                            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            src={doctor.image}
                            alt={doctor.name}
                          />
                        </div>
                        <h3
                          style={{
                            marginTop: "1rem",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {doctor.name}
                        </h3>
                        <p
                          style={{
                            color: "#7c3aed",
                            fontSize: "0.875rem",
                          }}
                        >
                          {doctor.specialization}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ul>
            </div>

            <BookAppointmentCTA />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/assessments")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex-1 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Assessments</span>
            </button>
            <button
              onClick={() => navigate("/my-assessments")}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>View All Results</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = assessment.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion]?.selectedOption;
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{
        background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress Header */}
          <div
            className="p-6"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              color: "white",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-medium">{assessment.title}</h2>
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-[#fef08a] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-medium text-gray-800 mb-6">
              {question.text}
            </h3>

            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    currentAnswer === option.value
                      ? "border-[#7c3aed] bg-[#f5f3ff] text-[#7c3aed]"
                      : "border-gray-200 hover:border-[#a78bfa] hover:bg-[#f5f3ff]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                        currentAnswer === option.value
                          ? "border-[#7c3aed] bg-[#7c3aed]"
                          : "border-gray-300"
                      }`}
                    >
                      {currentAnswer === option.value && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Submit Button (only shown on last question) */}
            {currentQuestion === assessment.questions.length - 1 && (
              <button
                onClick={handleSubmit}
                disabled={submitting || !answers[currentQuestion]}
                className={`w-full px-6 py-3 rounded-lg transition-colors ${
                  submitting || !answers[currentQuestion]
                    ? "bg-[#a78bfa] text-white cursor-not-allowed"
                    : "bg-[#7c3aed] text-white hover:bg-[#5b21b6]"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Assessment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
