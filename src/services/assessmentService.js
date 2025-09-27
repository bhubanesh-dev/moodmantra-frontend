import axios from 'axios';
import { useAuth } from '../context/AppContext';

export const useAssessmentService = () => {
  const { backendUrl, token } = useAuth();

  const getAssessments = async () => {
    const response = await axios.get(
      `${backendUrl}/api/assessments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  };

  const getAssessmentById = async (id) => {
    const response = await axios.get(
      `${backendUrl}/api/assessments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  };

  const getUserAssessments = async (userId) => {
    const response = await axios.get(
      `${backendUrl}/api/assessments/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  };

  const submitAssessment = async (userId, assessmentId, answers) => {
    const response = await axios.post(
      `${backendUrl}/api/assessments/submit`,
      {
        userId,
        assessmentId,
        answers
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  };

  return {
    getAssessments,
    getAssessmentById,
    getUserAssessments,
    submitAssessment
  };
};