import { FaTruck } from "react-icons/fa";
import RoleLandingPage from "../../components/common/RoleLandingPage";
import volunteerPickup from "../../assets/how-it-works/volunteer-pickup.jpg";

export default function Volunteer() {
  return (
    <main>
      <RoleLandingPage
        badge="Volunteer"
        icon={FaTruck}
        title="Deliver hope,"
        highlight="one pickup at a time"
        description="Join verified volunteers who collect surplus food and deliver it safely to NGO partners and communities in need."
        bullets={[
          "Choose availability windows that fit your schedule.",
          "Accept nearby pickup missions with clear route guidance.",
          "See the impact of every completed delivery on your dashboard.",
        ]}
        image={volunteerPickup}
        imageAlt="Volunteer carrying a food donation box during pickup"
        primaryCta={{
          label: "Become a Volunteer",
          to: "/login",
          state: { tab: "create" },
        }}
        secondaryCta={{ label: "Partner NGOs", to: "/ngo" }}
      />
    </main>
  );
}
