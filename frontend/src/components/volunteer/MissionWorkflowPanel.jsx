import { Link, useNavigate } from "react-router-dom";

import {

  FaBuilding,

  FaCheck,

  FaClipboardList,

  FaHandsHelping,

  FaLocationArrow,

  FaMapMarkerAlt,

  FaRoute,

  FaUtensils,

} from "react-icons/fa";

import {

  MISSION_FLOW_STEPS,

  MISSION_STATE_ACTIONS,

  MISSION_STATES,

} from "../../data/volunteerMission";

import DonationProofThumbnail from "../common/DonationProofThumbnail";

import DonationItemsList from "../common/DonationItemsList";

import EventTypeBadge from "../common/EventTypeBadge";

import { DASHBOARD_ROUTES } from "../../constants/routes";

import MissionRouteMap from "./MissionRouteMap";

import { VolunteerSectionTitle } from "./VolunteerSectionShell";

import {

  volunteerInteractive,

  VOLUNTEER_BTN,

  VOLUNTEER_CONTENT_STACK,

  VOLUNTEER_INSET_LINE_GAP,

  VOLUNTEER_LINE_GAP,

} from "./volunteerDashboardStyles";



function getStepIndex(status) {

  return MISSION_FLOW_STEPS.findIndex((step) => step.key === status);

}



function MissionProgressTimeline({ currentIndex }) {

  return (

    <ol className={VOLUNTEER_CONTENT_STACK}>

      {MISSION_FLOW_STEPS.map((step, index) => {

        const isComplete = currentIndex > index;

        const isCurrent = currentIndex === index;

        const isLast = index === MISSION_FLOW_STEPS.length - 1;

        const connectorComplete = currentIndex > index;



        return (

          <li key={step.key} className="flex gap-[0.5cm]">

            <div className="flex flex-col items-center">

              <span

                className={[

                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors",

                  isComplete

                    ? "border-[#16A34A] bg-[#16A34A] text-white"

                    : isCurrent

                      ? "border-[#16A34A] bg-white text-[#16A34A] shadow-[0_0_0_3px_rgba(22,163,74,0.15)]"

                      : "border-[#CBD5E1] bg-[#F1F5F9] text-[#64748B]",

                ].join(" ")}

                aria-current={isCurrent ? "step" : undefined}

              >

                {isComplete ? (

                  <FaCheck className="text-[10px]" aria-hidden="true" />

                ) : (

                  index + 1

                )}

              </span>

              {!isLast ? (

                <span

                  className={[

                    "my-[0.5cm] w-0.5 min-h-[0.5cm] flex-1",

                    connectorComplete ? "bg-[#16A34A]" : "bg-[#CBD5E1]",

                  ].join(" ")}

                  aria-hidden="true"

                />

              ) : null}

            </div>



            <div className="min-w-0 flex-1">

              <p

                className={[

                  "text-sm leading-relaxed",

                  isComplete

                    ? "font-semibold text-[#15803D]"

                    : isCurrent

                      ? "font-bold text-[#0F172A]"

                      : "font-medium text-[#64748B]",

                ].join(" ")}

              >

                {step.label}

              </p>

              {isCurrent ? (

                <p className={`${VOLUNTEER_INSET_LINE_GAP} text-xs text-[#16A34A]`}>In progress</p>

              ) : null}

            </div>

          </li>

        );

      })}

    </ol>

  );

}



export default function MissionWorkflowPanel({

  mission,

  onAdvance,

  onComplete,

}) {

  const navigate = useNavigate();



  if (!mission) {

    return (

      <section className="rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center">

        <p className="text-sm font-semibold text-[#64748B]">No active mission</p>

        <p className={`${VOLUNTEER_INSET_LINE_GAP} text-sm leading-relaxed text-[#94A3B8]`}>

          Accept a pickup request to begin the full rescue workflow.

        </p>

      </section>

    );

  }



  const currentIndex = getStepIndex(mission.status);

  const action = MISSION_STATE_ACTIONS[mission.status];

  const showArrivedAtDonor = mission.status === MISSION_STATES.EN_ROUTE_TO_DONOR;



  const handlePrimaryAction = () => {

    if (!action) return;



    if (action.type === "navigate" && action.to) {

      navigate(action.to);

      return;

    }



    if (action.next === MISSION_STATES.COMPLETED) {

      onComplete?.();

      return;

    }



    onAdvance?.(action.next);

  };



  const handleArrivedAtDonor = () => {

    onAdvance?.(MISSION_STATES.ARRIVED_AT_DONOR);

  };



  return (

    <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">

      <div className={VOLUNTEER_CONTENT_STACK}>

        <VolunteerSectionTitle

          title="Mission Progress"

          subtitle="Follow each step — only one action is available at a time."

          theme="emerald"

          icon={FaClipboardList}

          compact

        />

        <MissionProgressTimeline currentIndex={currentIndex} />

      </div>



      <div className={VOLUNTEER_CONTENT_STACK}>

        <div className={VOLUNTEER_CONTENT_STACK}>

          <VolunteerSectionTitle title="Pickup" theme="green" icon={FaBuilding} compact />

          <p className="text-sm font-bold leading-relaxed text-[#0F172A]">{mission.donorName}</p>

          <p className="flex items-start gap-1.5 text-sm leading-relaxed text-[#64748B]">

            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />

            {mission.pickupAddress}

          </p>

        </div>



        <div className={VOLUNTEER_CONTENT_STACK}>

          <VolunteerSectionTitle title="Food Details" theme="amber" icon={FaUtensils} compact />

          <div className="flex items-start gap-[0.5cm]">

            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC] sm:h-28 sm:w-28">

              <DonationProofThumbnail record={mission} />

            </div>

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <p className="text-sm font-bold text-[#0F172A]">{mission.foodName}</p>

                <EventTypeBadge eventType={mission.eventType} />

              </div>

              {mission.eventName ? (

                <p className={`${VOLUNTEER_LINE_GAP} text-sm leading-relaxed text-[#64748B]`}>

                  {mission.eventName}

                </p>

              ) : null}

              <DonationItemsList record={mission} className={VOLUNTEER_LINE_GAP} maxItems={5} />

              <p className={`${VOLUNTEER_LINE_GAP} flex items-center gap-1.5 text-sm leading-relaxed text-[#64748B]`}>

                <FaUtensils className="text-[#16A34A]" aria-hidden="true" />

                ~{mission.estimatedMeals} meals

              </p>

            </div>

          </div>

        </div>



        <div className={VOLUNTEER_CONTENT_STACK}>

          <VolunteerSectionTitle title="Deliver To" theme="blue" icon={FaHandsHelping} compact />

          <p className="text-sm font-bold leading-relaxed text-[#0F172A]">{mission.ngoName}</p>

          <p className="flex items-start gap-1.5 text-sm leading-relaxed text-[#64748B]">

            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />

            {mission.ngoAddress}

          </p>

        </div>



        <MissionRouteMap

          pickupLabel="Pickup"

          ngoLabel="NGO"

          distanceKm={mission.journeyDistanceKm}

        />



        <div className={`flex flex-col ${VOLUNTEER_CONTENT_STACK} sm:flex-row`}>

          <Link

            to={DASHBOARD_ROUTES.volunteerRoute}

            className={[

              VOLUNTEER_BTN,

              "flex-1 border border-[#E5E7EB] bg-white text-[#475569]",

              volunteerInteractive.buttonOutline,

            ].join(" ")}

          >

            <FaLocationArrow className="text-xl" aria-hidden="true" />

            Open Navigation

          </Link>

          {showArrivedAtDonor ? (

            <button

              type="button"

              onClick={handleArrivedAtDonor}

              className={[

                VOLUNTEER_BTN,

                "flex-1 bg-[#16A34A] text-white",

                volunteerInteractive.button,

              ].join(" ")}

            >

              <FaMapMarkerAlt className="text-xl" aria-hidden="true" />

              I Have Arrived at Donor

            </button>

          ) : action ? (

            <button

              type="button"

              onClick={handlePrimaryAction}

              className={[

                VOLUNTEER_BTN,

                "flex-1 bg-[#16A34A] text-white",

                volunteerInteractive.button,

              ].join(" ")}

            >

              {action.label}

            </button>

          ) : null}

        </div>

      </div>

    </div>

  );

}

