import imgtop from "../../assets/Footer Design Top.png";
import imgup from "../../assets/Footer Design Up.png";
import logo from "/Logo.png";
import footerimg from "../../assets/Footer Image.png";
import imgdown from "../../assets/Footer Design Down.png";
import useAuth from "../../hooks/useAuth";
import {
  FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  FaPinterest,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoHome, IoSend } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";

const Footer = () => {
  const { theme } = useAuth();
  const links = [
    [
      <FaFacebook className="relative z-10 text-xl lg:text-2xl fill-current transition-colors duration-300 group-hover:text-white" />,
      "bg-[#1877F2]",
    ],
    [
      <FaInstagramSquare className="relative z-10 text-xl lg:text-2xl fill-current transition-colors duration-300 group-hover:text-white" />,
      "bg-[#E4405F]",
    ],
    [
      <FaSquareXTwitter className="relative z-10 text-xl lg:text-2xl fill-current transition-colors duration-300 group-hover:text-white" />,
      "bg-[#000000]",
    ],
    [
      <FaYoutube className="relative z-10 text-xl lg:text-2xl fill-current transition-colors duration-300 group-hover:text-white" />,
      "bg-[#FF0000]",
    ],
    [
      <FaPinterest className="relative z-10 text-xl lg:text-2xl fill-current transition-colors duration-300 group-hover:text-white" />,
      "bg-[#E60023]",
    ],
  ];
  return (
    <div>
      <div className="bg-base-200">
        <div className="w-full rotate-180 overflow-hidden">
          <img
            src={imgtop}
            alt=""
            className={`${
              theme === "light" && "drop-shadow-white"
            } w-full min-w-7xl mb-0.5`}
            style={{
              filter:
                theme === "light"
                  ? "drop-shadow(3.5px 2.5px 0 rgba(0, 0, 0, 0.25))"
                  : "drop-shadow(3.5px 2.5px 0 rgba(255, 255, 255, 0.25))",
            }}
          />
        </div>
      </div>
      <div className="bg-[#fff0f0] pt-9 pb-10 sm:pt-10 sm:pb-11 md:pt-11 md:pb-12">
        <div className="max-w-7xl mx-auto w-[95%] text-black space-y-5 sm:space-y-7 lg:w-[97%]">
          <div className="flex justify-center items-center gap-3 cursor-default">
            <img src={logo} alt="" className="h-13 sm:h-14 md:h-15 lg:h-16" />
            <h1
              style={{ fontFamily: '"Sarina", cursive' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              PawMart
            </h1>
          </div>
          <p className="text-center sm:w-[80%] mx-auto md:w-[70%] lg:w-[60%]">
            PawMart connects pet lovers, adopters, and sellers in one caring
            community. Adopt a furry friend or shop trusted pet supplies — all
            in one place.
          </p>
          <img src={footerimg} alt="" className="w-full" />
          <div className="flex gap-3 justify-center">
            {links.map((link, index) => (
              <button
                key={index}
                className={`${
                  theme === "dark" && "text-black"
                } bg-white relative p-2 sm:p-3 rounded-full flex items-center justify-center overflow-hidden group transition-shadow duration-300 shadow-md cursor-pointer`}
              >
                <span
                  className={`${link[1]} absolute left-0 bottom-0 w-full h-0 group-hover:h-full transition-[height] duration-300 ease-in-out`}
                ></span>
                {link[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <img
          src={imgup}
          alt=""
          className={`${
            theme === "light" ? "" : "drop-shadow-white"
          } w-full min-w-7xl mb-0.5`}
          style={{
            filter:
              theme === "light"
                ? "drop-shadow(3.5px 2.5px 0 rgba(0, 0, 0, 0.25))"
                : "drop-shadow(3.5px 2.5px 0 rgba(255, 255, 255, 0.25))",
          }}
        />
      </div>
      <div className="max-w-7xl w-[95%] mx-auto lg:w-[97%]">
        <div className="grid grid-cols-1 gap-10 py-13 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h5 className="cursor-default text-xl font-semibold mb-4">
              Get Support
            </h5>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                <IoHome /> Dhanmondi, Dhaka
              </li>
              <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                <FaPhoneAlt /> +8801990199019
              </li>
              <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                <IoMdMail /> pawmart@email.com
              </li>
              <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                <CiGlobe /> www.pawmart.com
              </li>
            </ul>
          </div>
          <div>
            <h5 className="cursor-default text-xl font-semibold mb-4">
              About PawMart
            </h5>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="cursor-pointer hover:underline">Our Mission</li>
              <li className="cursor-pointer hover:underline">
                How Adoption Works
              </li>
              <li className="cursor-pointer hover:underline">
                Meet Our Pet Heroes
              </li>
              <li className="cursor-pointer hover:underline">
                Why Choose PawMart
              </li>
              <li className="cursor-pointer hover:underline">
                Community Stories
              </li>
            </ul>
          </div>
          <div>
            <h5 className="cursor-default text-xl font-semibold mb-4">
              Quick Links
            </h5>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="cursor-pointer hover:underline">Home</li>
              <li className="cursor-pointer hover:underline">Adopt & Shop</li>
              <li className="cursor-pointer hover:underline">Create Post</li>
              <li className="cursor-pointer hover:underline">Dashboard</li>
              <li className="cursor-pointer hover:underline">Orders</li>
            </ul>
          </div>
          <div>
            <h5 className="cursor-default text-xl font-semibold mb-4">
              Stay Connected
            </h5>
            <p className="text-sm text-gray-500 mb-6 cursor-default">
              Join our PawMart community and get updates on new adoptions, pet
              care tips, and special offers.
            </p>
            <div className="flex border border-gray-300 p-1 rounded-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full text-sm outline-none"
              />
              <button className="bg-white p-3 text-xl rounded-full cursor-pointer text-white bg-linear-to-r from-primary to-secondary">
                <IoSend className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rotate-180 overflow-hidden">
        <img
          src={imgdown}
          alt=""
          className={`${
            theme === "light" ? "" : "drop-shadow-white"
          } w-full min-w-7xl mb-1`}
          style={{
            filter:
              theme === "light"
                ? "drop-shadow(3.5px 2.5px 0 rgba(0, 0, 0, 0.25))"
                : "drop-shadow(3.5px 2.5px 0 rgba(255, 255, 255, 0.25))",
          }}
        />
      </div>
      <div className="bg-[#211c1a] py-7 text-white md:py-9">
        <div className="max-w-7xl mx-auto w-[95%] flex justify-center md:justify-between lg:w-[97%]">
          <div className="hidden text-sm md:flex gap-3">
            <h6 className="cursor-pointer hover:underline">
              Privacy & Cookies
            </h6>
            <p>|</p>
            <h6 className="cursor-pointer hover:underline">
              {" "}
              Terms of services
            </h6>
          </div>
          <h6 className="cursor-default text-sm">
            © 2025 PawMart. All rights reserved.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
