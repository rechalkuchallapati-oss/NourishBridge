const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white",

    secondary:
      "border border-green-600 text-green-500 hover:bg-green-600 hover:text-white",

    outline:
      "border border-white text-white hover:bg-white hover:text-black",
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