import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const Label = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      required = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    };

    const variantClasses = {
      default: "text-gray-700 font-medium",
      muted: "text-gray-500 font-normal",
      accent: "text-purple-700 font-semibold",
      error: "text-red-600 font-medium",
      success: "text-green-600 font-medium",
    };

    return (
      <motion.label
        ref={ref}
        className={cn(
          "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {props.children}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </motion.label>
    );
  }
);
Label.displayName = "Label";

// Additional label components for different use cases
export const LabelGroup = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("space-y-2", className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
LabelGroup.displayName = "LabelGroup";

export const LabelDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <motion.p
        ref={ref}
        className={cn("text-xs text-gray-500 leading-relaxed mt-1", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        {...props}
      />
    );
  }
);
LabelDescription.displayName = "LabelDescription";
