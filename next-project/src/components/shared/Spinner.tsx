import React from "react";

interface SpinnerProps {
  size?: number; // px
  color?: string; // Tailwind color class for border
  text?: string; // Optional loading text
  centered?: boolean; // Center in container
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "border-blue-400",
  text = 'Cargando...',
  centered = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center gap-3 mt-4 ${
        centered ? "justify-center min-h-[150px]" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-4 border-solid border-transparent border-t-current ${color}`}
        style={{
          width: size,
          height: size,
          borderTopColor: "currentColor",
        }}
        role="status"
      />
      {text && (
        <span className="text-gray-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );
};

export default Spinner;
