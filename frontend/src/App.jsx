import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthPromptProvider } from "./context/AuthPromptContext.jsx";
import AuthBootstrap from "./components/auth/AuthBootstrap.jsx";
import AccessDeniedListener from "./components/auth/AccessDeniedListener.jsx";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AuthPromptProvider>
        <AuthBootstrap>
          <AccessDeniedListener />
          <AppRoutes />
        </AuthBootstrap>
      </AuthPromptProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            maxWidth: "420px",
          },
          success: {
            iconTheme: { primary: "#16A34A", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#DC2626", secondary: "#fff" },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
