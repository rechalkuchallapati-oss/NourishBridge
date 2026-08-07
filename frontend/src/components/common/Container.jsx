import { NB } from "../../styles/designTokens";

export default function Container({ children, className = "" }) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[1400px]",
        "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export { NB };
