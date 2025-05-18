import React from "react";
import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-500 text-white",
  secondary: "bg-white hover:bg-gray-200 text-black border border-gray-200",
  danger: "bg-red-600 hover:bg-red-500 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classnames(
        "rounded cursor-pointer transition duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
        {
          "opacity-50 cursor-not-allowed!": loading || disabled,
        }
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-4 border-blue-500 border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
};
