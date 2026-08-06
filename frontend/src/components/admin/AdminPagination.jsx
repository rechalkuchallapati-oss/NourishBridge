export default function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#64748B]">
        Showing <span className="font-semibold text-[#0F172A]">{start}–{end}</span> of{" "}
        <span className="font-semibold text-[#0F172A]">{totalItems}</span> entries
      </p>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-none border border-[#E5E7EB] px-3 py-1.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-[#F0FDF4] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={[
              "min-w-[36px] rounded-none border px-3 py-1.5 text-sm font-semibold transition-all duration-200",
              page === currentPage
                ? "border-[#16A34A] bg-[#16A34A] text-white shadow-sm"
                : "border-[#E5E7EB] text-[#64748B] hover:border-[#BBF7D0] hover:bg-[#F0FDF4]",
            ].join(" ")}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-none border border-[#E5E7EB] px-3 py-1.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-[#F0FDF4] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
