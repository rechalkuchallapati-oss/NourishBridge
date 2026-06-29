const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  // Common button styles
  const baseClasses =
    "inline-flex items-center justify-center gap-2 min-w-[170px] h-14 px-8 rounded-xl font-semibold text-base whitespace-nowrap transition-all duration-300 cursor-pointer";

  // Different button variants
  const variants = {
    primary:
      "bg-green-400 text-white shadow-md hover:bg-green-700 hover:shadow-xl hover:-translate-y-1",

    outline:
      "border-2 border-green-600 bg-white text-green-700 hover:bg-green-600 hover:text-white hover:-translate-y-1",

    secondary:
      "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1",
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