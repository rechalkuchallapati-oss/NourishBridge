import { useRef, useState } from "react";
import { FaCamera, FaUser } from "react-icons/fa";
import {
  resolveProfileImageUrl,
  uploadProfileImage,
} from "../../modules/profile/services/profileService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

export default function ProfileImageUpload({
  profileImage,
  displayName = "User",
  accent = "green",
  onUploaded,
  onError,
  className = "",
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const accentMap = {
    green: {
      ring: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
      button: "bg-[#16A34A] hover:bg-[#15803D]",
    },
    blue: {
      ring: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
      button: "bg-[#2563EB] hover:bg-[#1D4ED8]",
    },
    indigo: {
      ring: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
      button: "bg-[#4338CA] hover:bg-[#3730A3]",
    },
  };
  const accentStyles = accentMap[accent] ?? accentMap.green;

  const imageSrc = previewUrl || resolveProfileImageUrl(profileImage);

  const handleSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);

    try {
      const result = await uploadProfileImage(file);
      onUploaded?.(result.profile?.common?.profileImage || result.imageUrl);
    } catch (error) {
      setPreviewUrl(null);
      const message = getApiErrorMessage(error);
      onError?.(message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative">
        <div
          className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] sm:h-28 sm:w-28 ${accentStyles.ring}`}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <FaUser className="text-3xl opacity-70" aria-hidden="true" />
          )}
        </div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className={`absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-sm transition disabled:opacity-60 ${accentStyles.button}`}
          aria-label="Upload profile photo"
        >
          <FaCamera className="text-sm" aria-hidden="true" />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={handleSelect}
      />
      <p className="text-center text-xs text-[#64748B]">
        {uploading ? "Uploading…" : "JPEG, PNG, WebP, or GIF up to 5 MB"}
      </p>
    </div>
  );
}
