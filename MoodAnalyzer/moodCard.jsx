import { motion } from "framer-motion";
import { Trophy, Hand, Heart, Star, CheckCircle } from "lucide-react";

export const MoodCard = ({
  mood,
  isSelected,
  onSelect,
  showFeedback = false,
  feedbackType = null,
  index = 0,
}) => {
  const handleClick = () => {
    onSelect(mood.id);
  };

  const getFeedbackIcon = () => {
    switch (feedbackType) {
      case "trophy":
        return <Trophy className="w-4 h-4 text-yellow-800" />;
      case "heart":
        return <Heart className="w-4 h-4 text-pink-800" />;
      case "slap":
        return <Hand className="w-4 h-4 text-red-800" />;
      default:
        return <Star className="w-4 h-4 text-purple-800" />;
    }
  };

  const getFeedbackBgColor = () => {
    switch (feedbackType) {
      case "trophy":
        return "bg-gradient-to-br from-yellow-400 to-amber-500";
      case "heart":
        return "bg-gradient-to-br from-pink-400 to-rose-500";
      case "slap":
        return "bg-gradient-to-br from-red-400 to-pink-500";
      default:
        return "bg-gradient-to-br from-purple-400 to-indigo-500";
    }
  };

  const getMoodColorClasses = () => {
    const colorMap = {
      "green-500": "from-emerald-500 to-green-600",
      "green-400": "from-green-400 to-emerald-500",
      "blue-500": "from-blue-500 to-cyan-600",
      "blue-400": "from-cyan-400 to-blue-500",
      "gray-500": "from-gray-400 to-slate-500",
      "yellow-500": "from-yellow-400 to-amber-500",
      "yellow-600": "from-amber-500 to-orange-500",
      "orange-500": "from-orange-400 to-red-500",
      "orange-600": "from-red-400 to-orange-500",
      "blue-600": "from-blue-600 to-indigo-600",
      "red-500": "from-red-500 to-rose-600",
      "red-600": "from-rose-500 to-red-600",
    };
    return colorMap[mood.color] || "from-purple-500 to-indigo-600";
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`
        relative cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 
        ${
          isSelected
            ? `border-current bg-gradient-to-br ${getMoodColorClasses()} bg-opacity-10 shadow-xl scale-105`
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-105"
        }
      `}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: isSelected ? 1.05 : 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Feedback Icons */}
      {showFeedback && feedbackType && (
        <motion.div
          className="absolute -top-3 -right-3 z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
            delay: 0.2,
          }}
        >
          <div
            className={`${getFeedbackBgColor()} rounded-full p-2 shadow-xl animate-bounce`}
          >
            {getFeedbackIcon()}
          </div>
        </motion.div>
      )}

      <div className="flex flex-col items-center space-y-4">
        {/* Emoji Face */}
        <motion.div
          className="text-5xl md:text-6xl transition-all duration-300"
          animate={
            isSelected
              ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }
              : {}
          }
          transition={{ duration: 0.6 }}
        >
          {mood.emoji}
        </motion.div>

        {/* Mood Info */}
        <div className="text-center">
          <motion.h3
            className={`font-bold text-base md:text-lg ${
              isSelected ? `text-${mood.color}` : "text-gray-800"
            }`}
            animate={isSelected ? { scale: 1.05 } : {}}
            transition={{ duration: 0.2 }}
          >
            {mood.name}
          </motion.h3>
          <motion.p
            className="text-sm text-gray-600 mt-2 leading-relaxed hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {mood.description}
          </motion.p>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          className={`absolute top-3 right-3 w-4 h-4 bg-gradient-to-r ${getMoodColorClasses()} rounded-full shadow-lg`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
          }}
        >
          <CheckCircle className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Hover Glow Effect */}
      {isSelected && (
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getMoodColorClasses()} opacity-20 blur-xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};
