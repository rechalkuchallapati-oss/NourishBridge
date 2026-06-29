import heroImage from "../../../assets/images/hero-food.jpg";

export default function HeroImage() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:max-w-none lg:pr-6 xl:pr-10">
      {/* Organic green blobs */}
      <div className="pointer-events-none absolute -right-8 top-8 h-64 w-64 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-green-200/50 blur-sm" />
      <div className="pointer-events-none absolute -bottom-6 -left-4 h-48 w-56 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] bg-emerald-100/70 blur-sm" />
      <div className="pointer-events-none absolute right-12 top-1/2 h-32 w-40 rounded-full bg-lime-100/60 blur-2xl" />

      {/* Image only — no quotes or stat overlays */}
      <div className="group relative overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_28px_60px_rgba(22,163,74,0.15)] transition duration-500 hover:shadow-[0_32px_70px_rgba(22,163,74,0.22)]">
        <img
          src={heroImage}
          alt="Volunteers loading fresh food for community distribution"
          className="aspect-[5/4] w-full rounded-[22px] object-cover transition duration-700 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
