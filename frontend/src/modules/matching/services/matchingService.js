import matchingApi from "../api/client.js";

export async function fetchNgoMatches(donationId) {
  const { data } = await matchingApi.scoreNgos(donationId);
  return (data.data.matches || []).map((m) => ({
    ...m,
    id: m.ngoId,
    name: m.ngoName,
    matchScore: m.score,
    matchLabel: `${m.score}% Match`,
  }));
}

export async function fetchVolunteerMatches(donationId) {
  const { data } = await matchingApi.scoreVolunteers(donationId);
  return (data.data.matches || []).map((m) => ({
    ...m,
    id: m.volunteerId,
    matchScore: m.score,
    matchLabel: `${m.score}% Match`,
  }));
}

export default { fetchNgoMatches, fetchVolunteerMatches };
