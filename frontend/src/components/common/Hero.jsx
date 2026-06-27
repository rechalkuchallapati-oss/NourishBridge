export default function Hero() {
  return (
    <section className="min-h-screen bg-[#020617] text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <span className="text-green-400 font-semibold">
            🌱 Reduce Food Waste • Feed More Lives
          </span>

          <h1 className="text-6xl font-bold mt-5 leading-tight">
            Connecting
            <span className="text-green-500"> Surplus Food </span>
            with People in Need
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            NourishBridge connects food donors, NGOs and volunteers
            through one intelligent platform to reduce food waste
            and fight hunger.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-green-500 px-6 py-3 rounded-lg font-semibold">
              Donate Food
            </button>

            <button className="border border-green-500 px-6 py-3 rounded-lg">
              Become Volunteer
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-96 h-96 rounded-3xl bg-green-600 flex items-center justify-center text-3xl font-bold">
            NourishBridge
          </div>
        </div>

      </div>
    </section>
  );
}