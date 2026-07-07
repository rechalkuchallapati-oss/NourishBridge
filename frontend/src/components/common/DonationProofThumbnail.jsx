import { getDonationItems } from "../../data/shared/donationItems";
import { getDonationProofImages } from "../../utils/donationProofImage";

/**
 * One combined proof thumbnail per donation — individual items side-by-side,
 * bulk donations as a single spread photo.
 */
export default function DonationProofThumbnail({
  record,
  className = "h-full w-full",
  imageClassName = "h-full w-full object-cover",
  alt,
}) {
  const images = getDonationProofImages(record);
  const items = getDonationItems(record);

  if (!images.length) return null;

  const label = alt ?? record?.foodName ?? "Donation proof photo";

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={label}
        className={[imageClassName, className].join(" ")}
      />
    );
  }

  return (
    <div
      className={["grid grid-cols-2 overflow-hidden bg-[#F8FAFC]", className].join(" ")}
      role="img"
      aria-label={label}
    >
      {images.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt={items[index]?.name ?? `Item ${index + 1}`}
          className={[imageClassName, "min-h-0"].join(" ")}
        />
      ))}
    </div>
  );
}
