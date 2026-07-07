import { getDonationItems } from "../data/shared/donationItems";

const EVENT_ACCENTS = {
  restaurant: { bg: "#F0FDF4", border: "#BBF7D0", header: "#15803D", text: "#166534" },
  wedding: { bg: "#FFF7ED", border: "#FED7AA", header: "#C2410C", text: "#9A3412" },
  individual: { bg: "#EFF6FF", border: "#BFDBFE", header: "#1D4ED8", text: "#1E40AF" },
  festival: { bg: "#F5F3FF", border: "#DDD6FE", header: "#7C3AED", text: "#6D28D9" },
  party: { bg: "#FDF2F8", border: "#FBCFE8", header: "#DB2777", text: "#BE185D" },
  corporate: { bg: "#F8FAFC", border: "#E2E8F0", header: "#475569", text: "#334155" },
  default: { bg: "#F8FAFC", border: "#E2E8F0", header: "#16A34A", text: "#0F172A" },
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(value, max = 24) {
  const text = String(value ?? "").trim();
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function buildPickupListThumbnailSvg(pickup) {
  const items = getDonationItems(pickup);
  const accent = EVENT_ACCENTS[pickup?.eventType] ?? EVENT_ACCENTS.default;
  const maxVisible = 7;
  const visible = items.slice(0, maxVisible);
  const extraCount = items.length - visible.length;
  const title = truncate(pickup?.foodName ?? "Food pickup", 28);
  const meals = pickup?.estimatedMeals ?? "—";

  const itemLines = visible
    .map((item, index) => {
      const y = 46 + index * 13;
      return `<text x="10" y="${y}" font-size="8.5" font-family="Arial, sans-serif" fill="${accent.text}">${index + 1}. ${escapeXml(truncate(item.name, 26))}</text>`;
    })
    .join("");

  const extraLine =
    extraCount > 0
      ? `<text x="10" y="${46 + visible.length * 13}" font-size="8" font-family="Arial, sans-serif" fill="#64748B">+${extraCount} more items</text>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="176" viewBox="0 0 144 176" role="img" aria-label="${escapeXml(title)}">
    <rect width="144" height="176" rx="0" fill="${accent.bg}" stroke="${accent.border}" stroke-width="1.5"/>
    <rect width="144" height="28" fill="${accent.header}" opacity="0.12"/>
    <text x="10" y="14" font-size="7.5" font-weight="700" font-family="Arial, sans-serif" fill="${accent.header}" letter-spacing="0.06em">FOOD LIST</text>
    <text x="10" y="26" font-size="9.5" font-weight="700" font-family="Arial, sans-serif" fill="#0F172A">${escapeXml(title)}</text>
    ${itemLines}
    ${extraLine}
    <rect y="154" width="144" height="22" fill="${accent.header}" opacity="0.1"/>
    <text x="10" y="168" font-size="8" font-weight="700" font-family="Arial, sans-serif" fill="${accent.header}">~${meals} meals · ${items.length} items</text>
  </svg>`;
}

/** One composite thumbnail image per pickup — all foods listed in a single SVG image. */
export function getPickupListThumbnail(pickup) {
  if (!pickup) return null;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildPickupListThumbnailSvg(pickup))}`;
}
