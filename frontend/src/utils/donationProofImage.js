import { getDonationItems } from "../data/shared/donationItems";
import {
  resolveDonationThumbnail,
  resolveItemThumbnail,
} from "../data/donationThumbnails";

/**
 * Returns one or more photo URLs for a donation proof thumbnail.
 * - Individual donors with 1–2 items → combined frame per item photo.
 * - Bulk / 3+ items → single photo matched to primary food (biryani, sweets, etc.).
 */
export function getDonationProofImages(record) {
  if (!record) return [];

  const items = getDonationItems(record);
  const isIndividual = record.packagingScale === "individual";

  if (isIndividual && items.length > 0 && items.length <= 2) {
    const images = items.map((item) => resolveItemThumbnail(item)).filter(Boolean);
    if (images.length > 0) return images;
  }

  const bulkImage = resolveDonationThumbnail(record);
  return bulkImage ? [bulkImage] : [];
}

export function getDonationProofPrimaryImage(record) {
  const images = getDonationProofImages(record);
  return images[0] ?? null;
}
