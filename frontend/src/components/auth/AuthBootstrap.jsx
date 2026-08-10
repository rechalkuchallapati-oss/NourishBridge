import { useAuth } from "../../context/AuthContext.jsx";
import AuthLoadingScreen from "./AuthLoadingScreen.jsx";

/**
 * App-level gate — blocks route rendering until session restore completes.
 */
export default function AuthBootstrap({ children }) {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <AuthLoadingScreen fullPage />;
  }

  return children;
}
