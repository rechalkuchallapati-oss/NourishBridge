import { useRef, useState, useEffect } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import Button from "../common/Button";
import ProfileAvatar from "./ProfileAvatar";
import {
  resolveProfileImageUrl,
  uploadProfileImage,
  saveProfile,
} from "../../modules/profile/services/profileService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

/**
 * Profile photo uploader with preview, confirm upload, replace, and remove.
 */
export default function ImageUploader({
  profileImage,
  role = "donor",
  displayName = "User",
  accent = "green",
  onUploaded,
  onRemoved,
  onError,
  className = "",
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [localImage, setLocalImage] = useState(profileImage);

  useEffect(() => {
    setLocalImage(profileImage);
  }, [profileImage]);

  const currentImage = previewUrl || (localImage ? resolveProfileImageUrl(localImage) : null);

  const handleSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleConfirmUpload = async () => {
    if (!previewFile) return;

    setUploading(true);
    try {
      const result = await uploadProfileImage(previewFile);
      const imagePath = result.profile?.common?.profileImage || result.imageUrl;
      setLocalImage(imagePath);
      onUploaded?.(imagePath);
      setPreviewFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } catch (error) {
      onError?.(getApiErrorMessage(error));
    } finally {
      setUploading(false);
    }
  };

  const handleCancelPreview = () => {
    setPreviewFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleRemove = async () => {
    setUploading(true);
    try {
      await saveProfile({ common: { profileImage: "" } });
      setLocalImage("");
      onRemoved?.("");
      handleCancelPreview();
    } catch (error) {
      onError?.(getApiErrorMessage(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative">
        {previewUrl ? (
          <div className="h-24 w-24 overflow-hidden rounded-full border-[3px] border-[#BBF7D0] sm:h-28 sm:w-28">
            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
          </div>
        ) : (
          <ProfileAvatar
            profileImage={localImage}
            role={role}
            displayName={displayName}
            accent={accent}
          />
        )}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#16A34A] text-white shadow-sm transition hover:bg-[#15803D] disabled:opacity-60"
          aria-label="Choose profile photo"
        >
          <FaCamera className="text-sm" aria-hidden="true" />
        </button>
      </div>

      <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={handleSelect} />

      {previewFile ? (
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="button" loading={uploading} className="h-10 px-4 text-sm" onClick={handleConfirmUpload}>
            Save Photo
          </Button>
          <Button type="button" variant="outline" disabled={uploading} className="h-10 px-4 text-sm" onClick={handleCancelPreview}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="button" variant="outline" disabled={uploading || !localImage} className="h-10 px-4 text-sm" onClick={handleRemove}>
            <FaTrash className="text-xs" aria-hidden="true" />
            Remove Photo
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-[#64748B]">
        {uploading ? "Saving…" : "JPEG, PNG, WebP, or GIF up to 5 MB"}
      </p>
    </div>
  );
}
