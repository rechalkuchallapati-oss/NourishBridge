import { useState } from "react";

import SectionHeader from "./SectionHeader";
import ProcessTimelineBar from "./ProcessTimelineBar";
import ProcessCards from "./ProcessCards";

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-green-50 via-white to-white">

      <div className="max-w-7xl mx-auto px-8">

        <SectionHeader />

        <ProcessTimelineBar activeIndex={activeIndex} />

        <ProcessCards onHover={setActiveIndex} />

      </div>

    </section>
  );
}