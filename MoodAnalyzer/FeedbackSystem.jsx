import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Hand, Star, Heart, Sparkles, CheckCircle } from "lucide-react";

export const FeedbackSystem = ({ moodValue, onFeedbackComplete }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("trophy");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Determine feedback type based on mood value
    if (moodValue >= 4) {
      setFeedbackType("trophy");
      setShowConfetti(true);
    } else if (moodValue >= 3) {
      setFeedbackType("heart");
    } else {
      setFeedbackType("support");
    }

    // Show feedback animation
    setShowFeedback(true);

    // Auto-hide after animation
    const timer = setTimeout(() => {
      setShowFeedback(false);
      onFeedbackComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [moodValue, onFeedbackComplete]);

  const getFeedbackContent = () => {
    switch (feedbackType) {
      case "trophy":
        return {
          icon: <Trophy className="w-16 h-16 text-yellow-500" />,
          message: "Amazing! You're doing fantastic! 🎉",
          subtitle: "Keep up the positive energy!",
          bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
          borderColor: "border-yellow-200",
          iconBg: "bg-gradient-to-br from-yellow-400 to-amber-500",
          textColor: "text-yellow-800",
        };
      case "heart":
        return {
          icon: <Heart className="w-16 h-16 text-pink-500" />,
          message: "Thank you for sharing your feelings 💖",
          subtitle: "Your emotional awareness is valuable",
          bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
          borderColor: "border-pink-200",
          iconBg: "bg-gradient-to-br from-pink-400 to-rose-500",
          textColor: "text-pink-800",
        };
      case "support":
        return {
          icon: <Hand className="w-16 h-16 text-blue-500" />,
          message: "We're here to support you 🤗",
          subtitle: "Remember, it's okay to not be okay",
          bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
          borderColor: "border-blue-200",
          iconBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
          textColor: "text-blue-800",
        };
      default:
        return {
          icon: <Star className="w-16 h-16 text-purple-500" />,
          message: "Thank you for sharing ✨",
          subtitle: "Your feelings matter",
          bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
          borderColor: "border-purple-200",
          iconBg: "bg-gradient-to-br from-purple-400 to-indigo-500",
          textColor: "text-purple-800",
        };
    }
  };

  const feedback = getFeedbackContent();

  return (
    <AnimatePresence>
      {showFeedback && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -10,
                    opacity: 1,
                    scale: 0,
                  }}
                  animate={{
                    y: window.innerHeight + 10,
                    opacity: 0,
                    scale: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            className={`
              ${feedback.bgColor} ${feedback.borderColor} border-2 rounded-3xl p-8 
              shadow-2xl max-w-md w-full text-center relative overflow-hidden
            `}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-current" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Star className="w-6 h-6 text-current" />
              </div>
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-20 h-20 ${feedback.iconBg} rounded-full shadow-lg mb-6`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {feedback.icon}
                </motion.div>
              </motion.div>

              {/* Message */}
              <motion.h3
                className={`text-2xl font-bold ${feedback.textColor} mb-3`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {feedback.message}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {feedback.subtitle}
              </motion.p>

              {/* Progress Indicator */}
              <motion.div
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-300 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        backgroundColor: ["#d1d5db", "#8b5cf6", "#d1d5db"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
