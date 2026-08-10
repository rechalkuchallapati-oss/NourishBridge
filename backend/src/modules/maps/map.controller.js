import mapService from "./services/map.service.js";
import { sendOk } from "../../utils/responseHandler.js";

const getDonationMap = async (req, res) => {
  const data = await mapService.getDonationLocations(req.params.donationId);
  sendOk(res, "Donation map data fetched", { map: data });
};

const getDeliveryRoute = async (req, res) => {
  const data = await mapService.getDeliveryRoute(
    req.params.deliveryId,
    req.user.id,
    req.user.role,
  );
  sendOk(res, "Delivery route fetched", { route: data });
};

const updateVolunteerLocation = async (req, res) => {
  const result = await mapService.updateVolunteerLocation(
    req.user.id,
    req.body.coordinates,
  );
  sendOk(res, "Location updated", result);
};

export default { getDonationMap, getDeliveryRoute, updateVolunteerLocation };
