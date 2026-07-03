import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import Container from "../common/Container";

import feedingIndia from "../../assets/partners/feeding-india.png";
import robinHoodArmy from "../../assets/partners/robinhood-army.png";
import akshayaPatra from "../../assets/partners/akshaya-patra.png";
import riseAgainstHunger from "../../assets/partners/rise-against-hunger.png";

const EASE = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    name: "Rahul Verma",
    role: "NourishBridge Volunteer",
    location: "Pune, India",
    photo: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    quote:
      "After delivering donated meals to homes across Pune, the gratitude on every doorstep filled me with happiness. NourishBridge connects kindness with action better than anything I have seen.",
  },
  {
    name: "Vikram Desai",
    role: "Restaurant Owner · Donor",
    location: "Mumbai, India",
    photo: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    quote:
      "Every night we had perfectly good biryani and curries going to waste at our restaurant. NourishBridge picks it up within the hour and I can see it reach a shelter across the city before we close.",
  },
  {
    name: "Meera Joshi",
    role: "NGO Partner · Akshaya Patra",
    location: "Bangalore East Branch",
    logo: akshayaPatra,
    rating: 5,
    quote:
      "Partnering with NourishBridge scaled our Bangalore operations. Real-time tracking and verified volunteers mean more meals reach schoolchildren and underserved communities faster.",
  },
  {
    name: "Ananya Kapoor",
    role: "Wedding Event Donor",
    location: "Udaipur, India",
    photo: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    quote:
      "After my sister's marriage, trays of untouched paneer, dal, and desserts were headed for the bin. One request on NourishBridge and volunteers collected everything within forty minutes for nearby families.",
  },
  {
    name: "Sneha Reddy",
    role: "Community Volunteer",
    location: "Hyderabad, India",
    photo: "https://i.pravatar.cc/150?img=23",
    rating: 5,
    quote:
      "Volunteering through NourishBridge gave me a clear route, verified pickups, and instant updates. Every trip feels purposeful knowing the food reaches families who truly need it.",
  },
  {
    name: "Akash Mehta",
    role: "NGO Partner · Feeding India",
    location: "Delhi NCR Branch",
    logo: feedingIndia,
    rating: 5,
    quote:
      "As an NGO partner, the smart allocation system helps us receive food exactly when our kitchens need it. Transparency and coordination have improved dramatically across our Delhi branch.",
  },
  {
    name: "James D'Souza",
    role: "Christmas Party Host · Donor",
    location: "Goa, India",
    photo: "https://i.pravatar.cc/150?img=52",
    rating: 5,
    quote:
      "Our office Christmas party left heaps of roast, cake, and snacks untouched. NourishBridge coordinated a same-night pickup so the surplus reached homeless shelters along the coast instead of landfills.",
  },
  {
    name: "Priya Sharma",
    role: "Home Food Donor",
    location: "Mumbai, India",
    photo: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    quote:
      "I listed extra home-cooked meals after a family gathering and a volunteer arrived before dinner went cold. Watching the delivery update on my phone made the whole experience feel truly meaningful.",
  },
  {
    name: "Karan Singh",
    role: "NourishBridge Volunteer",
    location: "Jaipur, India",
    photo: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    quote:
      "Sharing happiness after every food donation run is why I keep coming back. NourishBridge shows exactly where meals go — turning one act of giving into hope for entire households.",
  },
  {
    name: "Lakshmi Iyer",
    role: "NGO Partner · Rise Against Hunger",
    location: "Chennai South Branch",
    logo: riseAgainstHunger,
    rating: 5,
    quote:
      "Our Chennai branch coordinates daily pickups seamlessly. Volunteers arrive on time, food quality is preserved, and families receive nutritious meals with dignity every single day.",
  },
  {
    name: "Rohan Malhotra",
    role: "Banquet Hall Manager · Donor",
    location: "Chandigarh, India",
    photo: "https://i.pravatar.cc/150?img=59",
    rating: 4,
    quote:
      "We host three to four wedding receptions every weekend. NourishBridge now collects surplus buffets the same evening — hundreds of plates of food reach NGOs instead of being discarded after celebrations.",
  },
  {
    name: "Divya Nair",
    role: "NGO Partner · Robin Hood Army",
    location: "Kochi West Branch",
    logo: robinHoodArmy,
    rating: 5,
    quote:
      "Our Kochi branch receives timely food donations through NourishBridge every week. The platform helps us plan distributions better and serve coastal communities with fresh, dignified meals.",
  },
];

const SLIDE_SIZE = 3;
const slides = Array.from(
  { length: testimonials.length / SLIDE_SIZE },
  (_, i) => testimonials.slice(i * SLIDE_SIZE, i * SLIDE_SIZE + SLIDE_SIZE)
);

function FloatingHeart({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaHeart />
    </motion.div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-xs sm:text-sm ${
            i < rating ? "text-amber-400" : "text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialAvatar({ item }) {
  if (item.logo) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] p-2 ring-2 ring-[#E8F8EF] sm:h-16 sm:w-16 sm:p-2.5">
        <img
          src={item.logo}
          alt={`${item.role} logo`}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={item.photo}
      alt={item.name}
      width={64}
      height={64}
      className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[#E8F8EF] sm:h-16 sm:w-16"
    />
  );
}

function TestimonialCard({ item, index }) {
  return (
    <motion.article
      className="relative flex h-full w-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(22,163,74,0.1)] sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
    >
      <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
        <StarRating rating={item.rating} />
      </div>

      <div className="flex items-center gap-3 pr-14 sm:gap-4 sm:pr-16">
        <TestimonialAvatar item={item} />

        <div className="flex min-w-0 flex-col justify-center gap-1 sm:gap-1.5">
          <p className="truncate text-sm font-bold text-[#0F172A] sm:text-base">
            {item.name}
          </p>
          <p className="text-xs font-medium leading-snug text-[#16A34A] sm:text-sm">
            {item.role}
          </p>
          <p className="flex items-center gap-1 text-xs leading-snug text-[#64748B] sm:text-sm">
            <FaMapMarkerAlt className="shrink-0 text-[10px] text-[#16A34A]/75" />
            <span className="truncate">{item.location}</span>
          </p>
        </div>
      </div>

      <p className="mt-5 border-t border-[#F1F5F9] pt-5 text-sm leading-7 text-[#64748B] sm:mt-6 sm:pt-6 sm:text-[15px] sm:leading-8">
        &ldquo;{item.quote}&rdquo;
      </p>
    </motion.article>
  );
}

function TestimonialCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goNext = () =>
    setActiveSlide((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));

  const goPrev = () =>
    setActiveSlide((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="mx-auto mt-[1cm] w-full max-w-7xl px-[1cm]">
      <div className="relative mx-auto overflow-visible">
        <div className="overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-6"
            >
              {slides[activeSlide].map((item, index) => (
                <TestimonialCard key={item.name} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#16A34A] shadow-sm transition-all duration-300 hover:border-[#16A34A] hover:bg-[#F0FDF4]"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? "w-6 bg-[#16A34A]"
                    : "w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#16A34A] shadow-sm transition-all duration-300 hover:border-[#16A34A] hover:bg-[#F0FDF4]"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Testimonals() {
  return (
    <section className="relative flex flex-col items-center overflow-x-hidden bg-white pb-0 pt-16 sm:pt-20 lg:pt-24">
      <FloatingHeart
        className="absolute left-[6%] top-[14%] text-lg text-[#16A34A]/15 sm:text-xl"
        delay={0}
      />
      <FloatingHeart
        className="absolute right-[8%] top-[18%] rotate-12 text-base text-rose-400/20 sm:text-lg"
        delay={1.2}
      />
      <FloatingHeart
        className="absolute bottom-[20%] left-[10%] -rotate-12 text-base text-[#16A34A]/12 sm:text-lg"
        delay={2}
      />
      <FloatingHeart
        className="absolute bottom-[16%] right-[12%] text-xl text-rose-400/18 sm:text-2xl"
        delay={0.6}
      />
      <FloatingHeart
        className="absolute left-[18%] top-[55%] text-sm text-[#16A34A]/10"
        delay={1.8}
      />
      <FloatingHeart
        className="absolute right-[20%] top-[48%] text-sm text-rose-400/15"
        delay={2.4}
      />

      <Container className="relative z-10 flex w-full flex-col items-center">
        <motion.div
          className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.div
            className="mb-5 flex flex-col items-center justify-center gap-3 sm:mb-6 sm:gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F8EF] text-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.12)] ring-1 ring-[#DCFCE7] sm:h-14 sm:w-14">
              <HiChatBubbleLeftRight className="text-xl sm:text-2xl" />
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#16A34A] sm:text-base">
              Testimonials
            </p>
          </motion.div>

          <h2 className="mx-auto max-w-2xl text-2xl font-bold leading-snug tracking-tight text-[#0F172A] sm:text-3xl md:text-4xl">
            Trusted by people.{" "}
            <span className="text-[#16A34A]">Driven by purpose</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#64748B] sm:mt-6 sm:text-base sm:leading-8">
            Real stories from donors, volunteers, and NGO partners who have
            experienced NourishBridge firsthand — sharing how our platform
            helped them rescue food, reach communities, and make a meaningful
            difference with every meal.
          </p>

          <motion.div
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          >
            <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-base text-amber-400 sm:text-lg"
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-[#0F172A] sm:text-base">
              4.9/5
            </span>

            <span className="hidden h-4 w-px bg-[#E2E8F0] sm:block" aria-hidden="true" />

            <span className="text-sm text-[#64748B] sm:text-base">
              from <span className="font-semibold text-[#0F172A]">2000+</span> reviews
            </span>

            <FaHeart
              className="text-sm text-rose-400/70 sm:text-base"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        <TestimonialCarousel />
      </Container>
    </section>
  );
}
