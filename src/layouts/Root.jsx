import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../utility/ScrollToTop";

const Root = () => {
  return (
    <>
      <ScrollToTop />
      <header>
        <Navbar />
      </header>
      <main className="bg-base-200">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Root;
