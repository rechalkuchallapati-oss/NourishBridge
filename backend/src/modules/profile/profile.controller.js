import profileService from "./services/profile.service.js";
import { sendOk } from "../../utils/responseHandler.js";
import { getProfileImagePublicPath } from "./middleware/upload.middleware.js";
import ApiError from "../../utils/ApiError.js";

const getProfile = async (req, res) => {
  const profile = await profileService.getProfile(req.user.id);
  sendOk(res, "Profile fetched successfully", { profile });
};

const updateProfile = async (req, res) => {
  const profile = await profileService.updateProfile(req.user.id, req.body);
  sendOk(res, "Profile updated successfully", { profile });
};

const uploadProfileImage = async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest("Profile image file is required");
  }

  const imageUrl = getProfileImagePublicPath(req.file.filename);
  const profile = await profileService.updateProfileImage(req.user.id, imageUrl);

  sendOk(res, "Profile image uploaded successfully", {
    profile,
    imageUrl,
  });
};

const getProfileImpact = async (req, res) => {
  const impact = await profileService.getProfileImpact(req.user.id);
  sendOk(res, "Profile impact fetched successfully", impact);
};

export default {
  getProfile,
  updateProfile,
  uploadProfileImage,
  getProfileImpact,
};
