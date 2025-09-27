import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Button = forwardRef(
  (
    {
      className,
      variant = "default",
      asChild = false,
      size = "default",
      animate = true,
      loading = false,
      icon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Link : "button";

    const baseClasses =
      "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group";

    const sizeClasses = {
      sm: "h-9 px-4 py-2 text-xs",
      default: "h-11 px-6 py-3 text-sm",
      lg: "h-14 px-8 py-4 text-base",
      xl: "h-16 px-10 py-5 text-lg",
      icon: "h-11 w-11 p-0",
    };

    const variantClasses = {
      default:
        "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 backdrop-blur-sm",
      destructive:
        "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 backdrop-blur-sm",
      outline:
        "border-2 border-purple-200 bg-white/80 backdrop-blur-sm text-purple-700 hover:bg-purple-50/80 hover:border-purple-300 hover:text-purple-800 shadow-sm hover:shadow-md",
      secondary:
        "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-xl hover:shadow-amber-500/25 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 backdrop-blur-sm",
      ghost:
        "hover:bg-purple-50/80 hover:text-purple-700 text-purple-600 backdrop-blur-sm",
      link: "text-purple-600 hover:text-purple-800 underline-offset-4 hover:underline bg-transparent",
      success:
        "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 backdrop-blur-sm",
      warning:
        "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 backdrop-blur-sm",
      glass:
        "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-white/30 hover:shadow-xl hover:shadow-white/20",
    };

    const MotionButton = motion.create(Comp);

    const buttonProps = {
      className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`,
      ref,
      ...props,
      disabled: loading || props.disabled,
      whileTap: animate ? { scale: 0.95 } : {},
      whileHover: animate
        ? {
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2 },
          }
        : {},
      initial: animate ? { scale: 1, opacity: 0 } : {},
      animate: animate
        ? {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: props.delay || 0,
            },
          }
        : {},
    };

    return (
      <MotionButton {...buttonProps}>
        {/* Shimmer effect for gradient buttons */}
        {variant !== "outline" && variant !== "ghost" && variant !== "link" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}

        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* Content */}
        <div
          className={`flex items-center gap-2 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {props.children}
        </div>
      </MotionButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
