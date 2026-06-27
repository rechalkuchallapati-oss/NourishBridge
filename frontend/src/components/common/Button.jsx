const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg",

    secondary:
      "bg-green-100 text-green-700 hover:bg-green-200",

    outline:
      "border border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 bg-white",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;