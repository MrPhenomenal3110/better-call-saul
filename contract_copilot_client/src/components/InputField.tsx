// client/src/components/InputField.tsx
import React from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const InputField: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="mb-5 w-full">
    <label className="block text-md font-sans text-gray-800 mb-2!">
      {label}
    </label>
    <input
      {...props}
      className={`w-full px-4! py-2! rounded-lg bg-gray-200 text-gray-800 placeholder-gray-400 focus:outline focus:bg-white focus:border focus:border-gray-200 backdrop-blur-md ${
        error ? "border-red-500" : "border-gray-200"
      }`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
  </div>
);

export default InputField;
