import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Brain, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const timeFrames = [
  {
    id: "1week",
    label: "Last Week",
    description: "How have you been feeling in the past 7 days?",
  },
  {
    id: "2weeks",
    label: "Last 2 Weeks",
    description: "How have you been feeling in the past 14 days?",
  },
  {
    id: "4weeks",
    label: "Last 4 Weeks",
    description: "How have you been feeling in the past month?",
  },
  {
    id: "3months",
    label: "Last 3 Months",
    description: "How have you been feeling in the past 3 months?",
  },
];

const moodEmojis = [
  {
    id: "very-happy",
    emoji: "😊",
    label: "Very Happy",
    value: 5,
    description: "Feeling great and positive",
    color: "green-500",
    category: "positive",
  },
  {
    id: "happy",
    emoji: "🙂",
    label: "Happy",
    value: 4,
    description: "Generally good mood",
    color: "green-400",
    category: "positive",
  },
  {
    id: "neutral",
    emoji: "😐",
    label: "Neutral",
    value: 3,
    description: "Neither good nor bad",
    color: "gray-500",
    category: "neutral",
  },
  {
    id: "sad",
    emoji: "😔",
    label: "Sad",
    value: 2,
    description: "Feeling down or low",
    color: "blue-600",
    category: "negative",
  },
  {
    id: "very-sad",
    emoji: "😢",
    label: "Very Sad",
    value: 1,
    description: "Feeling very upset or depressed",
    color: "blue-600",
    category: "negative",
  },
  {
    id: "anxious",
    emoji: "😰",
    label: "Anxious",
    value: 1,
    description: "Feeling worried or stressed",
    color: "orange-600",
    category: "negative",
  },
  {
    id: "angry",
    emoji: "😡",
    label: "Angry",
    value: 1,
    description: "Feeling frustrated or mad",
    color: "red-500",
    category: "negative",
  },
  {
    id: "tired",
    emoji: "😴",
    label: "Tired",
    value: 2,
    description: "Feeling exhausted or drained",
    color: "yellow-600",
    category: "negative",
  },
];

// Enhanced MoodCard component similar to MoodTracker
const MoodCard = ({ mood, isSelected, onSelect, index = 0 }) => {
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
      onClick={() => onSelect(mood.emoji, mood.value)}
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
            {mood.label}
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

export default function MoodTestPage() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedMoods, setSelectedMoods] = useState({});
  const [currentStep, setCurrentStep] = useState("timeframe");

  const handleTimeFrameSelect = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
    setCurrentStep("mood");
  };

  const handleMoodSelect = (emoji, value) => {
    setSelectedMoods((prev) => ({
      ...prev,
      [emoji]: value,
    }));
  };

  const calculateMoodScore = () => {
    const values = Object.values(selectedMoods);
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  const getMoodAnalysis = (score) => {
    if (score >= 4.5)
      return {
        level: "Excellent",
        color: "text-green-600",
        description: "You're doing great!",
      };
    if (score >= 3.5)
      return {
        level: "Good",
        color: "text-blue-600",
        description: "Generally positive mood",
      };
    if (score >= 2.5)
      return {
        level: "Fair",
        color: "text-yellow-600",
        description: "Some ups and downs",
      };
    if (score >= 1.5)
      return {
        level: "Concerning",
        color: "text-orange-600",
        description: "Consider seeking support",
      };
    return {
      level: "Needs Attention",
      color: "text-red-600",
      description: "Professional help recommended",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}

      <div className="max-w-4xl mx-auto py-12 px-4">
        {currentStep === "timeframe" && (
          <div>
            <div className="text-center mb-12">
              <Calendar className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Time Frame
              </h2>
              <p className="text-lg text-gray-600">
                Select the period you'd like to reflect on for your mood
                assessment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {timeFrames.map((timeFrame) => (
                <Card
                  key={timeFrame.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-300"
                  onClick={() => handleTimeFrameSelect(timeFrame.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{timeFrame.label}</CardTitle>
                    <CardDescription>{timeFrame.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Select This Period
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === "mood" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Have You Been Feeling?
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Select all the emotions that describe your mood during the{" "}
                <span className="font-semibold text-purple-600">
                  {timeFrames
                    .find((tf) => tf.id === selectedTimeFrame)
                    ?.label.toLowerCase()}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                You can select multiple emotions that represent your experience
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {moodEmojis.map((mood, index) => (
                <MoodCard
                  key={mood.id}
                  mood={mood}
                  isSelected={selectedMoods[mood.emoji]}
                  onSelect={handleMoodSelect}
                  index={index}
                />
              ))}
            </div>
            {Object.keys(selectedMoods).length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">
                  Your Mood Analysis
                </h3>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Selected emotions:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(selectedMoods).map((emoji) => (
                      <span
                        key={emoji}
                        className="bg-purple-100 px-3 py-1 rounded-full text-sm"
                      >
                        {emoji}{" "}
                        {moodEmojis.find((m) => m.emoji === emoji)?.label}
                      </span>
                    ))}
                  </div>
                </div>

                {(() => {
                  const score = calculateMoodScore();
                  const analysis = getMoodAnalysis(score);
                  return (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Overall Mood Score:
                        </span>
                        <span className={`text-lg font-bold ${analysis.color}`}>
                          {score.toFixed(1)}/5.0 - {analysis.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {analysis.description}
                      </p>
                    </div>
                  );
                })()}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Link
                      to={`/result?timeframe=${selectedTimeFrame}&score=${calculateMoodScore()}&moods=${Object.keys(
                        selectedMoods
                      ).join(",")}`}
                    >
                      Get Detailed Results
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep("timeframe");
                      setSelectedMoods({});
                      setSelectedTimeFrame("");
                    }}
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
