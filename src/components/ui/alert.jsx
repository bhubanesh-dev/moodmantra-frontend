import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  AlertTriangle,
  X,
} from "lucide-react";

const Alert = React.forwardRef(
  (
    {
      className,
      variant = "default",
      children,
      dismissible = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    const variantConfig = {
      default: {
        classes:
          "border-gray-200/50 bg-gray-50/80 backdrop-blur-sm text-gray-800",
        icon: Info,
        iconColor: "text-gray-600",
      },
      blue: {
        classes:
          "border-blue-200/50 bg-blue-50/80 backdrop-blur-sm text-blue-800",
        icon: Info,
        iconColor: "text-blue-600",
      },
      success: {
        classes:
          "border-green-200/50 bg-green-50/80 backdrop-blur-sm text-green-800",
        icon: CheckCircle,
        iconColor: "text-green-600",
      },
      warning: {
        classes:
          "border-yellow-200/50 bg-yellow-50/80 backdrop-blur-sm text-yellow-800",
        icon: AlertTriangle,
        iconColor: "text-yellow-600",
      },
      destructive: {
        classes: "border-red-200/50 bg-red-50/80 backdrop-blur-sm text-red-800",
        icon: XCircle,
        iconColor: "text-red-600",
      },
      info: {
        classes:
          "border-indigo-200/50 bg-indigo-50/80 backdrop-blur-sm text-indigo-800",
        icon: Info,
        iconColor: "text-indigo-600",
      },
    };

    const config = variantConfig[variant];
    const IconComponent = config.icon;

    if (!isVisible) return null;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className={cn(
          "relative w-full rounded-2xl border p-6 shadow-lg transition-all duration-300",
          config.classes,
          className
        )}
        {...props}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className={`flex-shrink-0 ${config.iconColor}`}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>

          {/* Dismiss button */}
          {dismissible && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <motion.h5
    ref={ref}
    className={cn("mb-2 font-semibold leading-none tracking-tight", className)}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("text-sm leading-relaxed [&_p]:leading-relaxed", className)}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.3 }}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
