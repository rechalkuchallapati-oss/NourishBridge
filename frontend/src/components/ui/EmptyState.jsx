import { Inbox } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data yet",
  description = "There is nothing to display right now.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center nb-animate-fade-in">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.12)]">
        <Icon size={36} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#64748B]">{description}</p>
      {actionLabel && onAction ? (
        <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
