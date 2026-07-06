import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaFacebookF,
  FaHandshake,
  FaHeart,
  FaInstagram,
  FaLeaf,
  FaLinkedinIn,
  FaPaperPlane,
  FaShieldAlt,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import BrandLogo, { BRAND_TAGLINE } from "../common/BrandLogo";

const LINE_GAP = "space-y-[0.5cm]";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Donate Food", to: "/donate" },
  { label: "NGOs", to: "/ngo" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Contact Us", to: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Twitter (X)", href: "https://twitter.com", icon: FaXTwitter },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
];

const donorLinks = [
  { label: "How to Donate", to: "/donate" },
  { label: "Food Guidelines", to: "/food-guidelines" },
  { label: "Impact & Stories", to: "/#impact" },
  { label: "FAQs", to: "/faqs" },
];

const ngoLinks = [
  { label: "Partner With Us", to: "/ngo" },
  { label: "NGO Resources", to: "/ngo-resources" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "FAQs", to: "/ngo-faqs" },
];

const resourceLinks = [
  { label: "Blog", to: "/blog" },
  { label: "News & Updates", to: "/news" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const columnHeadingClass =
  "text-sm font-bold leading-tight text-[#0F172A] sm:text-[15px]";

const columnHeadingOffset = "pt-[1cm]";

const linkClassName =
  "group inline-flex items-center gap-1.5 text-[11px] font-medium leading-tight text-[#64748B] transition-colors duration-300 hover:text-[#16A34A] sm:text-xs";

function FooterLinkList({ links }) {
  return (
    <ul className={LINE_GAP}>
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link to={to} className={linkClassName}>
            <FaChevronRight className="shrink-0 text-[8px] text-[#16A34A] transition-transform duration-300 group-hover:translate-x-0.5" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterLinkColumn({ heading, links }) {
  return (
    <div className={`min-w-0 flex-1 ${columnHeadingOffset}`}>
      <h3 className={columnHeadingClass}>{heading}</h3>
      <div className="mt-[0.5cm]">
        <FooterLinkList links={links} />
      </div>
    </div>
  );
}

function FooterStayConnectedColumn() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`min-w-0 flex-1 lg:max-w-[190px] xl:max-w-[210px] ${columnHeadingOffset}`}>
      <h3 className={columnHeadingClass}>Stay Connected</h3>

      <div className={`mt-[0.5cm] ${LINE_GAP}`}>
        <p className="text-[10px] leading-4 text-[#64748B] sm:text-[11px] sm:leading-5">
          Subscribe to our newsletter for updates and inspiring stories.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
        >
          <input
            type="email"
            name="email"
            required
            aria-label="Email address"
            placeholder="Enter your email"
            className="min-w-0 flex-1 rounded-none border-none bg-transparent px-2 py-2 text-[10px] text-[#0F172A] outline-none placeholder:text-[#94A3B8] sm:px-2.5 sm:text-[11px]"
          />
          <button
            type="submit"
            aria-label="Subscribe to newsletter"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-[#16A34A] text-white transition-colors duration-300 hover:bg-[#15803D] sm:h-9 sm:w-9"
          >
            <FaPaperPlane className="text-[10px] sm:text-xs" />
          </button>
        </form>

        <p className="text-[10px] leading-4 text-[#64748B]">
          🔒 We respect your privacy.
        </p>
      </div>
    </div>
  );
}

function FooterBrandColumn() {
  return (
    <div className="min-w-0 flex-1 lg:max-w-[200px] xl:max-w-[220px]">
      <div className="flex items-center gap-2.5">
        <BrandLogo size="compact" showTagline={false} />
      </div>

      <div className={`mt-[0.5cm] ${LINE_GAP}`}>
        <p className="text-[10px] font-medium tracking-wide text-[#64748B] sm:text-[11px]">
          {BRAND_TAGLINE}
        </p>

        <p className="text-[10px] leading-4 text-[#64748B] sm:text-[11px] sm:leading-5">
          &ldquo;NourishBridge is a smart food redistribution platform
          connecting donors, NGOs and volunteers to reduce food waste and end
          hunger.&rdquo;
        </p>

        <div className="flex flex-nowrap items-center gap-1.5">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-[0_2px_8px_rgba(22,163,74,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#15803D] sm:h-7 sm:w-7"
            >
              <Icon className="text-[9px] sm:text-[10px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterQuickLinksColumn() {
  return (
    <div className={`min-w-0 flex-1 ${columnHeadingOffset}`}>
      <h3 className={columnHeadingClass}>Quick Links</h3>
      <div className="mt-[0.5cm]">
        <FooterLinkList links={quickLinks} />
      </div>
    </div>
  );
}

const featureBlocks = [
  {
    icon: FaHandshake,
    title: "100% Transparency",
    description: "Every donation is tracked and shared.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified Partners",
    description: "All NGOs and volunteers are verified.",
  },
  {
    icon: FaLeaf,
    title: "Sustainable Impact",
    description: "Building a better tomorrow for everyone.",
  },
  {
    icon: FaUsers,
    title: "Community Driven",
    description: "Together, we create a stronger impact.",
  },
];

function FooterFeatureBlock({ icon: Icon, title, description }) {
  return (
    <div className="group flex flex-col items-center px-2 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 sm:py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-[0_3px_12px_rgba(22,163,74,0.22)] transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9">
        <Icon className="text-xs sm:text-sm" />
      </div>
      <h4 className="mt-[0.5cm] text-[11px] font-bold leading-tight text-[#0F172A] sm:text-xs">
        {title}
      </h4>
      <p className="mt-[0.5cm] max-w-[160px] text-[9px] leading-4 text-[#64748B] sm:text-[10px]">
        {description}
      </p>
    </div>
  );
}

function FooterFeatureBar() {
  return (
    <div className="mt-[1cm] rounded-[22px] border border-[#E5F5E8] bg-[#F0FAF4] p-3 shadow-[0_4px_24px_rgba(22,163,74,0.06)] sm:p-4">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
        {featureBlocks.map((block) => (
          <FooterFeatureBlock key={block.title} {...block} />
        ))}
      </div>
    </div>
  );
}

function FooterDivider() {
  return (
    <div className="relative my-[0.5cm] flex items-center sm:my-4">
      <div className="h-px flex-1 bg-[#E5F5E8]" aria-hidden="true" />
      <div className="mx-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] shadow-[0_2px_12px_rgba(22,163,74,0.1)]">
        <FaHeart className="text-sm text-[#16A34A]" />
      </div>
      <div className="h-px flex-1 bg-[#E5E7EB]" aria-hidden="true" />
    </div>
  );
}

function FooterCopyrightRow() {
  return (
    <div className="flex flex-col items-center justify-between gap-[0.5cm] text-center text-[10px] text-[#64748B] sm:flex-row sm:text-left sm:text-xs">
      <p>© 2024 NourishBridge Foundation. All rights reserved.</p>
      <p>Made with 💚 for a hunger-free world.</p>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="mt-[1cm] bg-[#F4FAF7]">
      <div
        className="mx-auto max-w-[1400px] rounded-t-[32px] border border-[#E5F5E8] px-10 py-12 shadow-[0_-10px_40px_rgba(22,163,74,0.07)]"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FAFFFB 45%, #F3FBF6 100%)",
        }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-4 xl:gap-5">
          <FooterBrandColumn />
          <FooterQuickLinksColumn />
          <FooterLinkColumn heading="For Donors" links={donorLinks} />
          <FooterLinkColumn heading="For NGOs" links={ngoLinks} />
          <FooterLinkColumn heading="Resources" links={resourceLinks} />
          <FooterStayConnectedColumn />
        </div>

        <FooterFeatureBar />
        <FooterDivider />
        <FooterCopyrightRow />
      </div>
    </footer>
  );
};

export default Footer;
