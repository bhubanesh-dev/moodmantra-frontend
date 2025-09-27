// Utility to clear all tokens from localStorage
// This can be run in the browser console to fix JWT issues

export const clearAllTokensFromStorage = () => {
  console.log("Clearing all tokens from localStorage...");

  const tokensToRemove = ["token", "aToken", "dToken"];

  tokensToRemove.forEach((tokenKey) => {
    if (localStorage.getItem(tokenKey)) {
      localStorage.removeItem(tokenKey);
      console.log(`Removed ${tokenKey} from localStorage`);
    }
  });

  console.log("All tokens cleared. Please refresh the page and login again.");

  // Optionally refresh the page
  // window.location.reload();
};

// Auto-clear tokens if there are JWT errors
if (typeof window !== "undefined") {
  // Listen for JWT errors in the console
  const originalError = console.error;
  console.error = function (...args) {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("jwt malformed")
    ) {
      console.warn("JWT malformed error detected. Consider clearing tokens.");
      clearAllTokensFromStorage();
    }
    originalError.apply(console, args);
  };
}
