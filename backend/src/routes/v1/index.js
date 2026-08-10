import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import donorRoutes from "./donor.routes.js";
import profileRoutes from "../../modules/profile/profile.routes.js";
import adminRoutes from "../../modules/admin/admin.routes.js";
import ngoRoutes from "../../modules/ngo/ngo.routes.js";
import volunteerRoutes from "../../modules/volunteer/volunteer.routes.js";
import foodRequestRoutes from "../../modules/foodRequests/foodRequest.routes.js";
import donationRoutes from "../../modules/donations/donation.routes.js";
import deliveryRoutes from "../../modules/deliveries/delivery.routes.js";
import notificationRoutes from "../../modules/notifications/notification.routes.js";
import mapRoutes from "../../modules/maps/map.routes.js";
import matchingRoutes from "../../modules/matching/matching.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/donations", donationRoutes);
router.use("/deliveries", deliveryRoutes);
router.use("/notifications", notificationRoutes);
router.use("/maps", mapRoutes);
router.use("/matching", matchingRoutes);
router.use("/food-requests", foodRequestRoutes);
router.use("/admin", adminRoutes);
router.use("/donor", donorRoutes);
router.use("/ngo", ngoRoutes);
router.use("/volunteer", volunteerRoutes);

export default router;
