import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {

  FaCheck,

  FaClock,

  FaExclamationTriangle,

  FaLocationArrow,

  FaMapMarkerAlt,

  FaRoute,

  FaShieldAlt,

  FaTruck,

} from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";

import VolunteerLiveRouteMap from "../../components/volunteer/VolunteerLiveRouteMap";

import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";

import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";

import {

  getRouteContext,

  ROUTE_ISSUE_OPTIONS,

  ROUTE_PROGRESS_STEPS,

} from "../../data/volunteerRouteDetails";

import { isDeliveryPhase } from "../../data/volunteerDeliveryDetails";

import { DASHBOARD_ROUTES } from "../../constants/routes";

import {

  volunteerInteractive,

  VOLUNTEER_BTN,

  VOLUNTEER_BTN_COMPACT,

  VOLUNTEER_CONTENT_STACK,

  VOLUNTEER_INSET_LINE_GAP,

  VOLUNTEER_PAGE_SECTION_GAP,

} from "../../components/volunteer/volunteerDashboardStyles";



function RouteProgressTimeline({ currentIndex }) {

  return (

    <ol className={`flex flex-col ${VOLUNTEER_CONTENT_STACK} sm:flex-row sm:items-start sm:justify-between sm:gap-[0.5cm]`}>

      {ROUTE_PROGRESS_STEPS.map((step, index) => {

        const isComplete = currentIndex > index;

        const isCurrent = currentIndex === index;

        const isLast = index === ROUTE_PROGRESS_STEPS.length - 1;



        return (

          <li

            key={step.id}

            className="flex flex-1 items-start gap-[0.5cm] sm:flex-col sm:items-center sm:text-center"

          >

            <div className="flex flex-col items-center sm:w-full">

              <span

                className={[

                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold",

                  isComplete

                    ? "border-[#16A34A] bg-[#16A34A] text-white"

                    : isCurrent

                      ? "border-[#2563EB] bg-white text-[#2563EB] shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"

                      : "border-[#CBD5E1] bg-[#F1F5F9] text-[#94A3B8]",

                ].join(" ")}

              >

                {isComplete ? <FaCheck className="text-[11px]" aria-hidden="true" /> : index + 1}

              </span>

              {!isLast ? (

                <span

                  className={[

                    "my-[0.5cm] h-[0.5cm] w-0.5 sm:my-[0.5cm] sm:h-0.5 sm:w-full sm:max-w-[80px]",

                    isComplete ? "bg-[#16A34A]" : "bg-[#CBD5E1]",

                  ].join(" ")}

                  aria-hidden="true"

                />

              ) : null}

            </div>

            <p

              className={[

                "text-sm leading-relaxed sm:px-1",

                isComplete

                  ? "font-semibold text-[#15803D]"

                  : isCurrent

                    ? "font-bold text-[#0F172A]"

                    : "text-[#64748B]",

              ].join(" ")}

            >

              {step.label}

            </p>

          </li>

        );

      })}

    </ol>

  );

}



export default function VolunteerRouteNavigation() {

  const navigate = useNavigate();

  const { activeMission, setMissionStatus } = useVolunteerMissionContext();

  const route = getRouteContext(activeMission);

  const [reportedIssues, setReportedIssues] = useState({});

  const [showIssuePanel, setShowIssuePanel] = useState(false);



  const handleOpenNavigation = () => {

    toast.success("Opening maps navigation (demo).");

  };



  const handleReportIssue = (issueId) => {

    setReportedIssues((prev) => ({ ...prev, [issueId]: !prev[issueId] }));

    setShowIssuePanel(true);

    toast("Issue logged — dispatch notified in production.", { icon: "⚠️" });

  };



  const handlePrimaryAction = () => {

    if (!route) return;

    const { primaryAction } = route;



    if (primaryAction.navigateTo) {

      navigate(primaryAction.navigateTo);

      return;

    }



    if (primaryAction.next) {

      setMissionStatus(primaryAction.next);

      toast.success("Route status updated.");

    }

  };



  if (!route) {

    return (

      <>

        <Toaster position="top-center" />

        <VolunteerSectionShell accent="blue">

          <VolunteerSectionTitle

            heading="h1"

            title="Route & Navigation"

            subtitle="Accept an active mission to view live route, ETA, and navigation."

            theme="blue"

            icon={FaRoute}

          />

          <Link

            to={DASHBOARD_ROUTES.volunteerPickups}

            className={[

              VOLUNTEER_BTN,

              "inline-flex bg-[#2563EB] text-white",

              volunteerInteractive.button,

            ].join(" ")}

          >

            View Available Pickups

          </Link>

        </VolunteerSectionShell>

      </>

    );

  }



  const dest = route.nextDestination;

  const headingToNgo = isDeliveryPhase(route.status) || dest.type === "ngo";



  return (

    <>

      <Toaster position="top-center" />

      <div className={VOLUNTEER_PAGE_SECTION_GAP}>

        <VolunteerSectionShell accent="blue">

          <VolunteerSectionTitle

            heading="h1"

            title={`Route & Navigation · Mission #${route.displayMissionId}`}

            subtitle={`${route.stageLabel} — live movement screen with pickup verification and NGO handover on their own pages.`}

            theme="blue"

            icon={FaRoute}

          />

        </VolunteerSectionShell>



        <section className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_8px_32px_rgba(37,99,235,0.08)]">

          <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]">

            <VolunteerLiveRouteMap

              pickupLabel={route.pickupLabel}

              ngoLabel={route.ngoLabel}

              distanceKm={route.totalDistanceKm}

              progress={route.mapProgress}

              headingToNgo={headingToNgo}

            />



            <aside className={`flex flex-col border-t border-[#E5E7EB] p-[0.5cm] lg:border-l lg:border-t-0 ${VOLUNTEER_CONTENT_STACK}`}>

              <VolunteerSectionTitle

                title="Next Destination"

                theme="blue"

                icon={FaMapMarkerAlt}

                compact

              />

              <div className="flex flex-wrap items-center gap-2">

                <p className="text-base font-bold leading-relaxed text-[#0F172A]">{dest.name}</p>

                {dest.verified ? (

                  <FaShieldAlt className="text-[#16A34A]" title="Verified" aria-label="Verified destination" />

                ) : null}

              </div>

              <p className="flex items-start gap-1.5 text-sm leading-relaxed text-[#64748B]">

                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />

                {dest.address}

              </p>



              <dl className={VOLUNTEER_CONTENT_STACK}>

                <div>

                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Distance</dt>

                  <dd className={`${VOLUNTEER_INSET_LINE_GAP} text-2xl font-extrabold text-[#0F172A]`}>

                    {dest.distanceKm} km

                  </dd>

                </div>

                <div>

                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">ETA</dt>

                  <dd className={`${VOLUNTEER_INSET_LINE_GAP} text-2xl font-extrabold text-[#2563EB]`}>

                    {dest.eta}

                  </dd>

                </div>

                <div>

                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Deadline</dt>

                  <dd

                    className={`${VOLUNTEER_INSET_LINE_GAP} flex items-center gap-1.5 text-base font-bold text-[#B45309]`}

                  >

                    <FaClock aria-hidden="true" />

                    {dest.deadline}

                  </dd>

                </div>

              </dl>



              <button

                type="button"

                onClick={handleOpenNavigation}

                className={[

                  VOLUNTEER_BTN,

                  "mt-auto w-full bg-[#2563EB] text-white",

                  volunteerInteractive.button,

                ].join(" ")}

              >

                <FaLocationArrow className="text-xl" aria-hidden="true" />

                Open Navigation

              </button>

            </aside>

          </div>

        </section>



        <VolunteerSectionShell accent="blue">

          <VolunteerSectionTitle

            title="Route Progress Timeline"

            subtitle={`Current stage: ${route.statusLabel}`}

            theme="blue"

            icon={FaRoute}

            compact

          />

          <RouteProgressTimeline currentIndex={route.routeProgressIndex} />

        </VolunteerSectionShell>



        <div className={`grid ${VOLUNTEER_CONTENT_STACK} lg:grid-cols-2`}>

          <VolunteerSectionShell accent="blue">

            <VolunteerSectionTitle title="Transport Requirements" theme="emerald" icon={FaTruck} compact />

            <ul className={VOLUNTEER_CONTENT_STACK}>

              {route.transportRequirements.map((item) => (

                <li

                  key={item}

                  className="flex items-start gap-[0.5cm] text-sm leading-relaxed text-[#475569]"

                >

                  <FaRoute className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />

                  {item}

                </li>

              ))}

            </ul>

          </VolunteerSectionShell>



          <VolunteerSectionShell accent="blue">

            <VolunteerSectionTitle title="Route / Delay Status" theme="amber" icon={FaClock} compact />

            <div

              className={[

                route.routeStatus.severity === "good"

                  ? "border-[#BBF7D0] bg-[#F0FDF4]"

                  : "border-[#E5E7EB] bg-[#F8FAFC]",

                "rounded-none border p-[0.5cm]",

              ].join(" ")}

            >

              <p className="text-sm font-bold leading-relaxed text-[#0F172A]">{route.routeStatus.label}</p>

              <p className={`${VOLUNTEER_INSET_LINE_GAP} text-sm leading-relaxed text-[#64748B]`}>

                {route.routeStatus.detail}

              </p>

            </div>

            {showIssuePanel && Object.keys(reportedIssues).some((k) => reportedIssues[k]) ? (

              <p

                className={`${VOLUNTEER_INSET_LINE_GAP} flex items-center gap-1.5 text-xs font-medium text-[#B45309]`}

              >

                <FaExclamationTriangle aria-hidden="true" />

                Active issue report — monitor ETA closely.

              </p>

            ) : null}

          </VolunteerSectionShell>

        </div>



        {showIssuePanel ? (

          <section

            className={`rounded-none border border-[#FECACA] bg-[#FEF2F2] p-[0.5cm] ${VOLUNTEER_CONTENT_STACK}`}

          >

            <p className="text-sm font-bold text-[#B91C1C]">Report an issue</p>

            <div className="flex flex-wrap gap-[0.5cm]">

              {ROUTE_ISSUE_OPTIONS.map((issue) => (

                <button

                  key={issue.id}

                  type="button"

                  onClick={() => handleReportIssue(issue.id)}

                  className={[

                    VOLUNTEER_BTN_COMPACT,

                    reportedIssues[issue.id]

                      ? "border border-[#B91C1C] bg-white text-[#B91C1C]"

                      : "border border-[#FECACA] bg-white text-[#64748B]",

                    volunteerInteractive.buttonOutline,

                  ].join(" ")}

                >

                  {issue.label}

                </button>

              ))}

            </div>

          </section>

        ) : null}



        <div

          className={`flex flex-col rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:flex-row sm:items-stretch sm:justify-between ${VOLUNTEER_CONTENT_STACK}`}

        >

          <button

            type="button"

            onClick={() => setShowIssuePanel((prev) => !prev)}

            className={[

              VOLUNTEER_BTN,

              "border border-[#E5E7EB] bg-white text-[#475569] sm:flex-1",

              volunteerInteractive.buttonOutline,

            ].join(" ")}

          >

            <FaExclamationTriangle className="text-xl" aria-hidden="true" />

            Report Issue

          </button>

          <button

            type="button"

            onClick={handlePrimaryAction}

            className={[

              VOLUNTEER_BTN,

              "flex-1 bg-[#16A34A] text-white sm:max-w-lg",

              volunteerInteractive.button,

            ].join(" ")}

          >

            <FaMapMarkerAlt className="text-xl" aria-hidden="true" />

            {route.primaryAction.label}

          </button>

        </div>

      </div>

    </>

  );

}

