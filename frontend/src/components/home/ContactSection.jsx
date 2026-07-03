import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPaperPlane,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import Container from "../common/Container";
import volunteersBuildingImage from "../../assets/images/nourishbridge-volunteers-building.jpg";

const EASE = [0.22, 1, 0.36, 1];

const inputClassName =
  "box-border h-[1cm] w-full rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 text-sm text-[#0F172A] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#16A34A] focus:bg-white focus:ring-1 focus:ring-[#16A34A]/20";

const messageClassName =
  "box-border h-[0.85in] w-full resize-none rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm text-[#0F172A] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#16A34A] focus:bg-white focus:ring-1 focus:ring-[#16A34A]/20";

const contactDetails = [
  {
    icon: FaPhoneAlt,
    tag: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: FaEnvelope,
    tag: "Email Us",
    value: "support@nourishbridge.com",
    href: "mailto:support@nourishbridge.com",
  },
  {
    icon: FaMapMarkerAlt,
    tag: "Visit Us",
    value: "NourishBridge Foundation, HYD, Telangana, India",
    href: null,
  },
];

function ContactInfoBlock({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="group flex w-full flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8EF] text-[#16A34A] transition-colors duration-300 group-hover:bg-[#16A34A] group-hover:text-white">
          <Icon className="text-base" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F172A]">
          {item.tag}
        </p>
      </div>

      {item.href ? (
        <a
          href={item.href}
          className="mt-2.5 text-sm leading-6 text-[#64748B] transition-colors duration-300 hover:text-[#16A34A]"
        >
          {item.value}
        </a>
      ) : (
        <p className="mt-2.5 text-sm leading-6 text-[#64748B]">
          {item.value}
        </p>
      )}
    </motion.div>
  );
}

function FoundationImagePanel() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-[200px] shrink-0 flex-col items-center lg:max-w-[220px]"
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
    >
      <div className="relative h-[120px] w-full overflow-hidden rounded-none border border-[#E5E7EB] shadow-[0_4px_20px_rgba(15,23,42,0.06)] sm:h-[130px]">
        <img
          src={volunteersBuildingImage}
          alt="Volunteers donating food with NourishBridge building in the background"
          className="h-full w-full object-cover object-[center_35%]"
        />
      </div>
      <div className="mt-2 shrink-0 text-center">
        <h4 className="text-sm font-bold leading-tight text-[#0F172A]">
          NourishBridge
        </h4>
        <p className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
          Foundation, Hyderabad, India
        </p>
      </div>
    </motion.div>
  );
}

function ContactFormPanel() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="mx-auto flex w-full max-w-[300px] shrink-0 flex-col items-center rounded-none border border-[#E5E7EB] bg-white p-3 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)] sm:max-w-[320px] sm:p-4"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[#E8F8EF] text-[#16A34A] ring-1 ring-[#DCFCE7]">
          <HiChatBubbleBottomCenterText className="text-base" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">
            Send us a message
          </h3>
          <p className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
            Fill out the form and we&apos;ll get back to you soon.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-3 w-full space-y-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            aria-label="Your name"
            placeholder="Your Name"
            className={inputClassName}
          />
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            aria-label="Your email"
            placeholder="Your Email"
            className={inputClassName}
          />
        </div>

        <input
          id="contact-subject"
          type="text"
          name="subject"
          required
          aria-label="Subject"
          placeholder="Subject"
          className={inputClassName}
        />

        <textarea
          id="contact-message"
          name="message"
          required
          aria-label="Message"
          placeholder="Your Message"
          className={messageClassName}
        />

        <button
          type="submit"
          className="group box-border inline-flex h-[1cm] w-full items-center justify-center gap-2 rounded-none bg-[#16A34A] text-xs font-semibold text-white transition-all duration-300 hover:bg-[#15803D] active:scale-[0.98] sm:text-sm"
        >
          Send Message
          <FaPaperPlane className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </form>
    </motion.div>
  );
}

function ContactFormLayout() {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-fit flex-col items-center justify-center gap-8 text-center sm:mt-14 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex w-full max-w-[240px] flex-col items-center gap-5">
        {contactDetails.map((item, index) => (
          <ContactInfoBlock key={item.tag} item={item} index={index} />
        ))}
      </div>

      <ContactFormPanel />

      <FoundationImagePanel />
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="relative mb-[1cm] flex flex-col items-center overflow-x-hidden bg-white pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
      <Container className="relative z-10 flex w-full flex-col items-center">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.div
            className="mb-5 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">
              ✉️
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F8EF] text-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.12)] ring-1 ring-[#DCFCE7] sm:h-14 sm:w-14">
              <FaEnvelope className="text-xl sm:text-2xl" />
            </div>
            <span className="text-xl sm:text-2xl" aria-hidden="true">
              💬
            </span>
          </motion.div>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              className="hidden h-px w-8 bg-gradient-to-r from-transparent to-[#16A34A]/40 sm:block sm:w-12"
              aria-hidden="true"
            />
            <span className="text-lg text-[#94A3B8]" aria-hidden="true">
              —
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#16A34A] sm:text-base">
              Contact Us
            </p>
            <span className="text-lg text-[#94A3B8]" aria-hidden="true">
              —
            </span>
            <span
              className="hidden h-px w-8 bg-gradient-to-l from-transparent to-[#16A34A]/40 sm:block sm:w-12"
              aria-hidden="true"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-snug tracking-tight text-[#0F172A] sm:mt-6 sm:text-3xl md:text-4xl">
            We would love to{" "}
            <span className="text-[#16A34A]">hear from you</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748B] sm:mt-6 sm:text-base sm:leading-8">
            We&apos;re always happy to receive your messages, questions, and
            queries. Whether you want to partner with us, volunteer, donate food,
            or simply learn more — reach out and our team will get back to you
            with care.
          </p>
        </motion.div>

        <ContactFormLayout />
      </Container>
    </section>
  );
}
