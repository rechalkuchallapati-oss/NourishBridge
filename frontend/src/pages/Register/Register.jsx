import { Navigate } from "react-router-dom";

/** Register route — redirects to login create-account tab. */
export default function Register() {
  return <Navigate to="/login" replace state={{ tab: "create" }} />;
}
