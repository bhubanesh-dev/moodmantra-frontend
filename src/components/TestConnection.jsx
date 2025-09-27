import React, { useState } from "react";
import { useAuth } from "../context/AppContext";

const TestConnection = () => {
  const { backendUrl } = useAuth();
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/test`);
      const data = await response.json();
      setTestResult({ success: true, data });
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Backend Connection Test</h3>
      <div className="space-y-2 mb-4">
        <p>
          <strong>Backend URL:</strong> {backendUrl}
        </p>
        <p>
          <strong>Test URL:</strong> {backendUrl}/test
        </p>
      </div>

      <button
        onClick={testBackendConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test Connection"}
      </button>

      {testResult && (
        <div
          className={`mt-4 p-3 rounded ${
            testResult.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <strong>{testResult.success ? "Success!" : "Error:"}</strong>
          <pre className="mt-2 text-sm">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestConnection;
