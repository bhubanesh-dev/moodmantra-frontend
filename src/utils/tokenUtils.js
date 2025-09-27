// Token utility functions
export const clearAllTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("aToken");
  localStorage.removeItem("dToken");
};

export const validateToken = (token) => {
  if (!token) return false;

  // Basic JWT format validation (3 parts separated by dots)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  // Check if all parts are base64 encoded
  try {
    parts.forEach((part) => {
      if (part) {
        atob(part.replace(/-/g, "+").replace(/_/g, "/"));
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getValidToken = () => {
  const token = localStorage.getItem("token");
  if (validateToken(token)) {
    return token;
  }

  // If token is invalid, clear it
  localStorage.removeItem("token");
  return null;
};
