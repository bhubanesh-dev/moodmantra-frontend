import {
  AlertTriangle,
  CheckCircle,
  Info,
  Heart,
  Phone,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Brain,
  Sparkles,
  Activity,
  Calendar,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export const MoodAnalysis = ({
  moodData,
  textFeedbackData = {},
  comprehensiveAssessment,
  onRestart,
}) => {
  const calculateMoodScore = () => {
    const moodValues = {
      joyful: 5,
      content: 4,
      calm: 4,
      neutral: 3,
      tired: 2,
      anxious: 1,
      sad: 1,
      angry: 1,
    };

    const scores = Object.values(moodData).map((mood) => moodValues[mood] || 3);
    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) / scores.length
    );
  };

  const getMoodInsight = (score, assessment = null) => {
    // Use comprehensive assessment if available
    if (assessment) {
      if (
        assessment.riskLevel === "high" ||
        assessment.urgencyLevel === "immediate"
      ) {
        return {
          level: "concerning",
          title: "Immediate Support Recommended",
          message:
            "Your assessment indicates you may benefit from immediate professional support. Please consider reaching out to a mental health professional or crisis helpline.",
          icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
          color: "red",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      } else if (assessment.riskLevel === "moderate") {
        return {
          level: "moderate",
          title: "Consider Professional Support",
          message:
            "Your assessment suggests you might benefit from professional guidance to develop coping strategies and support your mental well-being.",
          icon: <Info className="w-8 h-8 text-amber-500" />,
          color: "amber",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        };
      } else {
        return {
          level: "positive",
          title: "You're Managing Well",
          message:
            "Your assessment shows positive emotional patterns. Continue your current self-care practices and stay mindful of your mental health.",
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          color: "green",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      }
    }

    // Fallback to basic scoring
    if (score >= 4) {
      return {
        level: "positive",
        title: "You're doing well!",
        message:
          "Your mood analysis shows positive emotional patterns. Keep up the good self-care practices.",
        icon: <CheckCircle className="w-8 h-8 text-green-500" />,
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      };
    } else if (score >= 2.5) {
      return {
        level: "neutral",
        title: "You're managing okay",
        message:
          "Your mood shows some ups and downs, which is completely normal. Consider some gentle self-care activities.",
        icon: <Info className="w-8 h-8 text-blue-500" />,
        color: "blue",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      };
    } else {
      return {
        level: "concerning",
        title: "Consider seeking support",
        message:
          "Your mood analysis suggests you might benefit from additional support. Please consider reaching out to a mental health professional.",
        icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
        color: "amber",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      };
    }
  };

  const moodScore = calculateMoodScore();
  const insight = getMoodInsight(moodScore, comprehensiveAssessment);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "declining":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case "concerning":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
         

         

        
      </motion.div>

      {/* Enhanced Analysis Results */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={`${insight.bgColor} ${insight.borderColor} border-2 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden`}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              {insight.icon}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              {insight.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            >
              {insight.message}
            </motion.p>
          </div>

          {/* Enhanced Mood Score Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-800">
                  Current Mood Score
                </h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Overall Well-being
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    {comprehensiveAssessment?.overallScore?.toFixed(1) ||
                      moodScore}
                    /5
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          ((comprehensiveAssessment?.overallScore ||
                            moodScore) /
                            5) *
                          100
                        }%`,
                      }}
                      transition={{
                        delay: 1.2,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                      className={`h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {comprehensiveAssessment && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <h4 className="text-xl font-bold text-gray-800">
                    Risk Assessment
                  </h4>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      comprehensiveAssessment.riskLevel === "high"
                        ? "bg-red-100"
                        : comprehensiveAssessment.riskLevel === "moderate"
                        ? "bg-amber-100"
                        : "bg-green-100"
                    }`}
                  >
                    <Shield
                      className={`w-8 h-8 ${
                        comprehensiveAssessment.riskLevel === "high"
                          ? "text-red-600"
                          : comprehensiveAssessment.riskLevel === "moderate"
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="text-lg font-bold capitalize text-gray-800">
                      {comprehensiveAssessment.riskLevel} Risk
                    </span>
                    <p className="text-sm text-gray-600">
                      {comprehensiveAssessment.riskLevel === "high"
                        ? "Professional support recommended"
                        : comprehensiveAssessment.riskLevel === "moderate"
                        ? "Consider seeking guidance"
                        : "You're managing well"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Enhanced Comprehensive Assessment Results */}
          {comprehensiveAssessment && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {/* Primary Concerns */}
              {comprehensiveAssessment.primaryConcerns?.length > 0 && (
                <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                    <h4 className="text-xl font-bold text-amber-800">
                      Areas of Focus
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {comprehensiveAssessment.primaryConcerns.map(
                      (concern, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-amber-700 font-medium">
                            {concern}
                          </span>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Strengths */}
              {comprehensiveAssessment.strengths?.length > 0 && (
                <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="text-xl font-bold text-green-800">
                      Your Strengths
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {comprehensiveAssessment.strengths.map(
                      (strength, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.3 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-green-700 font-medium">
                            {strength}
                          </span>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Enhanced Mood Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h4 className="text-xl font-bold text-gray-800">
                Your Mood Timeline
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(moodData).map(([period, mood], index) => (
                <motion.div
                  key={period}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <h5 className="font-bold text-gray-800 capitalize">
                      {period}
                    </h5>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 capitalize mb-3">
                    {mood}
                  </p>
                  {textFeedbackData[period] && (
                    <div className="mt-4 p-3 bg-blue-50/80 rounded-xl border border-blue-200/50">
                      <p className="text-sm text-blue-800 italic leading-relaxed">
                        "{textFeedbackData[period]}"
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Self-Care Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-200/50 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h4 className="text-2xl font-bold text-blue-800">
            Self-Care Suggestions
          </h4>
        </div>

        {comprehensiveAssessment?.recommendations ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comprehensiveAssessment.recommendations.map(
              (recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  className="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-blue-700 font-medium">
                    {recommendation}
                  </span>
                </motion.div>
              )
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <h5 className="font-bold text-blue-700 text-lg mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Daily Practices</span>
              </h5>
              <ul className="text-blue-700 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Take 5-10 minutes for mindfulness or meditation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Go for a walk in nature</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Practice gratitude journaling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Maintain a regular sleep schedule</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <h5 className="font-bold text-blue-700 text-lg mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Weekly Activities</span>
              </h5>
              <ul className="text-blue-700 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Connect with friends or family</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Engage in a hobby you enjoy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Try gentle exercise or yoga</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Limit social media consumption</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>

      {/* Enhanced Resource and Support Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Self-Help Resources */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-200/50 shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-6"
            >
              <ExternalLink className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Self-Help Resources
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Access helpful articles, exercises, and tools for mental
              well-being and emotional growth.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://moodmantra.com/", "_blank")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg"
            >
              <ExternalLink className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Visit MoodMantra
            </motion.button>
          </div>
        </motion.div>

        {/* Connect with Therapist */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 border border-purple-200/50 shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl mb-6"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Connect with Therapist
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Find qualified mental health professionals who can provide
              personalized support and guidance.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/doctors")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg"
            >
              <Phone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Find Therapists
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
