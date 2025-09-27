import { motion } from "framer-motion";
import { Calendar, Clock, Heart, Star, ArrowRight } from "lucide-react";

export const TimePeriodSelector = ({
  selectedPeriod,
  onPeriodSelect,
  animate = true,
}) => {
  const timePeriods = [
    {
      id: "today",
      label: "Today",
      description: "How are you feeling right now?",
      icon: <Clock className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      duration: "Just today",
    },
    {
      id: "week",
      label: "This Week",
      description: "How has your overall mood been this week?",
      icon: <Calendar className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      duration: "Last 7 days",
    },
    {
      id: "month",
      label: "This Month",
      description:
        "How would you describe your general emotional state this month?",
      icon: <Heart className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      duration: "Last 30 days",
    },
    {
      id: "quarter",
      label: "This Quarter",
      description:
        "How has your mental well-being been over the past few months?",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      duration: "Last 3 months",
    },
  ];

  return (
    <div className="w-full">
      <motion.div
        className="text-center mb-8"
        initial={animate ? { opacity: 0, y: 20 } : {}}
        animate={animate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Time Period
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the time frame you'd like to reflect on for your mood
          assessment
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timePeriods.map((period, index) => (
          <motion.div
            key={period.id}
            initial={animate ? { opacity: 0, y: 30 } : {}}
            animate={animate ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <motion.button
              onClick={() => onPeriodSelect(period.id)}
              className={`
                w-full p-6 rounded-3xl border-2 transition-all duration-300 text-left
                ${
                  selectedPeriod === period.id
                    ? `border-current bg-gradient-to-br ${period.bgGradient} shadow-xl scale-105`
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className={`
                    p-3 rounded-2xl ${period.bgGradient}
                    ${selectedPeriod === period.id ? "shadow-lg" : ""}
                  `}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-${period.gradient.split("-")[1]}-600`}>
                    {period.icon}
                  </div>
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`text-xl font-bold ${
                        selectedPeriod === period.id
                          ? `text-${period.gradient.split("-")[1]}-600`
                          : "text-gray-900"
                      }`}
                    >
                      {period.label}
                    </h3>
                    {selectedPeriod === period.id && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <ArrowRight className="w-5 h-5 text-current" />
                      </motion.div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-2 leading-relaxed">
                    {period.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {period.duration}
                    </span>
                    {selectedPeriod === period.id && (
                      <motion.div
                        className="w-2 h-2 bg-current rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedPeriod === period.id && (
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${period.gradient} opacity-10`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        className="flex justify-center mt-8"
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="flex space-x-2">
          {timePeriods.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <
                timePeriods.findIndex((p) => p.id === selectedPeriod) + 1
                  ? "bg-purple-600"
                  : "bg-gray-300"
              }`}
              animate={{
                scale:
                  index <
                  timePeriods.findIndex((p) => p.id === selectedPeriod) + 1
                    ? [1, 1.2, 1]
                    : 1,
              }}
              transition={{
                duration: 0.5,
                repeat:
                  index <
                  timePeriods.findIndex((p) => p.id === selectedPeriod) + 1
                    ? Infinity
                    : 0,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
