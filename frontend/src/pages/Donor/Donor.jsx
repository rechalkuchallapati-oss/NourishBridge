import { FaHeart, FaLeaf } from "react-icons/fa";
import RoleLandingPage from "../../components/common/RoleLandingPage";
import foodDonor from "../../assets/how-it-works/food-donor.jpg";

export default function Donor() {
  return (
    <main>
      <RoleLandingPage
        badge="Food Donor"
        icon={FaHeart}
        title="Turn surplus food into"
        highlight="real impact"
        description="Register as a donor to list surplus meals, schedule pickups, and track deliveries to verified NGOs in your city."
        bullets={[
          "List food quantity, type, and pickup windows in minutes.",
          "Get matched with nearby NGOs and volunteers automatically.",
          "Track every donation from pickup to community delivery.",
        ]}
        image={foodDonor}
        imageAlt="Restaurant staff preparing surplus food for donation"
        primaryCta={{
          label: "Create Donor Account",
          to: "/login",
          state: { tab: "create" },
        }}
        secondaryCta={{ label: "How It Works", to: "/#how-it-works" }}
      />
      <section className="border-t border-[#E5E7EB] bg-white py-10">
        <div className="mx-auto flex max-w-3xl items-start gap-3 px-6 text-sm leading-6 text-[#64748B] sm:text-base">
          <FaLeaf className="mt-1 shrink-0 text-[#16A34A]" aria-hidden="true" />
          <p>
            Already registered? Sign in to open your donor dashboard and create a new donation
            listing.
          </p>
        </div>
      </section>
    </main>
  );
}
