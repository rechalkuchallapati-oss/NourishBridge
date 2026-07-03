export default function SectionHeader() {
  return (
    <div className="max-w-4xl mx-auto text-center">

      {/* Small Badge */}

      <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase text-green-700">
          How It Works
        </span>
      </div>

      {/* Heading */}

      <h2 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
        How{" "}
        <span className="text-green-600">
          NourishBridge
        </span>{" "}
        Works
      </h2>

      {/* Paragraph */}

      <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
        From surplus food to smiling faces, NourishBridge connects food donors,
        volunteers and NGOs through a secure and transparent redistribution
        process ensuring every meal reaches those who need it most.
      </p>

    </div>
  );
}