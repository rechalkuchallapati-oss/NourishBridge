import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToHash from "../routing/ScrollToHash";

const Layout = ({ children }) => {
  return (
    <>
      <ScrollToHash />
      <Navbar />

      <main className="min-h-[60vh] nb-animate-fade-in">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;