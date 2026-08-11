import Skeleton from "../ui/Skeleton";

export default function AdminTableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 px-8 py-12" aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-[10px]" />
      ))}
    </div>
  );
}
