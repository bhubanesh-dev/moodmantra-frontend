import { useState, useEffect } from "react";
import {
  Heart,
  Brain,
  BarChart3,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Clock,
  Target,
  Shield,
  Zap,
  RefreshCw,
  Printer,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { MoodCard } from "./moodCard";
import { MoodAnalysis } from "./MoodAnalysis";
import { TextFeedback } from "./TextFeedback";
import { FeedbackSystem } from "./FeedbackSystem";
import { moods } from "./data/moods";

const MoodTracker = () => {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [moodData, setMoodData] = useState({});
  const [textFeedbackData, setTextFeedbackData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showTextFeedback, setShowTextFeedback] = useState(false);
  const [showFeedbackSystem, setShowFeedbackSystem] = useState(false);
  const [assessmentSession] = useState(uuidv4());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comprehensiveAssessment, setComprehensiveAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const timePeriods = [
    {
      id: "today",
      label: "Today",
      question: "How are you feeling right now?",
      icon: <Clock className="w-6 h-6" />,
      description: "Your current emotional state",
    },
    {
      id: "week",
      label: "This Week",
      question: "How has your overall mood been this week?",
      icon: <Target className="w-6 h-6" />,
      description: "Your emotional journey this week",
    },
    {
      id: "month",
      label: "This Month",
      question:
        "How would you describe your general emotional state this month?",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Your monthly emotional patterns",
    },
  ];

  // Enhanced analysis function
  const performBasicAnalysis = (moodData, textFeedback) => {
    const moodValues = {
      ecstatic: 5,
      joyful: 5,
      content: 4,
      calm: 4,
      neutral: 3,
      confused: 2,
      tired: 2,
      worried: 2,
      anxious: 1,
      sad: 1,
      angry: 1,
      devastated: 1,
    };

    const scores = Object.values(moodData).map((mood) => moodValues[mood] || 3);
    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Enhanced risk assessment
    let riskLevel = "low";
    let riskColor = "text-green-600";
    let riskBg = "bg-green-100";

    if (averageScore <= 1.5) {
      riskLevel = "high";
      riskColor = "text-red-600";
      riskBg = "bg-red-100";
    } else if (averageScore <= 2.5) {
      riskLevel = "moderate";
      riskColor = "text-yellow-600";
      riskBg = "bg-yellow-100";
    }

    // Enhanced concerns analysis
    const concerns = [];
    const feedbackText = Object.values(textFeedback).join(" ").toLowerCase();

    if (
      feedbackText.includes("stress") ||
      feedbackText.includes("overwhelmed")
    ) {
      concerns.push("Signs of stress and overwhelm");
    }
    if (feedbackText.includes("anxious") || feedbackText.includes("worry")) {
      concerns.push("Anxiety indicators detected");
    }
    if (feedbackText.includes("sad") || feedbackText.includes("depressed")) {
      concerns.push("Low mood patterns");
    }
    if (feedbackText.includes("angry") || feedbackText.includes("frustrated")) {
      concerns.push("Frustration and anger");
    }

    return {
      overallScore: averageScore,
      riskLevel,
      riskColor,
      riskBg,
      primaryConcerns: concerns.length
        ? concerns
        : ["No major concerns identified"],
      strengths: [
        "Emotional awareness",
        "Willingness to self-reflect",
        "Proactive approach to mental health",
      ],
      recommendations: [
        "Practice mindfulness for 10 minutes daily",
        "Maintain a regular sleep schedule",
        "Connect with friends or family weekly",
        "Consider professional support if needed",
      ],
    };
  };

  const handleTextFeedbackSubmit = (feedbackText) => {
    const currentPeriod = timePeriods[currentStep];
    setTextFeedbackData((prev) => ({
      ...prev,
      [currentPeriod.id]: feedbackText,
    }));
    setShowTextFeedback(false);
  };

  const handleMoodSelect = (moodId) => {
    const currentPeriod = timePeriods[currentStep];
    const newMoodData = { ...moodData, [currentPeriod.id]: moodId };
    setMoodData(newMoodData);

    const selectedMood = moods.find((mood) => mood.id === moodId);
    if (selectedMood) {
      setShowFeedbackSystem(true);
    }
  };

  const handleFeedbackComplete = () => {
    setShowFeedbackSystem(false);

    setTimeout(() => {
      if (currentStep < timePeriods.length - 1) {
        setCurrentStep(currentStep + 1);
        // Scroll to top when moving to next step
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        performComprehensiveAnalysis();
      }
    }, 500);
  };

  const performComprehensiveAnalysis = () => {
    setIsAnalyzing(true);
    try {
      const assessment = performBasicAnalysis(moodData, textFeedbackData);
      setComprehensiveAssessment(assessment);
      setCurrentScreen("analysis");
      // Scroll to top when showing results
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error performing analysis:", error);
      setCurrentScreen("analysis");
      // Scroll to top when showing results (even on error)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAssessment = () => {
    setCurrentScreen("welcome");
    setMoodData({});
    setTextFeedbackData({});
    setCurrentStep(0);
    setSelectedPeriod("today");
    setShowTextFeedback(false);
    setShowFeedbackSystem(false);
    setComprehensiveAssessment(null);
    // Scroll to top when resetting assessment
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAssessment = () => {
    setCurrentScreen("assessment");
    setCurrentStep(0);
    // Scroll to top when starting assessment
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Brain className="w-full h-full text-purple-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-800"
          >
            Preparing Your Mood Journey...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-10 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl mb-8"
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6"
              >
                Mood Analyzer
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              >
                Discover your emotional patterns through interactive visual
                expression and receive personalized insights for your mental
                well-being journey.
              </motion.p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {[
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Visual Expression",
                  description:
                    "Express emotions through beautiful, intuitive emoji faces that capture the full spectrum of human feelings.",
                  gradient: "from-pink-500 to-rose-500",
                  bgGradient: "from-pink-50 to-rose-50",
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Smart Analysis",
                  description:
                    "Receive AI-powered insights and personalized recommendations based on your emotional patterns.",
                  gradient: "from-blue-500 to-indigo-500",
                  bgGradient: "from-blue-50 to-indigo-50",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Safe & Private",
                  description:
                    "Your emotional data is processed securely with privacy-first design and professional support resources.",
                  gradient: "from-green-500 to-emerald-500",
                  bgGradient: "from-green-50 to-emerald-50",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm bg-white/70 rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20"
            >
              <div className="text-center max-w-2xl mx-auto">
                <div className="pt-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-xl mb-6"
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Ready to Begin Your Emotional Journey?
                </h2>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  This interactive assessment takes just 3-5 minutes and
                  provides valuable insights into your emotional patterns and
                  well-being.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startAssessment}
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group mb-16"
                >
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Begin Assessment
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 max-w-3xl mx-auto">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Important:</strong> This tool is designed for
                  self-reflection and emotional awareness. It does not replace
                  professional mental health care. If you're experiencing
                  thoughts of self-harm or severe distress, please contact
                  emergency services or a mental health professional
                  immediately.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === "assessment") {
    const currentPeriod = timePeriods[currentStep];
    const selectedMood = moodData[currentPeriod.id];
    const selectedMoodData = moods.find((mood) => mood.id === selectedMood);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-2xl"
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex justify-center mb-6">
                <div className="flex space-x-3">
                  {timePeriods.map((period, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                        ${
                          index <= currentStep
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                            : "bg-white/60 text-gray-400 border-2 border-gray-200"
                        }
                      `}
                      >
                        {period.icon}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium ${
                          index <= currentStep
                            ? "text-purple-600"
                            : "text-gray-400"
                        }`}
                      >
                        {period.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-gray-700">
                    Step {currentStep + 1} of {timePeriods.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Question Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-4xl mx-auto">
                <div className="pt-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                  >
                    {currentPeriod.question}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-600 mb-4"
                  >
                    Select the face that best describes your feelings
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-500 mb-8"
                  >
                    {currentPeriod.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Mood Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12"
            >
              {moods.map((mood, index) => (
                <MoodCard
                  key={mood.id}
                  mood={mood}
                  isSelected={selectedMood === mood.id}
                  onSelect={handleMoodSelect}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Enhanced Text Feedback Button */}
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTextFeedback(true)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:shadow-xl transition-all duration-300 group"
                >
                  <MessageSquare className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Add Your Thoughts (Optional)
                </motion.button>
              </motion.div>
            )}

            {/* Enhanced Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-between items-center mt-12"
            >
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                    // Scroll to top when going to previous step
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    resetAssessment();
                  }
                }}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                ← {currentStep > 0 ? "Previous" : "Back to Home"}
              </motion.button>

              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                  <p className="text-sm text-gray-600 font-medium">
                    {isAnalyzing
                      ? "Analyzing your responses..."
                      : currentStep === timePeriods.length - 1
                      ? "Last question"
                      : `${
                          timePeriods.length - currentStep - 1
                        } more questions`}
                  </p>
                </div>
              </div>

              <div className="w-32" />
            </motion.div>
          </div>
        </div>

        {/* Text Feedback Modal */}
        <TextFeedback
          isOpen={showTextFeedback}
          onClose={() => setShowTextFeedback(false)}
          onSubmit={handleTextFeedbackSubmit}
          currentPeriod={currentPeriod.label}
        />

        {/* Feedback System */}
        {showFeedbackSystem && selectedMoodData && (
          <FeedbackSystem
            moodValue={selectedMoodData.value}
            onFeedbackComplete={handleFeedbackComplete}
          />
        )}
      </div>
    );
  }

  if (currentScreen === "analysis") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-10 blur-2xl"
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
           <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-2xl mb-6"
        >
          <Brain className="w-12 h-12 text-white" />
        </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Your Mood Analysis Results
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Based on your responses, here's a comprehensive analysis of your
                emotional well-being and personalized recommendations.
              </motion.p>
            </motion.div>

            {/* Enhanced Results Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 mb-8"
            >
              <MoodAnalysis
                moodData={moodData}
                textFeedbackData={textFeedbackData}
                comprehensiveAssessment={comprehensiveAssessment}
                onRestart={resetAssessment}
              />
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAssessment}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                Take Another Assessment
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Printer className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Print Results
              </motion.button>
            </motion.div>

            {/* Enhanced Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 max-w-3xl mx-auto">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Remember:</strong> This analysis is for
                  self-reflection and emotional awareness. It does not replace
                  professional mental health care. If you need support, please
                  reach out to a mental health professional.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MoodTracker;
