export default function Skeleton({ className = "h-4 w-full", ...props }) {
  return <div className={["nb-skeleton", className].join(" ")} aria-hidden="true" {...props} />;
}
