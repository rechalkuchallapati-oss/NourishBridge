import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] nb-animate-fade-in">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;