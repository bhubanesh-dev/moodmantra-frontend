import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const AssessmentResult = () => {
  const { id } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [assessmentDetails, setAssessmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Validate ID first
if (!id || !/^[0-9a-f]{24}(:\d+)?$/.test(id)) {
  throw new Error("Invalid assessment ID format");
}

        // First fetch the result
        const resultResponse = await axios.get(
          `${backendUrl}/api/assessments/results/${id}`, // Note the plural 'results'
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!resultResponse.data) {
          throw new Error("No data received");
        }

        // Then fetch the assessment details
        const assessmentResponse = await axios.get(
          `${backendUrl}/api/assessments/${resultResponse.data.assessmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setAssessmentResult(resultResponse.data);
        setAssessmentDetails(assessmentResponse.data);
      } catch (err) {
        console.error("API Error:", {
          message: err.message,
          response: err.response?.data,
          request: err.config,
        });
        setError(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.message || "Failed to load assessment");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, backendUrl, token]);

  if (loading) {
    return (
      <div className="text-center py-8">Loading assessment results...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading assessment result</p>
        <p className="text-gray-600 mt-2">{error.message}</p>
        <Link
          to="/my-assessments"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Assessments
        </Link>
      </div>
    );
  }

  if (!assessmentResult || !assessmentDetails) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Assessment result not found.</p>
        <Link
          to="/my-assessments"
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Back to your assessments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ... rest of your JSX remains the same ... */}
    </div>
  );
};

export default AssessmentResult;
