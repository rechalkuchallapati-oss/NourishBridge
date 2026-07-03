import foodDonor from "../../../assets/how-it-works/food-donor.jpg";
import pickupRequest from "../../../assets/how-it-works/pickup-request.jpg";
import volunteerPickup from "../../../assets/how-it-works/volunteer-pickup.jpg";
import ngoReceives from "../../../assets/how-it-works/ngo-receives.jpg";
import foodReaches from "../../../assets/how-it-works/food-reaches.jpg";

import {
  FaUtensils,
  FaMapMarkerAlt,
  FaTruck,
  FaBuilding,
  FaHeart,
} from "react-icons/fa";

export const timelineSteps = [
  {
    step: "01",
    icon: FaUtensils,
    title: "Food Donor",
    timelineLabel: "Food Donor",
    image: foodDonor,
    imageAlt: "Restaurant donating surplus food",
    color: "#16A34A",
    description:
      "Restaurants, hotels and caterers list fresh surplus food by providing quantity, pickup location and availability through NourishBridge.",
  },
  {
    step: "02",
    icon: FaMapMarkerAlt,
    title: "Pickup Request",
    timelineLabel: "Pickup Request",
    image: pickupRequest,
    imageAlt: "Pickup request created",
    color: "#22C55E",
    description:
      "The platform instantly verifies the donation and intelligently matches nearby verified volunteers for quick collection.",
  },
  {
    step: "03",
    icon: FaTruck,
    title: "Volunteer Pickup",
    timelineLabel: "Volunteer Pickup",
    image: volunteerPickup,
    imageAlt: "Volunteer collecting food",
    color: "#16A34A",
    description:
      "A verified volunteer safely collects the food from the donor while maintaining hygiene and food safety standards.",
  },
  {
    step: "04",
    icon: FaBuilding,
    title: "NGO Receives",
    timelineLabel: "NGO Receives",
    image: ngoReceives,
    imageAlt: "NGO receiving food",
    color: "#22C55E",
    description:
      "The receiving NGO verifies the food quality, confirms delivery and prepares it for immediate community distribution.",
  },
  {
    step: "05",
    icon: FaHeart,
    title: "Food Reaches Community",
    timelineLabel: "Community",
    image: foodReaches,
    imageAlt: "Meals reaching communities",
    color: "#16A34A",
    description:
      "Fresh meals reach orphanages, shelters, old-age homes and families in need, transforming surplus food into hope.",
  },
];