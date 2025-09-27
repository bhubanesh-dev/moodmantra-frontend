import React from "react";
import {
  FaHeart,
  FaHandsHelping,
  FaLeaf,
  FaCheckCircle,
  FaQuoteLeft,
  FaArrowRight,
  FaStar,
  FaUserFriends,
  FaShieldAlt,
  FaBrain,
} from "react-icons/fa";
import { motion } from "framer-motion";

const WelcomeMessage = () => {
  const benefits = [
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Compassionate Care",
      description:
        "Professional therapists who truly care about your well-being",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Safe Environment",
      description: "100% confidential and judgment-free space to heal",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaBrain className="text-2xl" />,
      title: "Expert Guidance",
      description: "Licensed professionals with specialized training",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <FaUserFriends className="text-2xl" />,
      title: "Personalized Support",
      description: "Tailored therapy plans designed for your unique needs",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-purple-100 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-10 right-10 w-32 h-32 bg-purple-100 rounded-full opacity-50"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-10 left-10 w-24 h-24 bg-pink-100 rounded-full opacity-50"
            />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-purple-100 px-6 py-3 rounded-full mb-8 shadow-lg"
              >
                <FaHeart className="text-pink-500 text-xl mr-3" />
                <span className="text-purple-800 font-semibold">
                  Welcome to Your Safe Space
                </span>
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Raska Mon
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your safe space for healing, growth, and mental wellness. We're
                here to support you every step of your journey.
              </p>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-purple-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <FaQuoteLeft className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Your Mental Health Matters
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      In today's fast-paced world, our mental health is often
                      overlooked, buried beneath responsibilities, expectations,
                      and daily struggles. But just like physical health, our
                      emotional well-being deserves care, attention, and timely
                      support.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      If you've been feeling overwhelmed, anxious, emotionally
                      drained, or simply unheard, know that you are not alone.
                      Seeking help is not a sign of weakness—it is a step toward
                      strength, clarity, and a healthier mind.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why Counseling Matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center bg-amber-100 px-6 py-3 rounded-full mb-6 shadow-lg"
                >
                  <FaHandsHelping className="text-amber-600 text-xl mr-3" />
                  <span className="text-amber-800 font-semibold">
                    Why Timely Counseling Matters
                  </span>
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Early Intervention Makes a Difference
                </h3>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 shadow-lg border border-amber-100">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Many emotional struggles start small—stress, self-doubt,
                  relationship conflicts, or work pressure. When left
                  unaddressed, these can build up, leading to anxiety,
                  depression, or other serious disorders. The good news? Early
                  intervention through talk therapy can prevent this.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Just as we visit a doctor for a minor cold before it turns
                  into a severe illness, counseling helps the mind recover
                  before emotional distress deepens.
                </p>
              </div>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  What We Offer
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Professional counseling and therapy services through
                  compassionate conversations that help untangle your thoughts
                  and ease emotional burdens.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 h-full">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {benefit.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full mb-6"
                  >
                    <FaLeaf className="text-green-300 text-xl mr-2" />
                    <span className="text-white font-semibold">
                      Your Journey Starts Here
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4">
                    Your mental health matters. Your feelings are valid. Your
                    happiness is possible.
                  </h3>

                  <p className="text-lg text-purple-100 mb-6 leading-relaxed">
                    Let's take the first step together—because you deserve a
                    mind at peace and a life full of meaning.
                  </p>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <span className="text-yellow-300">
                      🧡 We are here for you.
                    </span>
                    <span>Let's talk.</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
