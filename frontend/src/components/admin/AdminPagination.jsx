import { ChevronLeft, ChevronRight } from "lucide-react";
import { ADMIN_FILTER_INPUT, DEFAULT_PAGE_SIZE_OPTIONS } from "./adminStyles";

function PageButton({ page, currentPage, onClick }) {
  const isActive = page === currentPage;
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      aria-current={isActive ? "page" : undefined}
      className={[
        "min-w-[40px] rounded-[10px] border px-3 py-2 text-sm font-semibold transition-all duration-200",
        isActive
          ? "border-[#16A34A] bg-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)]"
          : "border-[#E5E7EB] text-[#64748B] hover:border-[#BBF7D0] hover:bg-[#F0FDF4] hover:text-[#16A34A]",
      ].join(" ")}
    >
      {page}
    </button>
  );
}

export default function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
}) {
  if (totalItems === 0) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const visiblePages = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  })();

  return (
    <div className="flex flex-col gap-4 border-t border-[#E8ECF0] bg-[#FAFBFC] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
        <p>
          Showing <span className="font-semibold text-[#0F172A]">{start}–{end}</span> of{" "}
          <span className="font-semibold text-[#0F172A]">{totalItems}</span> entries
        </p>
        {onPageSizeChange ? (
          <label className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-[#94A3B8]">Rows</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={`${ADMIN_FILTER_INPUT} h-9 w-[72px] py-0 text-xs`}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      {totalPages > 1 ? (
        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="inline-flex items-center gap-1 rounded-[10px] border border-[#E5E7EB] px-3 py-2 text-sm font-medium text-[#64748B] transition-all duration-200 hover:border-[#BBF7D0] hover:bg-[#F0FDF4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          {visiblePages.map((page, idx) => {
            const prev = visiblePages[idx - 1];
            const showEllipsis = prev && page - prev > 1;
            return (
              <span key={page} className="flex items-center gap-1.5">
                {showEllipsis ? <span className="px-1 text-[#94A3B8]">…</span> : null}
                <PageButton page={page} currentPage={currentPage} onClick={onPageChange} />
              </span>
            );
          })}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="inline-flex items-center gap-1 rounded-[10px] border border-[#E5E7EB] px-3 py-2 text-sm font-medium text-[#64748B] transition-all duration-200 hover:border-[#BBF7D0] hover:bg-[#F0FDF4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ChevronRight size={16} />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
