const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 min-w-[170px] h-12 px-6 rounded-xl font-semibold text-[15px] whitespace-nowrap transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]",

    outline:
      "border-2 border-green-600 bg-white text-green-700 hover:bg-green-600 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]",

    secondary:
      "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]",
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
