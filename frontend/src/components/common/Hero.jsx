import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100">
      {/* Background Blur Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-green-200 opacity-30 blur-3xl"></div>
      <div className="absolute top-60 -right-24 w-80 h-80 rounded-full bg-emerald-300 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 -translate-x-1/2 rounded-full bg-lime-200 opacity-20 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold text-sm shadow-sm">
              🌱 AI Powered Smart Food Redistribution Platform
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">

              Reduce
              <span className="block text-green-600">
                Food Waste.
              </span>

              <span className="block">
                Feed Communities.
              </span>

              <span className="block text-emerald-500">
                Create Hope.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 text-lg leading-8 text-slate-600 max-w-xl">
              NourishBridge is a smart food redistribution platform that
              connects restaurants, caterers, event organizers, NGOs and
              volunteers to reduce food waste and deliver surplus meals to
              people in need.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <Button>
                🍽 Donate Food
              </Button>

              <Button variant="outline">
                🤝 Become Volunteer
              </Button>

            </div>

            {/* Trust */}
            <div className="flex items-center gap-3 mt-10">

              <div className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <span className="text-slate-600">
                Trusted by NGOs & Food Donors
              </span>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">                <h2 className="text-3xl font-bold text-green-600">
                  25K+
                </h2>

                <p className="text-slate-500 mt-2">
                  Meals Shared
                </p>
              </div>
               <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <h2 className="text-3xl font-bold text-green-600">
                  500+
                </h2>

                <p className="text-slate-500 mt-2">
                  NGOs
                </p>
              </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <h2 className="text-3xl font-bold text-green-600">
                  2K+
                </h2>

                <p className="text-slate-500 mt-2">
                  Volunteers
                </p>
              </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <h2 className="text-3xl font-bold text-green-600">
                  100+
                </h2>

                <p className="text-slate-500 mt-2">
                  Cities
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            {/* Main Card */}
            <div className="w-[430px] h-[520px] bg-gradient-to-br from-green-500 to-emerald-700 rounded-[40px] shadow-2xl flex flex-col items-center justify-center text-white">

              <div className="text-8xl">
                🍲
              </div>

              <h2 className="mt-6 text-4xl font-bold">
                NourishBridge
              </h2>

              <p className="mt-3 text-green-100 text-lg">
                Every Meal Matters
              </p>

            </div>

           {/* Floating Card 1 */}

          <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 transition-all duration-300 hover:scale-105">

           <div className="text-green-600 font-bold">
            🍽 842 Meals
           </div>

            <p className="text-sm text-slate-500">
               Saved Today
            </p>

          </div>

           {/* Floating Card 2 */}

         <div className="absolute bottom-8 -right-8 bg-white rounded-2xl shadow-xl px-5 py-4 transition-all duration-300 hover:scale-105">

          <div className="text-green-600 font-bold">
           ❤️ 120 NGOs
          </div>

           <p className="text-sm text-slate-500">
             Connected
           </p>

          </div>

           {/* Floating Card 3 */}

            <div className="absolute top-1/2 -right-10 bg-white rounded-2xl shadow-xl px-5 py-4 transition-all duration-300 hover:scale-105">

            <div className="text-green-600 font-bold">
            🚚 Live Delivery
            </div>

            <p className="text-sm text-slate-500">
               Volunteer Assigned
            </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}