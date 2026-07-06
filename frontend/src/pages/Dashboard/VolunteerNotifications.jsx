import VolunteerLayout from "../../components/dashboard/VolunteerLayout";

const NOTIFICATIONS = [
  { id: 1, title: "New pickup nearby", body: "Veg Biryani — 2.4 km from you. Pickup before 4:30 PM.", unread: true },
  { id: 2, title: "Mission reminder", body: "Tech Conference Center pickup scheduled for 5:00 PM.", unread: true },
  { id: 3, title: "NGO confirmed receipt", body: "Helping Hands Foundation verified yesterday's delivery.", unread: false },
];

export default function VolunteerNotifications() {
  return (
    <VolunteerLayout unreadNotifications={2}>
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Notifications</h1>
        <ul className="mt-3 space-y-2">
          {NOTIFICATIONS.map((item) => (
            <li
              key={item.id}
              className={`rounded-none border p-3 text-xs ${item.unread ? "border-[#DCFCE7] bg-[#F0FDF4]" : "border-[#E5E7EB]"}`}
            >
              <p className="font-semibold text-[#0F172A]">{item.title}</p>
              <p className="mt-1 text-[#64748B]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </VolunteerLayout>
  );
}
