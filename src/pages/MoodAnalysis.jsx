import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Brain,
  Heart,
  Users,
  Baby,
  Calendar,
  Trophy,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHeart,
  FaHandsHelping,
  FaBrain,
  FaUserFriends,
  FaChild,
} from "react-icons/fa";
import BookAppointmentCTA from "../components/BookAppointment";

export default function HomePage() {
  const assessmentTypes = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-600" />,
      title: "Individual Therapy",
      description: "Personal mental health check",
      content:
        "Assess your anxiety, depression, and overall mental well-being with our comprehensive individual assessment.",
      link: "/individual?therapy=individual",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      features: [
        "Anxiety Assessment",
        "Depression Screening",
        "Stress Analysis",
      ],
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Couples Therapy",
      description: "Relationship health check",
      content:
        "Assess communication, compatibility, trust, and conflict resolution in your relationship with expert guidance.",
      link: "/couples?therapy=couple",
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      features: [
        "Communication Patterns",
        "Trust Assessment",
        "Conflict Resolution",
      ],
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Family Therapy",
      description: "Family dynamics evaluation",
      content:
        "Evaluate family roles, support systems, and communication patterns for healthier relationships.",
      link: "/family?therapy=family",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      features: [
        "Family Dynamics",
        "Support Systems",
        "Communication Patterns",
      ],
    },
    {
      icon: <Baby className="h-8 w-8 text-cyan-600" />,
      title: "Child Therapy",
      description: "Child mood & behavior check",
      content:
        "Parent-reported assessment for children's emotional and behavioral well-being with age-appropriate tools.",
      link: "/child?therapy=child",
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
      features: [
        "Emotional Assessment",
        "Behavioral Analysis",
        "Development Tracking",
      ],
    },
  ];

  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-violet-600" />,
      title: "Flexible Time Frames",
      content:
        "Choose your assessment period: last week, 2 weeks, 4 weeks, or 3 months for comprehensive analysis",
      color: "violet",
    },
    {
      icon: <Trophy className="h-10 w-10 text-amber-600" />,
      title: "Instant Results",
      content:
        "Get immediate feedback with detailed explanations, personalized recommendations, and actionable insights",
      color: "amber",
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-emerald-600" />,
      title: "Professional Support",
      content:
        "Connect with licensed therapists and counselors when you need professional help and guidance",
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Understand Your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Mental Health
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Take our comprehensive mood assessments and get personalized
            insights about your mental well-being with professional guidance
          </motion.p>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/moodtest" className="flex items-center gap-2">
                Start Mood Test
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/moodtracker" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Mood Tracker
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-8 mt-16 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>100% Confidential</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Assessment Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6"
            >
              <FaHeart className="text-2xl text-purple-600" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Assessment Type
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the assessment that best fits your needs and get
              personalized insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {assessmentTypes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
                  <Link to={item.link} className="block h-full">
                    <div
                      className={`h-2 bg-gradient-to-r ${item.gradient}`}
                    ></div>
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.bgGradient} rounded-2xl mb-4 group-hover:shadow-lg transition-all duration-300`}
                      >
                        {item.icon}
                      </motion.div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-gray-600">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {item.content}
                      </p>

                      <div className="space-y-2">
                        {item.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all duration-300">
                          <span>Start Assessment</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mb-6"
            >
              <FaHandsHelping className="text-2xl text-amber-600" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, effective, and personalized mental health assessment
              process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center h-full border border-gray-100">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-2xl mb-6 group-hover:shadow-lg transition-all duration-300`}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              {
                number: "10K+",
                label: "Assessments Completed",
                icon: <Brain className="h-6 w-6" />,
              },
              {
                number: "95%",
                label: "User Satisfaction",
                icon: <Heart className="h-6 w-6" />,
              },
              {
                number: "24/7",
                label: "Available Support",
                icon: <MessageCircle className="h-6 w-6" />,
              },
              {
                number: "50+",
                label: "Expert Therapists",
                icon: <Users className="h-6 w-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                  <div className="text-purple-600">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-20">
        <BookAppointmentCTA />
      </div>
    </div>
  );
}
