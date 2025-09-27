import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const Progress = React.forwardRef(
  (
    {
      className,
      value = 0,
      variant = "default",
      size = "default",
      showLabel = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-2",
      default: "h-3",
      lg: "h-4",
      xl: "h-6",
    };

    const variantClasses = {
      default: {
        track: "bg-gray-200/50",
        fill: "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500",
      },
      success: {
        track: "bg-green-200/50",
        fill: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500",
      },
      warning: {
        track: "bg-yellow-200/50",
        fill: "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500",
      },
      destructive: {
        track: "bg-red-200/50",
        fill: "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500",
      },
      info: {
        track: "bg-blue-200/50",
        fill: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
      },
    };

    const config = variantClasses[variant];

    return (
      <div className="w-full space-y-2">
        {/* Progress bar */}
        <div
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-inner",
            sizeClasses[size],
            config.track,
            className
          )}
          {...props}
        >
          {/* Background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />

          {/* Progress fill */}
          <motion.div
            className={cn(
              "h-full rounded-full relative overflow-hidden shadow-lg",
              config.fill
            )}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
            transition={{
              duration: animated ? 1.5 : 0,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
        </div>

        {/* Label */}
        {showLabel && (
          <motion.div
            className="flex justify-between items-center text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <span className="text-gray-600 font-medium">Progress</span>
            <span className="text-gray-800 font-semibold">
              {Math.round(value)}%
            </span>
          </motion.div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

// Additional progress components for different use cases
export const CircularProgress = React.forwardRef(
  (
    {
      className,
      value = 0,
      size = "default",
      strokeWidth = 4,
      variant = "default",
      showLabel = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-16 h-16",
      default: "w-24 h-24",
      lg: "w-32 h-32",
      xl: "w-40 h-40",
    };

    const variantClasses = {
      default: "text-purple-500",
      success: "text-green-500",
      warning: "text-yellow-500",
      destructive: "text-red-500",
      info: "text-blue-500",
    };

    const radius =
      size === "sm" ? 26 : size === "default" ? 38 : size === "lg" ? 50 : 62;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center space-y-2">
        <div
          ref={ref}
          className={cn("relative", sizeClasses[size], className)}
          {...props}
        >
          {/* Background circle */}
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-gray-200/50"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              className={cn("drop-shadow-lg", variantClasses[variant])}
              initial={{ strokeDasharray, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{
                duration: animated ? 1.5 : 0,
                ease: "easeOut",
              }}
            />
          </svg>

          {/* Center content */}
          {showLabel && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-800">
                {Math.round(value)}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";
