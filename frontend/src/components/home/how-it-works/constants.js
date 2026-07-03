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
    imageAlt: "Restaurant listing surplus food on NourishBridge",
    description:
      "Restaurants, hotels, caterers and event organizers list surplus food through NourishBridge by entering food quantity, freshness, pickup location and availability.",
  },
  {
    step: "02",
    icon: FaMapMarkerAlt,
    title: "Pickup Request",
    timelineLabel: "Pickup Request",
    image: pickupRequest,
    imageAlt: "Platform verifying donation and notifying volunteers",
    description:
      "The platform instantly verifies the donation and notifies nearby verified volunteers using smart location-based matching.",
  },
  {
    step: "03",
    icon: FaTruck,
    title: "Volunteer Pickup",
    timelineLabel: "Volunteer Pickup",
    image: volunteerPickup,
    imageAlt: "Volunteer safely collecting food from donor",
    description:
      "A verified volunteer accepts the request, reaches the donor location and safely collects the food while following food safety guidelines.",
  },
  {
    step: "04",
    icon: FaBuilding,
    title: "NGO Receives",
    timelineLabel: "NGO Receives",
    image: ngoReceives,
    imageAlt: "NGO verifying food quality upon delivery",
    description:
      "The receiving NGO verifies the food quality, confirms delivery and prepares immediate distribution for beneficiaries.",
  },
  {
    step: "05",
    icon: FaHeart,
    title: "Food Reaches Community",
    timelineLabel: "Food Reaches Community",
    image: foodReaches,
    imageAlt: "Fresh meals distributed to communities in need",
    description:
      "Fresh meals are distributed to orphanages, shelters, old-age homes and families in need, reducing food waste while creating social impact.",
  },
];
