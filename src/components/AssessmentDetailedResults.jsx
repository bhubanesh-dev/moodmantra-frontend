import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const AssessmentDetailedResults = ({ resultData }) => {
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContext);

  if (!resultData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No detailed results available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Detailed Results</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to results
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Category Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultData.categoryBreakdown.map((category, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800">{category.category}</h4>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Score: {category.score}/{category.maxScore}</span>
                  <span>{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      category.percentage >= 70 ? 'bg-green-500' :
                      category.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Question-by-Question Results</h3>
        <div className="space-y-4">
          {resultData.detailedResults.map((result, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{result.question}</p>
                  <p className="text-sm text-gray-500 mt-1">Category: {result.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  result.score === result.maxScore ? 'bg-green-100 text-green-800' :
                  result.score >= result.maxScore * 0.5 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {result.score}/{result.maxScore}
                </span>
              </div>
              <p className="mt-2 text-gray-700">
                <span className="font-medium">Your answer:</span> {result.selectedOption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetailedResults;