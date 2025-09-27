import { motion } from "framer-motion";

const Card = ({ className, hoverEffect = true, ...props }) => {
  const MotionCard = motion.div;

  return (
    <MotionCard
      className={`rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={
        hoverEffect
          ? { y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }
          : {}
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }) => {
  return (
    <motion.div
      className={`flex flex-col space-y-2 p-6 pb-2 ${className}`}
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }) => {
  return (
    <motion.h3
      className={`text-2xl font-bold leading-tight tracking-tight text-purple-800 ${className}`}
      initial={{ x: -10 }}
      whileInView={{ x: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }) => {
  return (
    <motion.p
      className={`text-sm text-purple-600/80 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      viewport={{ once: true }}
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }) => {
  return (
    <motion.div
      className={`p-6 pt-0 text-gray-700 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      viewport={{ once: true }}
      {...props}
    />
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
