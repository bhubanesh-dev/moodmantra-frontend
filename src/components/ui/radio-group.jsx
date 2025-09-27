import * as React from "react";
import { createContext, useContext, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";

const RadioGroupContext = createContext(null);

export const RadioGroup = forwardRef(
  (
    { className, value, onValueChange, orientation = "vertical", ...props },
    ref
  ) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <motion.div
          ref={ref}
          className={cn(
            orientation === "horizontal"
              ? "flex flex-wrap gap-4"
              : "grid gap-3",
            className
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = forwardRef(
  (
    { className, value, id, disabled = false, variant = "default", ...props },
    ref
  ) => {
    const context = useContext(RadioGroupContext);
    const isChecked = context.value === value;

    const variantClasses = {
      default: {
        unchecked:
          "border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50/50",
        checked: "border-purple-500 bg-purple-50 border-2",
      },
      card: {
        unchecked:
          "border-gray-200 bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:bg-purple-50/80 shadow-sm hover:shadow-md",
        checked: "border-purple-500 bg-purple-50/80 border-2 shadow-lg",
      },
      minimal: {
        unchecked: "border-gray-300 bg-transparent hover:border-purple-400",
        checked: "border-purple-500 bg-purple-500",
      },
    };

    const config = variantClasses[variant];

    return (
      <motion.div
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            id={id}
            checked={isChecked}
            onChange={() => context.onValueChange(value)}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <motion.label
            htmlFor={id}
            className={cn(
              "relative flex items-center justify-center w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200",
              disabled && "opacity-50 cursor-not-allowed",
              isChecked ? config.checked : config.unchecked
            )}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.9 } : {}}
          >
            {/* Check indicator */}
            {isChecked && (
              <motion.div
                className="w-2 h-2 bg-purple-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Focus ring */}
            <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/20 opacity-0 focus-within:opacity-100 transition-opacity" />
          </motion.label>
        </div>
      </motion.div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

// Enhanced radio card component for better UX
export const RadioGroupCard = forwardRef(
  (
    {
      className,
      value,
      id,
      disabled = false,
      icon,
      title,
      description,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioGroupContext);
    const isChecked = context.value === value;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
          "bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg",
          disabled && "opacity-50 cursor-not-allowed",
          isChecked
            ? "border-purple-500 bg-purple-50/80 shadow-lg"
            : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
        )}
        whileHover={!disabled ? { y: -2, scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="radio"
          id={id}
          checked={isChecked}
          onChange={() => context.onValueChange(value)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        <label htmlFor={id} className="cursor-pointer">
          <div className="flex items-start space-x-3">
            {/* Radio indicator */}
            <div className="relative mt-1">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  isChecked
                    ? "border-purple-500 bg-purple-500"
                    : "border-gray-300 bg-white"
                )}
              >
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {icon && (
                <div className="mb-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      isChecked
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {icon}
                  </div>
                </div>
              )}

              {title && (
                <h3
                  className={cn(
                    "font-semibold text-sm leading-tight",
                    isChecked ? "text-purple-800" : "text-gray-800"
                  )}
                >
                  {title}
                </h3>
              )}

              {description && (
                <p
                  className={cn(
                    "text-xs mt-1 leading-relaxed",
                    isChecked ? "text-purple-600" : "text-gray-600"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </label>

        {/* Selection indicator */}
        {isChecked && (
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </motion.div>
    );
  }
);
RadioGroupCard.displayName = "RadioGroupCard";
