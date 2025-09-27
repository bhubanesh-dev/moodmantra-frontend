import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  TrendingUp,
  Activity,
  Calendar,
  BarChart3,
} from "lucide-react";

// Service functions for mood analysis
export const MoodService = {
  // Calculate overall mood score
  calculateMoodScore: (moodData) => {
    if (!moodData || Object.keys(moodData).length === 0) return 0;

    const values = Object.values(moodData);
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  },

  // Get mood analysis based on score
  getMoodAnalysis: (score) => {
    if (score >= 4.5) {
      return {
        level: "Excellent",
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
        description: "You're doing fantastic! Keep up the positive energy!",
        icon: <Brain className="h-5 w-5" />,
        recommendations: [
          "Continue your positive habits",
          "Share your good energy with others",
          "Document what's working well for you",
        ],
      };
    }
    if (score >= 3.5) {
      return {
        level: "Good",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        description: "Generally positive mood with room for growth",
        icon: <Heart className="h-5 w-5" />,
        recommendations: [
          "Practice gratitude daily",
          "Engage in activities you enjoy",
          "Connect with friends and family",
        ],
      };
    }
    if (score >= 2.5) {
      return {
        level: "Fair",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        description: "Some ups and downs - consider self-care practices",
        icon: <Activity className="h-5 w-5" />,
        recommendations: [
          "Practice mindfulness or meditation",
          "Get adequate sleep and exercise",
          "Consider talking to a trusted friend",
        ],
      };
    }
    if (score >= 1.5) {
      return {
        level: "Concerning",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        description: "Consider seeking support from friends or professionals",
        icon: <TrendingUp className="h-5 w-5" />,
        recommendations: [
          "Reach out to a mental health professional",
          "Talk to a trusted friend or family member",
          "Practice self-compassion and self-care",
        ],
      };
    }
    return {
      level: "Needs Attention",
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Professional help recommended - you're not alone",
      icon: <Brain className="h-5 w-5" />,
      recommendations: [
        "Contact a mental health professional immediately",
        "Call a crisis helpline if needed",
        "Remember that help is available and you matter",
      ],
    };
  },

  // Analyze mood patterns
  analyzeMoodPatterns: (moodData, textFeedback = {}) => {
    const patterns = {
      dominantMood: null,
      moodVariability: 0,
      commonThemes: [],
      riskFactors: [],
      strengths: [],
    };

    if (!moodData || Object.keys(moodData).length === 0) {
      return patterns;
    }

    // Find dominant mood
    const moodCounts = {};
    Object.values(moodData).forEach((mood) => {
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
    patterns.dominantMood = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );

    // Calculate mood variability
    const values = Object.values(moodData);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      values.length;
    patterns.moodVariability = Math.sqrt(variance);

    // Analyze text feedback for themes
    const feedbackText = Object.values(textFeedback).join(" ").toLowerCase();

    // Common themes detection
    const themes = {
      stress: ["stress", "stressed", "overwhelmed", "pressure"],
      anxiety: ["anxious", "worry", "worried", "nervous", "fear"],
      sadness: ["sad", "depressed", "down", "blue", "melancholy"],
      happiness: ["happy", "joy", "excited", "great", "wonderful"],
      tiredness: ["tired", "exhausted", "drained", "fatigue"],
      anger: ["angry", "frustrated", "mad", "irritated"],
    };

    Object.entries(themes).forEach(([theme, keywords]) => {
      if (keywords.some((keyword) => feedbackText.includes(keyword))) {
        patterns.commonThemes.push(theme);
      }
    });

    // Risk factors
    if (patterns.dominantMood <= 2) {
      patterns.riskFactors.push("Low mood levels");
    }
    if (patterns.moodVariability > 1.5) {
      patterns.riskFactors.push("High mood variability");
    }
    if (
      patterns.commonThemes.includes("anxiety") ||
      patterns.commonThemes.includes("sadness")
    ) {
      patterns.riskFactors.push("Negative emotional themes");
    }

    // Strengths
    if (patterns.dominantMood >= 4) {
      patterns.strengths.push("Positive emotional baseline");
    }
    if (patterns.commonThemes.includes("happiness")) {
      patterns.strengths.push("Positive emotional expression");
    }
    if (Object.keys(textFeedback).length > 0) {
      patterns.strengths.push("Emotional awareness and reflection");
    }

    return patterns;
  },

  // Generate personalized recommendations
  generateRecommendations: (moodAnalysis, patterns) => {
    const recommendations = [];

    // Base recommendations from mood analysis
    recommendations.push(...moodAnalysis.recommendations);

    // Pattern-based recommendations
    if (patterns.moodVariability > 1.5) {
      recommendations.push(
        "Consider establishing a daily routine for stability"
      );
    }
    if (patterns.commonThemes.includes("stress")) {
      recommendations.push(
        "Try stress management techniques like deep breathing or meditation"
      );
    }
    if (patterns.commonThemes.includes("tiredness")) {
      recommendations.push("Prioritize sleep hygiene and rest");
    }
    if (patterns.strengths.includes("Positive emotional baseline")) {
      recommendations.push("Leverage your positive mindset to help others");
    }

    return recommendations.slice(0, 5); // Limit to 5 recommendations
  },

  // Format data for charts
  formatChartData: (moodData) => {
    const moodCounts = {};
    Object.values(moodData).forEach((mood) => {
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: (count / Object.values(moodData).length) * 100,
    }));
  },

  // Export mood data
  exportMoodData: (moodData, textFeedback, analysis) => {
    return {
      timestamp: new Date().toISOString(),
      moodData,
      textFeedback,
      analysis,
      summary: {
        averageScore: MoodService.calculateMoodScore(moodData),
        totalEntries: Object.keys(moodData).length,
        timeRange: Object.keys(moodData).join(", "),
      },
    };
  },
};

// React component for displaying mood service features
export const MoodServiceFeatures = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced algorithms analyze your mood patterns and provide personalized insights",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Emotional Intelligence",
      description:
        "Understand your emotional patterns and develop better self-awareness",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Progress Tracking",
      description:
        "Monitor your mental health journey with detailed analytics and trends",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Personalized Recommendations",
      description:
        "Get tailored suggestions based on your unique emotional patterns",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Time-Based Insights",
      description: "Track how your mood changes over different time periods",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Data Visualization",
      description:
        "Beautiful charts and graphs to help you understand your emotional data",
    },
  ];

  return (
    <div className="py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Advanced Mood Analysis Features
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our comprehensive mood analysis system provides deep insights into
          your emotional well-being
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
                <div className="text-purple-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
