import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaInbox } from "react-icons/fa";
import DeclineDonationModal from "../../components/ngo/DeclineDonationModal";
import DonationDetailsModal from "../../components/ngo/DonationDetailsModal";
import IncomingDonationCard from "../../components/ngo/IncomingDonationCard";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { INCOMING_DONATIONS } from "../../data/ngoIncomingDonations";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const STORAGE_KEY = "nb_ngo_incoming_actions";

function loadPersistedActions() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { accepted: [], declined: [] };
  } catch {
    return { accepted: [], declined: [] };
  }
}

function savePersistedActions(actions) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
}

export default function NGOIncomingDonations() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [actions, setActions] = useState(loadPersistedActions);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [detailsTarget, setDetailsTarget] = useState(null);

  const pendingDonations = useMemo(
    () =>
      INCOMING_DONATIONS.filter(
        (donation) =>
          !actions.accepted.includes(donation.id) &&
          !actions.declined.some((item) => item.id === donation.id),
      ),
    [actions],
  );

  const handleAccept = (donation) => {
    const next = {
      ...actions,
      accepted: [...actions.accepted, donation.id],
    };
    setActions(next);
    savePersistedActions(next);
    toast.success(`${donation.id} accepted — volunteer coordination started.`);
  };

  const handleDeclineConfirm = (donationId, payload) => {
    const next = {
      ...actions,
      declined: [...actions.declined, { id: donationId, ...payload }],
    };
    setActions(next);
    savePersistedActions(next);
    setDeclineTarget(null);
  };

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={5}>
      <Toaster position="top-center" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="relative flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaInbox}
            title="Incoming Donations"
            description="Review and action donation requests. Accept to begin logistics, or decline with a required reason for audit and donor communication."
            actions={
              <span className="inline-flex rounded-none bg-[#2563EB] px-4 py-2 text-sm font-bold text-white">
                {pendingDonations.length} pending
              </span>
            }
          />

          {pendingDonations.length === 0 ? (
            <div className="rounded-none border border-[#DCFCE7] bg-[#F0FDF4] p-[0.5cm] text-center">
              <p className="font-semibold text-[#15803D]">All caught up!</p>
              <p className="mt-[0.3cm] text-sm text-[#64748B]">
                No donations awaiting review. New requests will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-[0.5cm]">
              {pendingDonations.map((donation, index) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index, ease: EASE }}
                >
                  <IncomingDonationCard
                    donation={donation}
                    onAccept={handleAccept}
                    onDecline={setDeclineTarget}
                    onViewDetails={setDetailsTarget}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {(actions.accepted.length > 0 || actions.declined.length > 0) && (
            <div className="mt-[0.5cm] rounded-none border border-[#E5E7EB] bg-white p-[0.5cm]">
              <p className="text-sm font-semibold text-[#0F172A]">Session actions</p>
              <p className="mt-[0.3cm] text-sm text-[#64748B]">
                Accepted: {actions.accepted.length} · Declined: {actions.declined.length}
              </p>
            </div>
          )}
        </div>
      </motion.section>

      {declineTarget ? (
        <DeclineDonationModal
          donation={declineTarget}
          onClose={() => setDeclineTarget(null)}
          onConfirm={handleDeclineConfirm}
        />
      ) : null}

      {detailsTarget ? (
        <DonationDetailsModal
          donation={detailsTarget}
          onClose={() => setDetailsTarget(null)}
          onAccept={handleAccept}
          onDecline={setDeclineTarget}
        />
      ) : null}
    </NGOLayout>
  );
}
