import { useState } from "react";
import { resolveImageUrl } from "../../modules/donations/api/client.js";
import { getCategoryDefaultImage, GENERIC_FOOD_PLACEHOLDER } from "../../data/foodCategoryImages.js";
import { resolveDonationThumbnail } from "../../data/donationThumbnails.js";

function resolveRecordImage(record) {
  if (!record) return null;

  if (record.uploadedImage) return record.uploadedImage;
  if (record.image) return record.image;

  const apiImage = record.images?.[0];
  if (apiImage) return resolveImageUrl(apiImage);

  return null;
}

/**
 * Food image with priority: uploaded → category default → name match → generic placeholder.
 */
export default function FoodImage({
  record,
  category,
  foodName,
  uploadedUrl,
  alt,
  className = "h-full w-full object-cover",
  wrapperClassName = "relative overflow-hidden bg-[#F8FAFC]",
  aspectClassName = "aspect-[4/3]",
  loading = "lazy",
}) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);

  const uploaded = uploadedUrl || resolveRecordImage(record);
  const categoryFallback = getCategoryDefaultImage(category || record?.category);
  const nameFallback = resolveDonationThumbnail(record || { foodName });
  const src = broken
    ? GENERIC_FOOD_PLACEHOLDER
    : uploaded || categoryFallback || nameFallback || GENERIC_FOOD_PLACEHOLDER;

  const label =
    alt ||
    record?.foodName ||
    record?.food ||
    foodName ||
    "Food donation image";

  return (
    <div className={[wrapperClassName, aspectClassName].join(" ")}>
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-[#F1F5F9]" aria-hidden="true" />
      ) : null}
      <img
        src={src}
        alt={label}
        loading={loading}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setBroken(true);
          setLoaded(true);
        }}
      />
    </div>
  );
}

export { resolveRecordImage };
