import { Outlet } from "react-router-dom";
import { VolunteerMissionProvider } from "../../context/VolunteerMissionContext";
import VolunteerLayout from "./VolunteerLayout";

export default function VolunteerShell() {
  return (
    <VolunteerMissionProvider>
      <VolunteerLayout>
        <Outlet />
      </VolunteerLayout>
    </VolunteerMissionProvider>
  );
}
