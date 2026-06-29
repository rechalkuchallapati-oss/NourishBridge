import Button from "./Button";
import Hero from "../../components/hero/Hero";
import heroImage from "../../assets/images/hero-food.jpg";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-100 px-15 lg:px-20">

  <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT SIDE */}

      <div>

        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-8 py-3 font-semibold mb-20">

          🌱 Smart Food Redistribution Platform

        </div>

        <h1 className="text-6xl font-black leading-tight">

          <span className="text-green-600">Nourish</span>

          <span className="text-slate-900">Bridge</span>

        </h1>

        <h2 className="mt-5 text-5xl font-bold text-slate-800 leading-tight">

          Reducing Food Waste.

          <br />

          <span className="text-green-600">

            Nourishing Lives.

          </span>

        </h2>

        <p className="mt-8 text-xl leading-9 text-slate-600 max-w-xl">

          NourishBridge is a smart platform which
           
           connects restaurants, caterers,

           NGOs and volunteers

           to redistribute surplus food

           safely and efficiently.

        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="relative">

        <img

          src={heroImage}

          alt="Hero"

          className="rounded-[40px] shadow-2xl w-full object-cover"

        />

      </div>

    </div>

  </div>

</section>

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center text-slate-900">

            Building a Better Tomorrow

          </h2>

          <p className="text-center text-slate-500 mt-4 text-lg">

            Together we reduce food waste and fight hunger.

          </p>

          <div className="grid md:grid-cols-5 gap-6 mt-14">

            <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="font-bold text-xl">Reduce Food Waste</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="font-bold text-xl">Help Communities</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">✔️</div>
              <h3 className="font-bold text-xl">Verified & Safe</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-xl">Smart Matching</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-bold text-xl">Better Tomorrow</h3>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}