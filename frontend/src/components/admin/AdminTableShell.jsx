import { motion } from "framer-motion";
import {
  ADMIN_TABLE,
  ADMIN_TABLE_MIN_ROWS,
  ADMIN_TABLE_WRAP,
  ADMIN_TD,
  ADMIN_TR,
} from "./adminStyles";
import AdminPagination from "./AdminPagination";
import AdminTableSkeleton from "./AdminTableSkeleton";

const EASE = [0.22, 1, 0.36, 1];
const ROW_HEIGHT = 64;

export default function AdminTableShell({
  children,
  emptyMessage = "No records match these filters.",
  isEmpty = false,
  isLoading = false,
  loadingRows = 5,
  loadingColSpan = 10,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 5,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  minRows = ADMIN_TABLE_MIN_ROWS,
  className = "",
}) {
  const minBodyHeight = minRows * ROW_HEIGHT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className={["nb-print-safe", className].join(" ")}
    >
      <div className={[ADMIN_TABLE_WRAP, "nb-print-safe"].join(" ")}>
        <table className={[ADMIN_TABLE, "nb-print-safe"].join(" ")} style={{ minHeight: minBodyHeight + 52 }}>
          {children}
        </table>
        {isLoading ? <AdminTableSkeleton rows={loadingRows} /> : null}
        {isEmpty && !isLoading ? (
          <p className="px-8 py-16 text-center text-sm text-[#64748B]">{emptyMessage}</p>
        ) : null}
      </div>
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </motion.div>
  );
}

export function AdminTableSpacerRows({ count, colSpan = 10 }) {
  if (count <= 0) return null;
  return Array.from({ length: count }, (_, i) => (
    <tr key={`spacer-${i}`} aria-hidden="true" className="pointer-events-none select-none border-none">
      <td colSpan={colSpan} className="border-none px-5 py-0" style={{ height: ROW_HEIGHT }} />
    </tr>
  ));
}

export function AdminTableRow({ children, onClick, selected = false, className = "" }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClick}
      className={[
        ADMIN_TR,
        onClick ? "cursor-pointer hover:shadow-[inset_4px_0_0_#16A34A]" : "",
        selected ? "bg-[#F0FDF4] shadow-[inset_4px_0_0_#16A34A]" : "",
        className,
      ].join(" ")}
    >
      {children}
    </motion.tr>
  );
}

export { ROW_HEIGHT as ADMIN_ROW_HEIGHT };
