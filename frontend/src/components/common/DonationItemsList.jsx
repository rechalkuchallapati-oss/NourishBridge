import { getDonationItems } from "../../data/shared/donationItems";

export default function DonationItemsList({
  record,
  ordered = true,
  className = "",
  itemClassName = "text-xs text-[#64748B]",
  nameClassName = "font-semibold text-[#0F172A]",
  maxItems,
}) {
  const items = getDonationItems(record);
  const visible = maxItems ? items.slice(0, maxItems) : items;
  const Tag = ordered ? "ol" : "ul";
  const listType = ordered ? "list-decimal" : "list-disc";

  if (items.length <= 1 && !record?.items) {
    return (
      <p className={itemClassName}>
        <span className={nameClassName}>{visible[0]?.name}</span>
        {visible[0]?.quantity ? ` — ${visible[0].quantity}` : null}
      </p>
    );
  }

  return (
    <Tag className={`${listType} space-y-1 pl-4 ${className}`}>
      {visible.map((item, index) => (
        <li key={`${item.name}-${index}`} className={itemClassName}>
          <span className={nameClassName}>{item.name}</span>
          {item.cuisine ? (
            <span className="ml-1 text-[10px] font-medium text-[#94A3B8]">({item.cuisine})</span>
          ) : null}
          {" — "}
          <span>{item.quantity}</span>
        </li>
      ))}
      {maxItems && items.length > maxItems ? (
        <li className="text-[10px] font-medium text-[#94A3B8]">
          +{items.length - maxItems} more items
        </li>
      ) : null}
    </Tag>
  );
}
